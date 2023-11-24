import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  pdf: { type: String, required: true },
});

const News = mongoose.model("News", newsSchema);

export default News;
