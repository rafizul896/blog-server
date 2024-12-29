import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const decodedToken = (token: string) => {
  const decoded = jwt.verify(
    token as string,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  return decoded;
};

export default decodedToken;
