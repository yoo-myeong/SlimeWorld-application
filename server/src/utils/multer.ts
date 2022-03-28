import { config } from "./../config/config";
import multer from "multer";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";
import path from "path";

AWS.config.update({
    accessKeyId: config.aws.s3.accessKeyId,
    secretAccessKey: config.aws.s3.secretAccessKey,
    region: "ap-northeast-2",
});

export const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: "slimepost",
        key(req, file, cb) {
            cb(null, `post/${+new Date()}${path.basename(file.originalname)}`);
        },
    }),
});
