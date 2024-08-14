const List = require("../models/list");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const redis = require("../config/redis");

exports.createTodo = async (req, res) => {
  try {
    const { description } = req.body;

    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        data: null,
        message: "No token provided.",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        data: null,
        message: "Invalid token.",
      });
    }

    const { id } = decoded;

    if (!description) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Description is required and cannot be empty.",
      });
    }

    const existingTodo = await List.findOne({ description, userId: id });
    if (existingTodo) {
      return res.status(409).json({
        success: false,
        data: null,
        message: "Duplicate todo description is not allowed for this user.",
      });
    }

    const newTodo = new List({
      description,
      userId: id,
    });

    const response = await newTodo.save();

    await redis.del(`todos:${id}`);

    res.status(201).json({
      success: true,
      data: response,
      message: "Entry created successfully",
    });
  } catch (error) {
    console.error("Error creating Todo:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Invalid input data.",
      });
    }

    res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
    });
  }
};
