// const { addorUpdateContact, addContactToAutomation } = require('../utils.js');

// const validate = (data) => {

//     if(typeof(data['first_name']) !== "string") throw new Error('Missing or invalid first name');
//     else if(data['first_name'].length > 50) throw new Error('First name too long');

//     if(typeof(data['last_name']) !== "string") throw new Error('Missing or invalid last name');
//     else if(data['last_name'].length > 50) throw new Error('Last name too long');
    
//     if(typeof(data['last_name']) !== "string") throw new Error('Missing or invalid phone');
//     else if(/\+(\d{1,3})(\d{10})$/.test(val)) throw new Error('Invalid phone');
    
//     if(typeof(data['email']) !== "string") throw new Error('Missing or invalid email');
//     else if(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(val)) throw new Error('Invalid email');
    
//     if(typeof(data['lang']) !== "string") throw new Error('Missing or invalid language');
//     else if(/^[a-z][a-z]\W])$/.test(val)) throw new Error('Invalid language');

//     if(Array.isArray(data['tags'])) throw new Error('Missing or invalid tags');
//   };

// module.exports = (req, res) => {

//   try{
//     validate(req.body);
//   }
//   catch(error){
//     res.status(400).json({ message: error.message });
//   }

//   const contact = req.body;
//   addorUpdateContact(contact)
//       .then((result) => {
//           return addContactToAutomation(contact.email, "49"); //add to strong lead automation, soft lead will be 48
//       })
//       .then((result) => {
//           res.status(200).json({
//               success: true,
//               data: result,
//               body: req.body,
//               query: req.query,
//               cookies: req.cookies
//             })
//       })
//       .catch(err => {
//           console.log(err);
//           res.status(400).json({ message: err.message });
//       })
// }

module.exports = (req, res) => {
  const { name = 'World' } = req.query
  res.send(`Hello ${name}!`)
}