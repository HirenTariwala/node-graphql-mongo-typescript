import mongoose, { Schema } from 'mongoose';
import { IUser } from './User.interface';

/**
 * User Schema with attributes
 */
const UserSchema: Schema<IUser> = new mongoose.Schema({
  /**
   * Username of User
   */
  username: {
    type: String,
    required: true,
    unique: true,
  },
  /**
   * Password of User
   */
  password: {
    type: String,
    required: true,
    select: false,
  },
});

/**
 * Create Modal with UserSchema attributes
 */
export default mongoose.model<IUser>('User', UserSchema);
