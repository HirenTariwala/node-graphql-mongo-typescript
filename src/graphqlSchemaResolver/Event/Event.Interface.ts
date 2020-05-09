import { Document } from 'mongoose';
import { IUser } from 'graphqlSchemaResolver/User/User.interface';

export interface IEvent extends Document {
  /**
   * Id of Event
   */
  _id: String;
  /**
   * Title of Event
   */
  title: String;
  /**
   * Description of Event
   */
  desc: String;
  /**
   * Price of Event
   */
  price: Number;
  /**
   * Date of Event
   */
  date: Date | String;
  /**
   * User who created this event
   */
  createdBy: String | IUser;
  /**
   * List of users who booked event
   */
  bookedBy: IUser[];
}

export interface IEventInput {
  /**
   * Event input during create or update event
   */
  eventInput: IEvent;
}
