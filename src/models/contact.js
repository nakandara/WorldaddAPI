import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    userId:{ type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },

});

const Contact = mongoose.model("News", contactSchema);

export default Contact;
