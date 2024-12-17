const express = require("express");
const path = require("path");
const { enforce } = require("express-sslify");

const app = express();
const PORT = process.env.PORT || 5000;

// Використовуй middleware для HTTPS редіректу
app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

