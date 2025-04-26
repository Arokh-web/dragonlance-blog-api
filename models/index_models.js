// This validates DATABASE against a given model using sequelize
import { DataTypes } from "sequelize";

// Importing models
import Post from "./Post.js";
import User from "./User.js";
import Book from "./Book.js";
import Character from "./Character.js";
import Comment from "./Comment.js";

// Imports models and initializes them with the sequelize instance to be used

const db = {};

export const initModels = (sequelize) => {
  db.sequelize = sequelize;
  db.Post = Post(sequelize, DataTypes);
  db.User = User(sequelize, DataTypes);
  db.Book = Book(sequelize, DataTypes);
  db.Character = Character(sequelize, DataTypes);
  db.Comment = Comment(sequelize, DataTypes);

  return db;
};
