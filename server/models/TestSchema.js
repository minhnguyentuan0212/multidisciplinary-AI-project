const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = new Schema(
    {
    device_id: {
        type: String,
        required: true,
    },
    key: {
        type: String,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    data: [
        {
        data_id: {
            type: String,
        },
        value: {
            type: String,
        },
        created_at: {
            type: Date,
        },
        },
    ],
    },
    { retainKeyOrder: true }
);
Test = mongoose.model('test', TestSchema);
module.exports = Test;