// middleware/upload.js
const multer = require("multer");

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

module.exports = upload;
