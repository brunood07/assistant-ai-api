import { randomUUID } from "crypto";
import { Assistant } from "./assistant";

export interface UserProps {
  assistantId: string;
  userId: string;
  assistant: Assistant | null;
}

export class AssistantPermission {
  private props: UserProps;
  private _id?: string;

  private constructor(props: UserProps, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }

  get assistantId() {
    return this.props.assistantId;
  }

  get userId() {
    return this.props.userId;
  }

  get assistant() {
    return this.props.assistant;
  }

  static create(props: UserProps, id?: string) {
    const user = new AssistantPermission(props, id);
    return user;
  }
}