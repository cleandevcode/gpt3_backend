import mongoose from "mongoose";
import user from "../models/user.js";
import { stripe } from "../utils/stripe.js";
import admin from "../utils/firebase.js";

// add user
export const addUser = async (req, res) => {
  try {
    // add user to stripe customer
    const customer = await stripe.customers.create({
      email: req.body.email,
    });

    // add user to db
    const userDe = await user.create({ ...req.body, customerId: customer.id });

    res
      .status(200)
      .json({
        status: "valid",
        userDe: { ...req.body, customerId: customer.id },
        message: "user added",
      });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

// all user
export const getUsers = async (req, res) => {
  try {
    const alluser = await user.find();

    res.status(200).json({ alluser });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

// single user
export const geUserDetails = async (req, res) => {
  try {
    const userDe = await user.findOne({ uid: req.headers.uid });
    res.status(200).json(userDe);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  const mandatoryFields = ["userName", "email"];
  const missingFields = mandatoryFields.filter((field) => !req.body[field]);
  if (missingFields.length) {
    return res
      .status(400)
      .json({
        message: `The following fields are required: ${missingFields.join(
          ", "
        )}`,
      });
  }

  try {
    await user.findOneAndUpdate(
      { _id: req.params._id },
      {
        $set: {
          ...req.body,
        },
        runValidators: true,
        new: true,
      }
    );
    res.status(200).json({ ...req.body, message: "user updated" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update password
export const updatePassword = async (req, res) => {
  const { uid, newPassword } = req.body;
  try {
    await admin.auth().updateUser(uid, { password: newPassword });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
