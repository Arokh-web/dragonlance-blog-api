import { db } from "../index.js";

export function associateModels(db) {
  const { Post, Book, Character, User, BookCharacter } = db;

  // Define associations

  User.hasMany(Post, { foreignKey: "author_id" });
  Post.belongsTo(User, { foreignKey: "author_id" });

  Book.hasMany(Post, { foreignKey: "ref_book_id" });
  Post.belongsTo(Book, { foreignKey: "ref_book_id" });

  Character.hasMany(Post, { foreignKey: "ref_character_id" });
  Post.belongsTo(Character, { foreignKey: "ref_character_id" });

  Book.belongsToMany(Character, {
    through: db.BookCharacter,
    foreignKey: "book_id",
    otherKey: "character_id",
  });
  Character.belongsToMany(Book, {
    through: db.BookCharacter,
    foreignKey: "character_id",
    otherKey: "book_id",
  });
}

export default associateModels;
