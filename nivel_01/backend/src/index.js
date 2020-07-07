const express = require("express");

const app = express();

app.get("/", (request, response) => {
    return response.json({messsage: "Hello GoStack"})
})

app.listen(3333, () => {
    console.log("🚀 Backend started!")
})