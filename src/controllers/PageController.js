const path = require('path');

const ROOT = path.join(__dirname, '../../public');

module.exports = {
    async renderPage(req, res) {
        return res.sendFile('index.html', { root: ROOT });
    }
};