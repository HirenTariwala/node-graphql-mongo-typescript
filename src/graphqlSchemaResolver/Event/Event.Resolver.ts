/**
 * This Resolver file of Event
 */
import {
  getAllEvent,
  createEvent,
  bookEvent,
  cancelEvent,
} from './Event.controller';

/**
 * Resolver for Event
 */
export default {
  events: getAllEvent,
  createEvent,
  bookEvent,
  cancelEvent,
};
