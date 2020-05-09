import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';

/**
 * Check users authenticated or not
 * @param req
 * @param res
 * @param next
 */
const isAuth = (req: any, res: any, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    req.isAuth = false;
    return next();
  }
  let authData;
  try {
    authData = jwt.verify(token, process.env.WEBTOKENSECRET);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!authData) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = authData.userId;
  return next();
};

export default isAuth;
