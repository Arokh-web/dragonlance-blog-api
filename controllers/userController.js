import ErrorResponse from "../utils/ErrorResponse.js";
import { db } from "../index.js";

export const getUsers = async (req, res) => {
  const users = await db.User.findAll({
    include: db.Post,
  });
  res.json(users);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await db.User.findByPk(id, {
    include: db.Post,
  });

  if (!user) throw new ErrorResponse("User not found.", 404);
  res.json(user);
};

export const createUser = async (req, res) => {
  const { name, email, password_hash } = req.body;
  const user = await db.User.create({
    name,
    email,
    password_hash,
  });

  res.status(201).json(user);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password_hash } = req.body;

  const user = await db.User.findByPk(id);

  if (!user) throw new ErrorResponse("User not found.", 404);

  user.name = name;
  user.email = email;
  user.password_hash = password_hash;

  await user.save();

  res.json(user);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await db.User.findByPk(id);

  if (!user) throw new ErrorResponse("User not found.", 404);

  await user.destroy();

  res.status(204).send();
};
