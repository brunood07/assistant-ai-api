import { randomUUID } from "crypto";

export interface UserProps {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  password: string;
}

export class User {
  private props: UserProps;
  private _id: string;

  private constructor(props: UserProps, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get email() {
    return this.props.email;
  }

  get position() {
    return this.props.position;
  }

  get password() {
    return this.props.password;
  }

  static create(props: UserProps, id?: string) {
    const user = new User(props, id);
    return user;
  }
}