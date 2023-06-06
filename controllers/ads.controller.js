const getImageFiletype = require('../utils/getImageFiletype');
const Ad = require('../models/Ad.model');
const fs = require('fs');
const sanitize = require('mongo-sanitize');
const sanitizeHtml = require('sanitize-html');
exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find({}));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(ad);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postNew = async (req, res) => {
  const title = sanitizeHtml(req.body.title, {
    allowedTags: [],
    allowedAttributes: {},
  });
  const content = sanitizeHtml(req.body.content, {
    allowedTags: [],
    allowedAttributes: {},
  });
  const publicationDate = sanitizeHtml(req.body.publicationDate, {
    allowedTags: [],
    allowedAttributes: {},
  });
  const localisation = sanitizeHtml(req.body.localisation, {
    allowedTags: [],
    allowedAttributes: {},
  });
  const price = parseFloat(req.body.price);
  const userId = req.session.login._id;
  const fileType = req.file ? await getImageFiletype(req.file) : 'unknown';

  if (
    title &&
    typeof title === 'string' &&
    content &&
    typeof content === 'string' &&
    price &&
    typeof price === 'number' &&
    publicationDate &&
    typeof publicationDate === 'string' &&
    localisation &&
    typeof localisation === 'string' &&
    req.file &&
    ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'].includes(fileType) &&
    title.length >= 10 &&
    title.length <= 50 &&
    content.length >= 20 &&
    content.length <= 1000
  ) {
    const [, ext] = req.file.originalname.split('.');
    if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg' && ext !== 'gif') {
      fs.unlinkSync('./public/uploads/' + req.file.filename);
      return res.status(400).send({ message: 'File extension is not correct' });
    }

    try {
      const newAd = await Ad.create({
        title,
        content,
        price,
        publicationDate,
        localisation,
        userId,
        image: req.file.filename,
      });
      res.json({ message: 'OK', newAd: newAd });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.status(400).send({ message: 'Invalid data.' });
    fs.unlinkSync('./public/uploads/' + req.file.filename);
  }
};

exports.update = async (req, res) => {
  const loggedUserId = req.session.login._id;

  const price = req.body.price ? parseFloat(req.body.price) : undefined;
  const title = sanitizeHtml(req.body.title, {
    allowedTags: [],
    allowedAttributes: {},
  });
  const content = sanitizeHtml(req.body.content, {
    allowedTags: [],
    allowedAttributes: {},
  });
  const publicationDate = sanitizeHtml(req.body.publicationDate, {
    allowedTags: [],
    allowedAttributes: {},
  });
  const localisation = sanitizeHtml(req.body.localisation, {
    allowedTags: [],
    allowedAttributes: {},
  });
  if (title) {
    if (!(typeof title === 'string' && title.length >= 10 && title.length <= 50)) {
      return res.status(400).send({ message: 'Invalid data' });
    }
  }
  if (content) {
    if (!(typeof content === 'string' && content.length >= 20 && content.length <= 1000)) {
      return res.status(400).send({ message: 'Invalid data' });
    }
  }
  if (price) {
    if (!(typeof price === 'number')) {
      return res.status(400).send({ message: 'Invalid data' });
    }
  }
  if (publicationDate) {
    if (!(typeof publicationDate === 'string')) {
      return res.status(400).send({ message: 'Invalid data' });
    }
  }
  if (localisation) {
    if (!(typeof localisation === 'string')) {
      if (req.file) {
        fs.unlinkSync('./public/uploads/' + req.file.filename);
      }
      return res.status(400).send({ message: 'Invalid data' });
    }
  }

  const fileType = req.file ? await getImageFiletype(req.file) : 'unknown';
  if (req.file) {
    const [, ext] = req.file.originalname.split('.');
    if (
      !['png', 'jpg', 'jpeg', 'gif'].includes(ext.toLowerCase()) ||
      !['image/png', 'image/jpg', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      fs.unlinkSync('./public/uploads/' + req.file.filename);
      return res.status(400).send({ message: 'Invalid data' });
    }
  }

  try {
    const presentData = await Ad.findById(req.params.id);
    if (presentData.userId !== loggedUserId) {
      return res.status(401).json({ message: 'You are not authorized' });
    }
    if (req.file && fs.existsSync('./public/uploads/' + presentData.image)) {
      fs.unlinkSync('./public/uploads/' + presentData.image);
    }

    const ad = await Ad.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: title,
          content: content,
          price: price,
          pubicationDate: publicationDate,
          localisation: localisation,
          ...(req.file && req.file.filename && { image: req.file.filename }),
        },
      },
      { new: true }
    );
    if (ad) {
      res.json({ message: 'OK', updatedAd: ad });
    } else {
      res.status(404).json({ message: 'Not found...' });
      if (req.file) {
        fs.unlinkSync('./public/uploads/' + req.file.filename);
      }
    }
  } catch (err) {
    res.status(500).json({ message: err });
    if (req.file) {
      fs.unlinkSync('./public/uploads/' + req.file.filename);
    }
  }
};

exports.delete = async (req, res) => {
  const loggedUserId = req.session.login._id;

  try {
    const presentData = await Ad.findById(req.params.id);
    if (presentData.userId !== loggedUserId) {
      return res.status(401).json({ message: 'You are not authorized' });
    }
    if (fs.existsSync('./public/uploads/' + presentData.image)) {
      fs.unlinkSync('./public/uploads/' + presentData.image);
    }
    const ad = await Ad.findByIdAndDelete(req.params.id);
    if (ad) {
      res.json({ message: 'OK', deletedAd: ad });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.searchByPhrase = async (req, res) => {
  const searchPhrase = req.params.searchPhrase;

  try {
    const ads = await Ad.find({
      $or: [{ title: { $regex: searchPhrase, $options: 'i' } }, { content: { $regex: searchPhrase, $options: 'i' } }],
    });
    if (ads.length > 0) {
      res.json({ message: 'OK', ads });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
