import { IUser } from '../user/user.interface';
import { User } from '../user/user.mode';

const register = async (payload: IUser) => {
  const result = await User.create(payload);
  return { _id: result._id, name: result.name, email: result.email };
};

export const AuthServices = {
  register,
};
