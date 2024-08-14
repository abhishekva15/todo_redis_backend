const List = require("../models/list");
const jwt = require("jsonwebtoken");
const redis = require("../config/redis"); 

exports.getTodo = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    const userId = decodedToken.id;

    const cacheKey = `todos:${userId}`;
    const cachedTodos = await redis.get(cacheKey);

    if (cachedTodos) {
      return res.json(JSON.parse(cachedTodos));
    }

    const todos = await List.find({ userId });
    const totalTodos = todos.length;

    const response = {
      success: true,
      data: todos,
      totalTodos, 
      message: "Todos fetched successfully",
    };

  
    await redis.set(cacheKey, JSON.stringify(response), "EX", 60);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching todo data:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Server error",
    });
  }
};
