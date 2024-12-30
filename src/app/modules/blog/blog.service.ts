import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.mode';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import httpStatus from 'http-status-codes';

const createBlogIntoDB = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  const author = await User.findById(payload.author);

  return {
    _id: result._id,
    title: result.title,
    content: result.content,
    author,
  };
};

const updateBlogIntoDB = async (
  id: string,
  reqUserEmail: string,
  payload: Partial<IBlog>,
) => {
  const blog = await Blog.findById(id).populate<{ author: IUser }>('author');

  if (!blog) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Blog is not Found!');
  }

  if (blog?.author?.email !== reqUserEmail) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Action not permitted');
  }

  const user = await User.findById(payload.author);

  //  check author is exists in User collection
  if (payload.author && !user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Author is not Found!');
  }

  // update blog
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  // Handle the case where `result` is null
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update the blog');
  }

  return {
    _id: result._id,
    title: result.title,
    content: result.content,
    author: blog.author,
  };
};

const deleteBlogFromDB = async (
  id: string,
  reqUserEmail: string,
  reqUserRole: string,
) => {
  const blog = await Blog.findById(id).populate<{ author: IUser }>('author');

  if (!blog) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Blog is not Found!');
  }

  if (reqUserRole === 'user' && blog?.author?.email !== reqUserEmail) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Action not permitted');
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const { search, sortBy, sortOrder, filter, page, limit } = query;

  const searchQuery: Record<string, unknown> = {};

  if (search) {
    searchQuery.title = { $regex: search, $options: 'i' };
  }

  if (filter) {
    searchQuery.author = new mongoose.Types.ObjectId(filter as string);
  }

  // Sorting and pagination (optional)
  const sortField = sortBy || 'createdAt';
  const sortDirection = sortOrder === 'desc' ? -1 : 1;
  const pageNumber = Number(page) || 1;
  const pageSize = Number(limit) || 10;
  const skip = (pageNumber - 1) * pageSize;

  const result = await Blog.find(searchQuery)
    .sort({ [sortField as string]: sortDirection })
    .skip(skip)
    .limit(pageSize)
    .populate('author');

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
