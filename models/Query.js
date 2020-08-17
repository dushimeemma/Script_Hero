import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const querySchema = new Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Query = mongoose.model('query', querySchema);

export default Query;
