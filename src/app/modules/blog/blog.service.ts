import { User } from '../user/user.mode';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: IBlog) => {
  const result = await Blog.create(payload);

  const author = await User.findById(payload.author);
  
  return {
    _id: result._id,
    name: result.title,
    content: result.content,
    author,
  };
};

export const BlogServices = {
  createBlogIntoDB,
};
