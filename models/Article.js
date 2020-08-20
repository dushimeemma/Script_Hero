import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
});

const Article = mongoose.model('article', articleSchema);

export default Article;
