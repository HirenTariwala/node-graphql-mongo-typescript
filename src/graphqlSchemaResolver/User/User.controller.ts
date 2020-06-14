/**
 * This is User controller all user related controller registeted here
 */
import User from './User.model';
import { IUser } from '../User/User.interface';
import { getAllEventByUserId } from '../Event/Event.controller';

/**
 *  Get common object for user
 * @param user
 */
export const getUserCommon = (user: any): IUser => {
  return {
    ...user._doc,
    events: () => getAllEventByUserId(user._doc._id),
  };
};

/**
 * Get user based on ID
 * @param {string} userId
 */
export const getUserById = (userId: String): Promise<IUser | Error> => {
  return User.findById(userId)
    .then((user: any) => getUserCommon(user))
    .catch((err: Error) => err);
};

/**
 * Get All users
 */
export const getAllUsers = (): Promise<IUser[] | Error> => {
  return User.find()
    .then((users: IUser[]) => {
      return users.map((user: any) => getUserCommon(user));
    })
    .catch((err: Error) => err);
};
