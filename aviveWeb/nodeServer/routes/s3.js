var fs = require('fs');
var AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();

require('dotenv').config();

const s3 = new AWS.S3(
  {
    accessKeyId: process.env.AWS_AccessKeyId,
    secretAccessKey: process.env.AWS_SecretAccessKey,
    region: process.env.AWS_Region
  }
)

const params = {
  Bucket: 'avivebucket',
  Key: 'image/' + 'imageTest2',
  Body: fs.readFileSync("라따뚜이.png"),
  ContentType: 'image/png',
};

router.post('/', function (req, res){
  s3.upload(params, function (err, data){
    if(err) {
      throw err;
    }
    console.log('File uploaded successfully. ${data}');
  }).promise(); 
  res.send('good!');
});

module.exports = router;