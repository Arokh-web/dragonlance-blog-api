import ErrorResponse from "../utils/ErrorResponse.js";
import { db } from "../index.js";


export const getAllCharacters = async (req, res) => {
  const characters = await Character.findAll();
  res.json(characters);
};

export const getCharacterById = async (req, res) => {
  const { id } = req.params;
  const character = await Character.findByPk(id);

  if (!character) throw new ErrorResponse("Character not found.", 404);
  res.json(character);
};

export const createCharacter = async (req, res) => {
  const { name, description, image } = req.body;
  const character = await Character.create({
    name,
    description,
    image,
  });

  res.status(201).json(character);
};

export const updateCharacter = async (req, res) => {
  const { id } = req.params;
  const { name, description, image } = req.body;

  const character = await Character.findByPk(id);

  if (!character) throw new ErrorResponse("Character not found.", 404);

  character.name = name;
  character.description = description;
  character.image = image;

  await character.save();

  res.json(character);
};

export const deleteCharacter = async (req, res) => {
  const { id } = req.params;

  const character = await Character.findByPk(id);

  if (!character) throw new ErrorResponse("Character not found.", 404);

  await character.destroy();

  res.status(204).send();
};
