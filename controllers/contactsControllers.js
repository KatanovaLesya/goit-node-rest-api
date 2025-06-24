import {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact as updateContactService
  } from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await listContacts();
        res.status(200).json(contacts);
      } catch (error) {
        next(error);
      }
};

export const getOneContact = async (req, res, next) => {
    try {
      const { id } = req.params;
      const contact = await getContactById(id);
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
      const contact = await removeContact(id);
      if (!contact) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json(contact);
    } catch (error) {
      next(error);
    }
  };

  export const createContact = async (req, res, next) => {
    try {
      const newContact = await addContact(req.body);
      res.status(201).json(newContact);
    } catch (error) {
      next(error);
    }
  };

  export const updateContact = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedContact = await updateContactService(id, req.body);
      if (!updatedContact) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json(updatedContact);
    } catch (error) {
      next(error);
    }
  };
