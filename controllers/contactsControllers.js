import Contact from "../models/contact.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await Contact.destroy({ where: { id } }); 
    if (!deletedCount) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact); 
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [updatedCount] = await Contact.update(req.body, { where: { id } });
    if (!updatedCount) {
      return res.status(404).json({ message: "Not found" });
    }
   
    const updatedContact = await Contact.findByPk(id);
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const contact = await Contact.findByPk(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    contact.favorite = favorite;
    await contact.save();

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};
