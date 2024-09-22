var express = require('express');
var router = express.Router();

const UserModel = require('../models/user');

router.post('/', async function (req, res) {
  // const groupID = req.body.group_ID;

  // if (!groupID) {
  //     throw new Error("Missing required fields");
  // }

  try {
      const userTB = await UserModel.UserList();

      if (userTB.error) {
          throw userTB.error;
      }
      else
          res.send({ message: ' user table post', data: userTB.result })
  } catch (error) {
      res.send('오류 발생: ' + error.message);
  }
});

module.exports = router;
