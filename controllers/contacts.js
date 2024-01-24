const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

function getMongoDb() {
  return mongodb.getDb().db('cse341').collection('contacts');
}

const getAllContacts = async (req, res, next) => {
  const result = await getMongoDb().find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getOneContact = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id);
  const result = await getMongoDb().find({ _id: contactId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const addContact = async (req, res, next) => {
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await getMongoDb().insertOne(newContact);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'An error occurred while trying to create contact');
  }
};

const updateContact = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id);
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await getMongoDb().replaceOne({ _id: contactId }, newContact);
  if (result.modifiedCount > 0) {
    res.status(204).json(result);
  } else {
    res.status(400).json(result.error || 'An error occurred while trying to update the contact');
  }
};

const deleteContact = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id);
  const result = await getMongoDb().deleteOne({_id: contactId});
  if (result.deletedCount > 0) {
    res.status(202).json(result);
  } else {
    res.status(404).json(result.error || "An error occurred while trying to delete the contact")
  }
};

module.exports = { getAllContacts, getOneContact, addContact, updateContact, deleteContact };
