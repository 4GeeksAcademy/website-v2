// const path = require('path');
const { addContact } = require('./_utils.js');
// require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

module.exports = (req, res) => {
    const contact = req.body;
    console.log("body", req.body);
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