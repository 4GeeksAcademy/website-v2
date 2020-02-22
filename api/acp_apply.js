const { addContact } = require('./utils');

module.exports = (req, res) => {
    const contact = req.body;
    try{
        const result = addContact(contact);
        res.status(200).json({
            success: result,
            body: req.body,
            query: req.query,
            cookies: req.cookies
          })
    }
    catch(err){
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}