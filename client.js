const axios = require("axios");
console.log("client is running...");

const getPosts = async () => {
  const response = await axios.get("http://localhost:3001/airbnb");
  console.log(response);
};

getPosts();
