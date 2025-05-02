const BookCharacter = (sequelize, DataTypes) => {
  return sequelize.define(
    "BookCharacter",
    {
      book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      character_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      role_of_char: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "join_book_characters",
      timestamps: false,
    }
  );
};

export default BookCharacter;
