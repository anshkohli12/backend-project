const { readJsonFile, writeJsonFile } = require('../util/fileUtils');

const submitContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const contactEntry = {
            id: Date.now(),
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        };

        // Read existing contacts using fileUtils
        let contacts = [];
        try {
            contacts = await readJsonFile('contacts.json');
        } catch (error) {
            // If file doesn't exist, we'll start with empty array
            contacts = [];
        }

        // Add new contact
        contacts.push(contactEntry);

        // Write using fileUtils
        await writeJsonFile('contacts.json', contacts);

        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { submitContact };
