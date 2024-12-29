import { User } from '../user/user.mode';

const blockUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true },
  );

  return result;
};

const deleteBlogFromDB = (id) => {};

export const AdminServices = {
  blockUserIntoDB,
  deleteBlogFromDB,
};
