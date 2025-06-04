
import { Schema, model } from "mongoose";

const collectionSchema = new Schema({
    name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

export default model("Collection", collectionSchema);
