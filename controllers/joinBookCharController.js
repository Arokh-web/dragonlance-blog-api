import ErrorResponse from "../utils/ErrorResponse.js";
import { db } from "../index.js";

export const getAllCharsFromBook = async (req, res) => {
  const { id } = req.params;
  const book = await db.Book.findByPk(id, {
    include: {
      model: db.Character,
      through: {
        attributes: ["note", "role_of_char"],
      },
    },
  });

  if (!book) throw new ErrorResponse("Book not found.", 404);
  res.json(book);
};

export const getAllBooksFromChar = async (req, res) => {
  const { id } = req.params;
  const character = await db.Character.findByPk(id, {
    include: {
      model: db.Book,
      through: {
        attributes: ["note", "role_of_char"],
      },
    },
  });

  if (!character) throw new ErrorResponse("Character not found.", 404);
  res.json(character);
};
