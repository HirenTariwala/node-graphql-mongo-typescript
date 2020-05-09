/**
 * This Resolver file of User
 */
import { getAllUsers } from './User.controller';
import { createUser, login } from '../Auth/Auth.controller';

/**
 * Resolver for user
 */
export default {
  users: getAllUsers,
  createUser,
  login,
};
