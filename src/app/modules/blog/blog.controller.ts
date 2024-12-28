import config from '../../config';
import catchAsync from '../../utils/catchAsynce';
import sendResponce from '../../utils/sendResponce';
import { User } from '../user/user.mode';
import { BlogServices } from './blog.service';
import jwt, { JwtPayload } from 'jsonwebtoken';

const createBlog = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const decoded = jwt.verify(
    token as string,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { email } = decoded;

  const user = await User.findOne({ email }).select('_id');

  const result = await BlogServices.createBlogIntoDB({
    ...req.body,
    author: user?._id,
  });

  sendResponce(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: 201,
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
};
