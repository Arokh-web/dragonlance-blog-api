import ErrorResponse from "../utils/ErrorResponse.js";
import { db } from "../index.js";

export const getPosts = async (req, res) => {
  const posts = await db.Post.findAll({
    include: db.User,
  });
  res.json(posts);
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await db.Post.findByPk(id, {
    include: db.User,
  });

  if (!post) throw new ErrorResponse("Post not found.", 404);
  res.json(post);
};

export const createPost = async (req, res) => {
  const { title, content, image } = req.body;
  const userId = req.user.id;

  const post = await db.Post.create({
    title,
    content,
    image,
    author_id: userId,
  });

  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  const post = await db.Post.findByPk(id);

  if (!post) throw new ErrorResponse("Post not found.", 404);

  post.title = title;
  post.content = content;
  post.image = image;

  await post.save();

  res.json(post);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await db.Post.findByPk(id);

  if (!post) throw new ErrorResponse("Post not found.", 404);

  await post.destroy();

  res.status(204).send();
};

// export const getPostsByUserId = async (req, res) => {
//   const { userId } = req.params;
//   const posts = await db.Post.findAll({
//     where: { userId },
//     include: db.User,
//   });

//   if (!posts) throw new ErrorResponse("No posts found for this user.", 404);
//   res.json(posts);
// };
