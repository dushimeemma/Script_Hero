import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  registerDate: { type: Date, default: Date.now },
});

const User = mongoose.model('user', UserSchema);
export default User;