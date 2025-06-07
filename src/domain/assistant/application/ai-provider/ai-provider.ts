export interface AiProvider {
  createAssistant(assistantName: string, fileId: string): Promise<CreateAssistantResponseDTO>;
  uploadFile(file: File): Promise<UploadFileResponseDTO>;
  sendMessage(userMessage: string, assistantId: string, threadId?: string): Promise<SendMessageResponseDTO>;
}

export interface CreateAssistantResponseDTO {
  assistantId: string;
}

export interface UploadFileResponseDTO {
  fileId: string;
}

export interface SendMessageResponseDTO {
  response: string;
  threadId: string;
}