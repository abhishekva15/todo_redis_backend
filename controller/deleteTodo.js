const List = require("../models/list");
const redis = require("../config/redis"); 

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await List.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    await redis.del(`todos:${todo.userId}`);

    res.status(200).json({
      success: true,
      message: "Todo deleted",
    });
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Server error",
    });
  }
};
