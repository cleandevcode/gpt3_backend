import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    uid: { type: String, required: true },
    avatar: { type: String },
    title: {type: String},
    userName: { type: String, required: true },
    organization: {type: String},
    industry: {type: String},
    language: {type: String},
    timeZone: {type: String},
    country: {type: String},
    email: { type: String, required: true },
    customerId: { type: String, required: true },
    authority: { type: Array, required: true },
});

export default mongoose.model("user", userSchema);