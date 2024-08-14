const redis = require("redis");
const client = redis.createClient({
  url: process.env.REDIS_URL, // Update with your Redis server URL
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

client.connect()
.then(()=>console.log("Redis connected")).catch((err)=>console.error("redis connection",err))

module.exports = client;
