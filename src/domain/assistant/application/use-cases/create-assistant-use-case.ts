import { right } from "../../../../core/either";
import { Assistant } from "../../enterprise/entities/assistant";
import { AiProvider } from "../ai-provider/ai-provider";
import { AssistantRepository } from "../repositories/assistant-repository";

interface CreateAssistantRequestDTO {
  assistantName: string;
  assistantDescription: string;
}

export class CreateAssistantUseCase {
  constructor(
    private readonly assistantRepository: AssistantRepository,
    private readonly aiProvider: AiProvider
  ) { }

  execute = async (file: File, data: CreateAssistantRequestDTO) => {
    const { assistantDescription, assistantName } = data;
    const fileUploaded = await this.aiProvider.uploadFile(file);
    const assistantCreated = await this.aiProvider.createAssistant(assistantName, fileUploaded.fileId);

    const assistant = Assistant.create({
      assistantDescription,
      assistantName,
      assistantId: assistantCreated.assistantId
    });

    this.assistantRepository.create(assistant);

    return right({
      assistant
    })
  }
}