import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js"; 

const Contact = sequelize.define("contact", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }, 

}, {
  tableName: "contacts",
  timestamps: false,
});

//Contact.sync({alter: true}) 

export default Contact;
