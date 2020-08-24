const multer = require("multer");
const path=require('path')

let dateNow = Date.now();
console.log("Display date ", dateNow);

let storage = multer.diskStorage({
  destination: path.resolve('src/public/uploads'),
  filename: (req, file, cb) => {
    cb(null, `${dateNow}-sogesha-${file.originalname}`);
  },
});

let uploadFile = multer({
  storage: storage,
});

module.exports = { uploadFile };
