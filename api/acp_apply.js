// const path = require('path');
const Schema = require('validate');
const { addorUpdateContact } = require('./_utils.js');
// require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const registration = new Schema({
    first_name: {
      type: String,
      required: true,
      length: { min: 2, max: 20 }
    },
    last_name: {
      type: String,
      required: true,
      length: { min: 2, max: 20 }
    },
    phone: {
      type: String,
      required: true,
      use: val => /\+(\d{1,3})(\d{10})$/.test(val)
    },
    email: {
      type: String,
      required: true,
      use: val => /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(val)
    },
    email: {
      type: String,
      required: true,
      use: val => /^[a-z][a-z]\W])$/.test(val)
    },
    tags: {
      type: Array,
      required: true
    }
});

module.exports = (req, res) => {

  const errors = registration.validate(req.body);
  if(errors.length > 0){
    console.log("Errors", errors.map(e => e.message));
    res.status(400).json({ message: errors.map(e => e.message) });
  }
  const contact = req.body;
  addorUpdateContact(contact)
      .then((result) => {
          res.status(200).json({
              success: true,
              data: result,
              body: req.body,
              query: req.query,
              cookies: req.cookies
            })
      })
      .catch(err => {
          console.log(err);
          res.status(400).json({ message: err.message });
      })
}