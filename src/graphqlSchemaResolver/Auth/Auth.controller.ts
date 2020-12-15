import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../User/User.model';
import { ILoginCred, IAuth } from './Auth.Interface';
import { IUser, IUserInput } from '../User/User.interface';
import { getUserCommon } from '../User/User.controller';

/**
 * User Registration
 */
export const createUser = (user: IUserInput): Promise<IUser | Error | void> => {
  return User.findOne({ username: user.userInput.username })
    .then((userRes: IUser) => {
      if (userRes) {
        return new Error('User already exist.');
      }
      return bcrypt
        .hash(user.userInput.password, 8)
        .then((hashedPassword: String) => {
          const newUser = new User({
            ...user.userInput,
            password: hashedPassword,
          });
          return newUser
            .save()
            .then((user: any) => {
              return getUserCommon(user);
            })
            .catch((err: Error) => {
              console.log(err);
              return err;
            });
        })
        .catch((err: Error) => {
          console.log(err);
        });
    })
    .catch((err: Error) => {
      console.log(err);
      return err;
    });
};

/**
 * Login registred user
 * @param param
 */
export const login = ({ username, password }: ILoginCred) => {
  const user = await User.findOne({ username }).select('+password');
  if (!user) {
    throw new Error('Invalid Username or Password!');
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw new Error('Invalid Username or Password!');
  }
  return {
    token: jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    }),
  };
};
