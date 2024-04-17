const Contact = require('../models/contact');
const CreatePath = require('../helpers/create-path');

const getContacts = (req, res) => {
  const title = 'Contacts';
  Contact
    .find()
    .then(contacts => res.render(CreatePath('contacts'), { contacts, title }))
    .catch((error) => {
      console.log(error);
      res.render(CreatePath('error'), { title: 'Error' });
    });
}

module.exports = {
    getContacts,
};