const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get(
  "/",
  (req, res) => {
    res.send("hello world");
  },

  app.post("/ocr", (req, res) => {
    const { image } = req.body;

    if (image === undefined) {
      return res.status(400).json({ success: false, error: "Empty image" });
    }
    try {
      const options = {
        method: "GET",
        url: "https://ocr-extract-text.p.rapidapi.com/ocr",
        params: {
          url: `${image}`,
        },
        headers: {
          "X-RapidAPI-Key":
            "0e8903e27emsh2333e866a960be6p1d76cbjsn8250ba0b208d",
          "X-RapidAPI-Host": "ocr-extract-text.p.rapidapi.com",
        },
      };
      axios.request(options).then((response) => {
        res.json(response.data);
        console.log(response.data);
      });
    } catch (err) {
      res.status(500).json({ err });
    }
  })
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port} `);
});
