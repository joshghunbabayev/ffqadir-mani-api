import multer from 'multer';

const Photo = multer({
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|webp|tif|tiff|svg|heic|heif)$/i)) {
            return cb(undefined, false);
        }
        return cb(undefined, true);
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, "tmp/"),
        filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
    })
});

export default Photo;
