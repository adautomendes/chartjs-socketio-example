const Coord = require('../models/Coord');
const Logger = require('../logger')('[GRAPH]');

const io = require('../../socket');

async function searchAllCoords() {
    /* Find all coords and exclude id and v fields */
    let coords = await Coord.find({}, { 
        __v: false,
        _id: false
    });

    /* Sending coords to socket */
    io.emit('graphUpdate', coords);

    return coords;
}

module.exports = {
    async insert(req, res) {
        const { x, y } = req.body;

        await Coord.create({
            x,
            y
        });

        Logger.print(`[${x},${y}] created!`);

        const coords = await searchAllCoords();
        return res.status(201).json(coords);
    },
    async search(req, res) {
        const coords = await searchAllCoords();
        return res.status(200).json(coords);
    },
    async clear(req, res) {
        await Coord.deleteMany();

        const coords = await searchAllCoords();
        return res.status(200).json(coords);
    }
};