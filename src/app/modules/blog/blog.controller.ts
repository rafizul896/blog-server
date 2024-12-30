import catchAsync from '../../utils/catchAsynce';
import sendResponce from '../../utils/sendResponce';
import { User } from '../user/user.mode';
import { BlogServices } from './blog.service';

// Create Blog
const createBlog = catchAsync(async (req, res) => {
  const { email } = req.user;

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

// Update Blog
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  const result = await BlogServices.updateBlogIntoDB(id, email, req.body);

  sendResponce(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: 200,
    data: result,
  });
});

// Delete Blog
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  await BlogServices.deleteBlogFromDB(id, email);

  sendResponce(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: 200,
  });
});

// get all blog
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  sendResponce(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: 200,
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
