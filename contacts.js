const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('db/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    return JSON.parse(data);
  } catch (error) {
    console.log('error', error)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();

    return contacts.find(({ id }) => id === String(contactId)) || null
  } catch (error) {
    console.log('error', error)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContacts = await contacts.filter(({ id }) => id !== String(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));

    return await listContacts();
  } catch (error) {
    console.log('error', error)
  }
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newCintact = { id: uuidv4(), name, email, phone }
  contacts.push(newCintact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return await listContacts();
}

module.exports = { addContact, removeContact, getContactById, listContacts }
