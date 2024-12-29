import catchAsync from '../../utils/catchAsynce';
import decodedToken from '../../utils/decodedToken';
import sendResponce from '../../utils/sendResponce';
import { User } from '../user/user.mode';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const { email } = decodedToken(token as string);

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

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { email } = decodedToken(token as string);

  const result = await BlogServices.updateBlogIntoDB(id, email, req.body);

  sendResponce(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: 200,
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  updateBlog,
};
