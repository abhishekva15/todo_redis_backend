
const List = require("../models/list");
const redis = require("../config/redis"); 

exports.updateSuccess = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    
    const todo = await List.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    
    const userId = todo.userId; 
    await redis.del(`todos:${userId}`);


    res.status(200).json({
      success: true,
      data: todo,
      message: "Updated Successfully",
    });
  } catch (error) {
    console.error("Error updating todo:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Server error",
    });
  }
};
