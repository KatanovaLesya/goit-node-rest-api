import Contact from "../models/contact.js";


export const listContacts = (ownerId) => Contact.findAll({where: { owner: ownerId }});

export const getContactById = (id, ownerId) => Contact.findOne({where: { id, owner: ownerId }});

export const addContact = (data) => Contact.create(data);

export const updateContact = async (id, ownerId, data) => {
  const contact = await Contact.findOne({ where: { id, owner: ownerId } });
  if (!contact) return null;
  await contact.update(data);
  return contact;
};

export const removeContact = async (id, ownerId) => {
  const contact = await Contact.findOne({where: { id, owner: ownerId }});
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export const updateFavorite = async (id, ownerId, favorite) => {
  const contact = await Contact.findOne({where: { id, owner: ownerId }});
  if (!contact) return null;
  contact.favorite = favorite;
  await contact.save();
  return contact;
};
