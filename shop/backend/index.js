const express = require("express");
const cors=require('cors')
const app = express();
app.use(cors())

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    res.status(200).json(data); 
    // console.log(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(8000, () => {
  console.log("App is live at 8000 port");
});
