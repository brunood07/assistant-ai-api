import { OpenAI } from "openai";
import { AiProvider, CreateAssistantResponseDTO, SendMessageResponseDTO, UploadFileResponseDTO } from "../../domain/assistant/application/ai-provider/ai-provider";
import { env } from "process";

export class OpenAiProvider implements AiProvider {
  openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  }

  async createAssistant(assistantName: string, fileId: string): Promise<CreateAssistantResponseDTO> {
    const assistant = await this.openai.beta.assistants.create({
      name: "Assistente de Código",
      instructions: "Você é um assistente de código que segue padrões de um projeto descrito no arquivo.",
      tools: [{ type: "code_interpreter" }],
      tool_resources: {
        code_interpreter: {
          file_ids: [fileId],
        }
      },
      model: "gpt-3.5-turbo"
    });

    return {
      assistantId: assistant.id
    };
  }

  async uploadFile(file: File): Promise<UploadFileResponseDTO> {
    const fileUploaded = await this.openai.files.create({
      file: file,
      purpose: "assistants"
    });

    return {
      fileId: fileUploaded.id
    }
  }

  sendMessage(userMessage: string, assistantId: string, threadId?: string): Promise<SendMessageResponseDTO> {
    throw new Error("Method not implemented.");
  }
}