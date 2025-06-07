import { Either, left, right } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../user/application/use-cases/errors/resrouce-not-found-error";
import { AiProvider } from "../ai-provider/ai-provider";
import { AssistantRepository } from "../repositories/assistant-repository";

interface SendMessageToAssistantRequestDTO {
  assistantId: string;
  userMessage: string;
  threadId: string;
}

type SendMessageToAssistantResponseDTO = Either<
  ResourceNotFoundError,
  {
    threadId: string;
    assistantMessage: string;
  }
>

export class SendMessageToAssistantUseCase {
  constructor(
    private readonly assistantRepository: AssistantRepository,
    private readonly aiProvider: AiProvider
  ) { }


  execute = async (data: SendMessageToAssistantRequestDTO): Promise<SendMessageToAssistantResponseDTO> => {
    const { assistantId, userMessage, threadId } = data;
    const assistantExists = await this.assistantRepository.findByAssistantId(assistantId);
    if (!assistantExists) return left(new ResourceNotFoundError('assistant'));
    var response = await this.aiProvider.sendMessage(userMessage, assistantId, threadId);
    return right({
      assistantMessage: response.response,
      threadId: response.threadId
    })
  }
}