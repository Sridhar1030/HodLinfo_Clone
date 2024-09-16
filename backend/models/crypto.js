import { Schema, model } from 'mongoose';

const cryptoSchema = new Schema({
    name: String,
    last: String,
    buy: String,
    sell: String,
    volume: String,
    base_unit: String,
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const Crypto = model('Crypto', cryptoSchema);

export default Crypto;
