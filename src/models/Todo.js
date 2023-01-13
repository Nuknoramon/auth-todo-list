module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      title: {
        type: DataTypes.STRING,
        allownull: false,
        validate: {
          notEmpty: true,
        },
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allownull: false,
        defaultValue: false,
      },
    },
    {
      underscored: true,
    }
  );

  Todo.associate = (db) => {
    Todo.belongsTo(db.User, {
      foreignKey: {
        allownull: false,
        name: "userId",
      },
      onDelete: "RESTRICT",
    });
  };

  return Todo;
};
