// This validates DATABASE against a given model using sequelize

import { sequelize } from "../db/index_db.js";
import { Post } from "./Post.js";
import { User } from "./User.js";
import { Book } from "./Book.js";
import { Character } from "./Character.js";

const db = {};

// Imports models and initializes them with the sequelize instance to be used
db.sequelize = sequelize;
db.Post = Post(sequelize);
db.User = User(sequelize);
db.Book = Book(sequelize);
db.Character = Character(sequelize);

export default db;
