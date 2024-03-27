const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    name: {
        type: String,
    },
    devices: [
        {
        type: Schema.Types.ObjectId,
        ref: 'devices',
        },
    ],
});
Type = mongoose.model('types', TypeSchema);
module.exports = Type;
