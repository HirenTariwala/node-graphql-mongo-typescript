import EventResolver from './Event/Event.Resolver';
import UserResolver from './User/User.Resolver';

/**
 * RootResolver for application
 */
export default {
  ...EventResolver,
  ...UserResolver,
};
