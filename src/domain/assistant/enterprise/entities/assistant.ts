import { randomUUID } from "crypto";

export interface UserProps {
  assistantId: string;
  assistantName: string;
  assistantDescription: string;
}

export class Assistant {
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

  get assistantName() {
    return this.props.assistantName;
  }

  get assistantDescription() {
    return this.props.assistantDescription;
  }

  static create(props: UserProps, id?: string) {
    const user = new Assistant(props, id);
    return user;
  }
}