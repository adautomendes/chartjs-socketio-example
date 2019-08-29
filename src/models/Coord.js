const { Schema, model } = require('mongoose');

const CoordSchema = new Schema(
    {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    }
);

module.exports = model('Coord', CoordSchema);