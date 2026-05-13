import { randomUUID } from 'crypto';

import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { LessonContentType } from 'src/common/enums/domain.enums';
import { UsersService } from 'src/users/users.service';
import { CreateCourseDraftDto } from './dto/create-course-draft.dto';

type StructuredCourseDraft = {
  course: {
    title: string;
    description: string;
    estimatedDurationMinutes: number;
  };
  lessons: Array<{
    title: string;
    contentType: LessonContentType;
    durationMinutes: number;
    isRequired: boolean;
    slides: Array<{
      title: string;
      body: string;
      mediaUrl?: string | null;
      notes?: string | null;
    }>;
  }>;
  finalQuiz?: {
    passingScorePercentage: number;
    questions: Array<{
      prompt: string;
      options: string[];
      correctOptionIndex: number;
    }>;
  } | null;
};

type ResolvedAiSettings = NonNullable<Awaited<ReturnType<UsersService['getResolvedAiSettings']>>>;
type ActiveAiSettings = ResolvedAiSettings & { apiKey: string };

@Injectable()
export class AiService {
  constructor(private readonly usersService: UsersService) {}

  async generateCourseDraft(userId: string, createCourseDraftDto: CreateCourseDraftDto) {
    const settings = await this.usersService.getResolvedAiSettings(userId);
    if (!settings?.apiKey) {
      throw new BadRequestException('أضف مفتاح OpenAI أو Gemini من صفحة الإعدادات قبل استخدام التوليد الذكي.');
    }
    const activeSettings: ActiveAiSettings = {
      ...settings,
      apiKey: settings.apiKey,
    };

    const outputText =
      activeSettings.provider === 'gemini'
        ? await this.generateWithGemini(activeSettings, createCourseDraftDto)
        : await this.generateWithOpenAi(activeSettings, createCourseDraftDto);

    if (!outputText) {
      throw new InternalServerErrorException('لم يتم إرجاع محتوى صالح من خدمة الذكاء الاصطناعي.');
    }

    const draft = JSON.parse(outputText) as StructuredCourseDraft;
    return this.normalizeDraft(draft, createCourseDraftDto);
  }

  private async generateWithOpenAi(settings: ActiveAiSettings, request: CreateCourseDraftDto) {
    const response = await fetch(`${this.normalizeBaseUrl(settings.baseUrl, 'https://api.openai.com')}/v1/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${settings.apiKey}`,
      },
      body: JSON.stringify({
        model: settings.model,
        input: [
          {
            role: 'system',
            content: [
              {
                type: 'input_text',
                text: this.buildSystemPrompt(request, settings.language),
              },
            ],
          },
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: JSON.stringify(this.buildCourseDraftRequest(request, settings)),
              },
            ],
          },
        ],
        text: {
          format: {
            type: 'json_schema',
            name: 'course_draft',
            strict: true,
            schema: this.buildDraftSchema(),
          },
        },
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      throw new InternalServerErrorException(`فشل التوليد الذكي: ${details}`);
    }

    const payload = (await response.json()) as {
      output_text?: string;
      output?: Array<{ content?: Array<{ text?: string }> }>;
    };
    return payload.output_text || payload.output?.flatMap((item) => item.content || []).map((item) => item.text || '').join('') || '';
  }

  private async generateWithGemini(settings: ActiveAiSettings, request: CreateCourseDraftDto) {
    const modelPath = settings.model.startsWith('models/') ? settings.model : `models/${settings.model}`;
    const response = await fetch(
      `${this.normalizeBaseUrl(settings.baseUrl, 'https://generativelanguage.googleapis.com')}/v1beta/${modelPath}:generateContent?key=${encodeURIComponent(settings.apiKey)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            role: 'system',
            parts: [
              {
                text: this.buildSystemPrompt(request, settings.language),
              },
            ],
          },
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: JSON.stringify(this.buildCourseDraftRequest(request, settings)),
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: this.buildDraftSchema(),
          },
        }),
      },
    );

    if (!response.ok) {
      const details = await response.text();
      throw new InternalServerErrorException(`فشل التوليد الذكي: ${details}`);
    }

    const payload = (await response.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    };

    return payload.candidates?.flatMap((candidate) => candidate.content?.parts || []).map((part) => part.text || '').join('') || '';
  }

  private buildSystemPrompt(request: CreateCourseDraftDto, defaultLanguage: string) {
    return [
      'You generate structured employee training course drafts.',
      'Return only JSON that matches the provided schema.',
      'Write concise, professional training content.',
      `Default output language: ${request.language || defaultLanguage || 'ar'}.`,
    ].join(' ');
  }

  private buildCourseDraftRequest(request: CreateCourseDraftDto, settings: ResolvedAiSettings) {
    return {
      topic: request.topic,
      targetAudience: request.targetAudience || '',
      learningObjectives: request.learningObjectives || [],
      difficulty: request.difficulty,
      estimatedDurationMinutes: request.estimatedDurationMinutes,
      lessonCount: request.lessonCount,
      notes: request.notes || '',
      includeFinalExam: request.includeFinalExam ?? true,
      finalExamQuestionCount: request.finalExamQuestionCount || settings.defaultFinalExamQuestionCount || 5,
    };
  }

  private buildDraftSchema() {
    return {
      type: 'object',
      additionalProperties: false,
      required: ['course', 'lessons', 'finalQuiz'],
      properties: {
        course: {
          type: 'object',
          additionalProperties: false,
          required: ['title', 'description', 'estimatedDurationMinutes'],
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            estimatedDurationMinutes: { type: 'number' },
          },
        },
        lessons: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['title', 'contentType', 'durationMinutes', 'isRequired', 'slides'],
            properties: {
              title: { type: 'string' },
              contentType: {
                type: 'string',
                enum: [
                  LessonContentType.Article,
                  LessonContentType.Task,
                  LessonContentType.Video,
                  LessonContentType.Pdf,
                ],
              },
              durationMinutes: { type: 'number' },
              isRequired: { type: 'boolean' },
              slides: {
                type: 'array',
                minItems: 1,
                items: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['title', 'body'],
                  properties: {
                    title: { type: 'string' },
                    body: { type: 'string' },
                    mediaUrl: { type: ['string', 'null'] },
                    notes: { type: ['string', 'null'] },
                  },
                },
              },
            },
          },
        },
        finalQuiz: {
          anyOf: [
            { type: 'null' },
            {
              type: 'object',
              additionalProperties: false,
              required: ['passingScorePercentage', 'questions'],
              properties: {
                passingScorePercentage: { type: 'number' },
                questions: {
                  type: 'array',
                  minItems: 1,
                  items: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['prompt', 'options', 'correctOptionIndex'],
                    properties: {
                      prompt: { type: 'string' },
                      options: {
                        type: 'array',
                        minItems: 2,
                        items: { type: 'string' },
                      },
                      correctOptionIndex: { type: 'number' },
                    },
                  },
                },
              },
            },
          ],
        },
      },
    };
  }

  private normalizeBaseUrl(baseUrl: string | null | undefined, fallback: string) {
    return (baseUrl || fallback).replace(/\/+$/, '');
  }

  private normalizeDraft(draft: StructuredCourseDraft, request: CreateCourseDraftDto) {
    if (!draft.course?.title || !Array.isArray(draft.lessons) || !draft.lessons.length) {
      throw new InternalServerErrorException('صيغة الاستجابة الذكية غير مكتملة.');
    }

    return {
      course: {
        title: draft.course.title.trim(),
        description: draft.course.description.trim(),
        difficulty: request.difficulty,
        estimatedDurationMinutes: Math.round(draft.course.estimatedDurationMinutes || request.estimatedDurationMinutes),
        status: 'draft',
        certificateEnabled: false,
      },
      lessons: draft.lessons.map((lesson, lessonIndex) => ({
        title: lesson.title.trim(),
        contentType: lesson.contentType,
        durationMinutes: Math.max(1, Math.round(lesson.durationMinutes || 10)),
        order: lessonIndex + 1,
        isRequired: lesson.isRequired !== false,
        slides: lesson.slides.map((slide) => ({
          id: randomUUID(),
          title: String(slide.title || '').trim(),
          body: String(slide.body || '').trim(),
          mediaUrl: slide.mediaUrl || null,
          notes: slide.notes || null,
        })),
      })),
      finalQuiz:
        request.includeFinalExam === false || !draft.finalQuiz
          ? null
          : {
              passingScorePercentage: Math.max(
                0,
                Math.min(100, Math.round(draft.finalQuiz.passingScorePercentage || 70)),
              ),
              questions: draft.finalQuiz.questions.map((question) => {
                const options = question.options.map((option) => ({
                  id: randomUUID(),
                  text: String(option || '').trim(),
                }));
                const correctOption = options[Math.max(0, Math.min(options.length - 1, Math.round(question.correctOptionIndex || 0)))];

                return {
                  id: randomUUID(),
                  prompt: String(question.prompt || '').trim(),
                  options,
                  correctOptionId: correctOption.id,
                };
              }),
            },
    };
  }
}
