import express from "express";
import {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
} from "../controllers/contactsController.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";

const router = express.Router();

router.get("/", getAllContacts);
router.get("/:id", getOneContact);
router.post("/", validateBody(createContactSchema), createContact);
router.put("/:id", validateBody(updateContactSchema), updateContact);
router.patch("/:id", validateBody(updateContactSchema), updateContact);
router.delete("/:id", deleteContact);
router.patch("/:contactId/favorite", validateBody(updateFavoriteSchema), updateStatusContact);

export default router;
