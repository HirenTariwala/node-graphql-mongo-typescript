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
export const login = ({ username, password }: ILoginCred): Promise<IAuth> => {
  return User.findOne({ username }).then((user: any) => {
    if (!user) {
      throw new Error('Invalid Username or password!');
    }
    return bcrypt
      .compare(password, user._doc.password)
      .then((isEqual: boolean) => {
        if (!isEqual) {
          throw new Error('Invalid Username or password!');
        }
        return {
          token: jwt.sign({ userId: user.id }, process.env.WEBTOKENSECRET, {
            expiresIn: '1h',
          }),
        };
      });
  });
};
