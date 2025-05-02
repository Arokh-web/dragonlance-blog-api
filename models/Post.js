const Post = (sequelize, DataTypes) => {
  return sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ref_book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ref_character_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "posts",
      timestamps: false,
    }
  );
};

export default Post;
