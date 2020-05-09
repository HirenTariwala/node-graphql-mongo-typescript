/**
 * This is Event controller all event related controller registeted here
 */
import Event from './Event.model';
import User from '../User/User.model';
import { IEvent, IEventInput } from './Event.Interface';
import { IUser } from '../User/User.interface';
import { getUserById } from '../User/User.controller';

/**
 * Get common object for event
 * @param event
 */
const getEventCommon = (event: any): IEvent => {
  return {
    ...event._doc,
    date: new Date(event._doc.date).toISOString(),
    createdBy: () => getUserById(event._doc.createdBy),
  };
};

/**
 * Get Event By ID
 * @param {string} eventId
 */
const getEventById = (eventId: string): Promise<IEvent | Error> => {
  return Event.findById(eventId)
    .then((event: IEvent) => event)
    .catch((err: Error) => err);
};

/**
 * Get all Event by userId
 * @param {string} userId
 */
export const getAllEventByUserId = (
  userId?: String
): Promise<IEvent[] | Error> => {
  return Event.find({ createdBy: userId })
    .then((events: IEvent[]) => events.map((event) => getEventCommon(event)))
    .catch((err: Error) => err);
};

/**
 * Get All Events
 */
export const getAllEvent = (): Promise<IEvent[] | Error> => {
  return Event.find()
    .then((events: IEvent[]) => events.map((event) => getEventCommon(event)))
    .catch((err: Error) => err);
};

/**
 * Create Event
 * @param event
 */
export const createEvent = (
  event: IEventInput,
  req: any
): Promise<IEvent | Error> => {
  if (!req.isAuth) {
    throw new Error('User not Authenticated!');
  }
  return User.findById(req.userId)
    .then((user: IUser) => {
      if (!user) {
        return new Error('User not exist.');
      }
      const newEvent: IEvent = new Event({
        ...event.eventInput,
        createdBy: req.userId,
        date: new Date().toISOString(),
      });
      return newEvent
        .save()
        .then((event: any) => {
          return getEventCommon(event);
        })
        .catch((err: Error) => {
          console.log(err);
          return err;
        });
    })
    .catch((err: Error) => {
      console.log(err);
      return err;
    });
};

/**
 * Book event based on ID
 * @param bookEvent
 */
export const bookEvent = (
  bookEvent: any,
  req: any
): Promise<IEvent | Error> => {
  if (!req.isAuth) {
    throw new Error('User not Authenticated!');
  }
  return Event.updateOne(
    { _id: bookEvent.bookInput.eventId },
    {
      $addToSet: { bookedBy: req.userId },
    }
  )
    .then(() => getEventById(bookEvent.bookInput.eventId))
    .catch((err: Error) => err);
};

/**
 * Cancel Booked event based on ID
 * @param cancelEvent
 */
export const cancelEvent = (
  cancelEvent: any,
  req: any
): Promise<IEvent | Error> => {
  if (!req.isAuth) {
    throw new Error('User not Authenticated!');
  }
  return Event.updateOne(
    { _id: cancelEvent.cancelInput.eventId },
    {
      $pull: { bookedBy: req.userId },
    }
  )
    .then(() => getEventById(cancelEvent.cancelInput.eventId))
    .catch((err: Error) => err);
};
