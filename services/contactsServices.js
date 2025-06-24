
import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');

// Отримати всі контакти
export async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

// Отримати контакт за id
export async function getContactById(id) {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === id) || null;
}

// Додати новий контакт
export const addContact = async (data) => {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...data,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  };
  

// Видалити контакт за id
export async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) return null;
  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}

// Оновити контакт за id
export async function updateContact(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) {
    console.log('Contact not found');
    return null;
}
  contacts[index] = { ...contacts[index], ...data };
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (err) {
    console.error('File write error:', err);
    throw err;
  }
  return contacts[index];
}
