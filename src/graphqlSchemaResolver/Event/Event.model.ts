import mongoose, { Schema } from 'mongoose';
import { IEvent } from './Event.Interface';

/**
 * Event Schema with all attributes
 */
const EventSchema: Schema<IEvent> = new mongoose.Schema({
  /**
   * Title of Event
   */
  title: {
    type: String,
    required: true,
  },
  /**
   * Description of Event
   */
  desc: {
    type: String,
    required: true,
  },
  /**
   * Price of Event
   */
  price: {
    type: Number,
    required: true,
  },
  /**
   * Date of Event
   */
  date: {
    type: Date,
    required: true,
  },
  /**
   * User who created this event
   */
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  /**
   * List of user who booked this event
   */
  bookedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: [],
    },
  ],
});

/**
 * Create Modal With EventSchema attributes
 */
export default mongoose.model<IEvent>('Event', EventSchema);
