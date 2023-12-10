const axios = require("axios");
console.log("client is running...");

const getPosts = async () => {
    const response = await axios.get("http://localhost:3000/airbnb");
    console.log(response);
};

getPosts();