const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const getImageFiletype = require('../utils/getImageFiletype');
const fs = require('fs');
const sanitize = require('mongo-sanitize');

exports.register = async (req, res) => {
  try {
    const login = sanitize(req.body.login);
    const password = req.body.password;
    const phone = sanitize(req.body.phone);
    const fileType = req.file ? await getImageFiletype(req.file) : 'unknown';
    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string' &&
      phone &&
      typeof phone === 'string' &&
      req.file &&
      ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      const [, ext] = req.file.originalname.split('.');
      if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg' && ext !== 'gif') {
        return res.status(400).send({ message: 'File extension is not correct' });
      }
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        fs.unlinkSync('./public/uploads/' + req.file.filename);
        return res.status(409).send({ message: 'User with this login already exists' }); //409 - conflict
      }
      const user = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        phone,
        image: req.file.filename,
      });
      res.status(201).send({ message: 'User created:' + user.login });
    } else {
      fs.unlinkSync('./public/uploads/' + req.file.filename);
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const login = req.body.login;
    const password = req.body.password;
    if (login && typeof login === 'string' && password && typeof password === 'string') {
      const user = await User.findOne({ login });
      if (!user) {
        res.status(400).send({ message: 'Login or password are incorrect' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.login = user;
          res.status(200).send({ message: 'Login successful' });
        } else {
          res.status(400).send({ message: 'Login or password are incorrect' });
        }
      }
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  res.send({ message: 'Logged', user: req.session.login.login });
};

exports.logout = async (req, res) => {
  req.session.destroy();
  res.send({ message: 'Logged out' });
};
