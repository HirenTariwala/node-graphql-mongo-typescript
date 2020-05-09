import { Document } from 'mongoose';
import { IEvent } from 'graphqlSchemaResolver/Event/Event.Interface';

export interface IUser extends Document {
  /**
   * Id of User
   */
  _id: String;
  /**
   * Username of User
   */
  username: string;
  /**
   * Password of User
   */
  password: string;
  /**
   * List of Event created by user
   */
  events: IEvent[];
}

export interface IUserInput {
  /**
   * User input during create or update event
   */
  userInput: IUser;
}
