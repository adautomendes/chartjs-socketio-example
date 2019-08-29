const Coord = require('../models/Coord');
const Logger = require('../logger')('[GRAPH]');

const io = require('../../socket');

async function searchAllCoords() {
    let x = [];
    let y = [];

    let coords = await Coord.find();

    coords.forEach((coord) => {
        x.push(coord.x);
        y.push(coord.y);
    });

    return { x, y }
}

module.exports = {
    async insert(req, res) {
        const { x, y } = req.body;

        await Coord.create({
            x,
            y
        });

        Logger.print(`[${x},${y}] created!`);

        /* Finding all coords to send to socket */
        const coords = await searchAllCoords();
        io.emit('graphUpdate', coords);

        return res.status(201).json(coords);
    },
    async search(req, res) {
        const coords = await searchAllCoords();

        return res.status(200).json(coords);
    },
    async clear(req, res) {
        await Coord.deleteMany();
        return res.status(204).json();
    }
};