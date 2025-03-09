const fs = require('fs').promises;
const path = require('path');

const dataDir = path.join(__dirname, '../data');

async function readJsonFile(filename) {
    try {
        const data = await fs.readFile(path.join(dataDir, filename), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        throw error;
    }
}

async function writeJsonFile(filename, data) {
    try {
        await fs.writeFile(
            path.join(dataDir, filename),
            JSON.stringify(data, null, 2),
            'utf8'
        );
    } catch (error) {
        console.error(`Error writing ${filename}:`, error);
        throw error;
    }
}

module.exports = {
    readJsonFile,
    writeJsonFile
};
