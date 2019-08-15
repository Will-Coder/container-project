const mongoose = require('mongoose');
const Container = mongoose.model('Container');

exports.findAll = (req, res) => {
  Container.find({}, (err, json) => {
    if (err) return console.log(err);
    res.send(json);
  });
};

exports.findById = (req, res) => {
  const id = req.params.id;
  Container.findOne({ _id: id }, (err, json) => {
    if (err) return console.log(err);
    return res.send(json);
  });
};

exports.add = function(req, res) {
  Container.create(req.body, function(err, container) {
    if (err) return console.log(err);
    return res.send(container);
  });
};

exports.update = (req, res) => {
  // console.log(req.body);
  const id = req.params.id;
  Container.findByIdAndUpdate(id, req.body, { new: true }, (err, response) => {
    if (err) return console.log(err);
    res.send(response);
  });
};

exports.delete = function(req, res) {
  let id = req.params.id;
  Container.remove({ _id: id }, result => {
    return res.sendStatus(200);
  });
};

exports.killall = (req, res) => {
  Container.deleteMany({}, err => {
    if (err) return console.log(err);
    return res.sendStatus(202);
  });
};

exports.upload = function(req, res) {
  console.log(req.files);
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let file = req.files.file;
  file.mv(`./public/img/${req.body.filename}`, err => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.sendStatus(200);
  });
};

exports.import = function(req, res) {
  Container.create(
    {
      title: 'Meyer Lemon tree',
      description:
        'Potted dwarf lemon tree',
      image: 'lemontree.jpg',
      ingredients: ['potting soil', 'fertilizer', 'seeds/plant'],
      preparation: [
        { step: 'Drill drainage hole in pot' },
        { step: 'Add potting soil' },
        { step: 'Add liquid fertilizer' }
      ]
    },
    {
      title: 'Plum tree',
      description:
        'Potted dwarf plum tree',
      image: 'plumtree.jpg',
      ingredients: ['potting soil', 'fertilizer', 'seeds/plant'],
      preparation: [
        { step: 'Drill drainage hole in pot' },
        { step: 'Add potting soil' },
        { step: 'Add liquid fertilizer' }
      ]
    },
    {
      title: 'Tropicals',
      description:
        'Potted tropical plants. Mandevilla, Hybrid Vinca, Hibuscus',
      image: 'tropicals.jpg',
      ingredients: ['potting soil', 'fertilizer', 'seeds/plant'],
      preparation: [
        { step: 'Drill drainage hole in pot' },
        { step: 'Add potting soil' },
        { step: 'Add liquid fertilizer' }
      ]
    },
    {
      title: 'Annuals',
      description:
        'Potted annual plants. An annual plant is a plant that completes its life cycle, from germination to the production of seeds, within one growing season, and then dies.(https://en.wikipedia.org/wiki/Annual_plant).  Dusty Miller',
      image: 'annuals.jpg',
      ingredients: ['potting soil', 'fertilizer', 'seeds/plant'],
      preparation: [
        { step: 'Drill drainage hole in pot' },
        { step: 'Add potting soil' },
        { step: 'Add liquid fertilizer' }
      ]
    },
    {
      title: 'Flowers',
      description:
        'Corn flowers',
      image: 'flowers.jpg',
      ingredients: ['potting soil', 'fertilizer', 'seeds/plant'],
      preparation: [
        { step: 'Drill drainage hole in pot' },
        { step: 'Add potting soil' },
        { step: 'Add liquid fertilizer' }
      ]
    },
    {
      title: 'Sweet Pea',
      description:
        'Sweet pea is a flowering climbing plant',
      image: 'sweetpea.jpg',
      ingredients: ['potting soil', 'fertilizer', 'seeds/plant'],
      preparation: [
        { step: 'Drill drainage hole in pot' },
        { step: 'Add potting soil' },
        { step: 'Add liquid fertilizer' }
      ]
    },
    {
      title: 'Plants',
      description:
        'A variety of annual flowers',
      image: 'plants.jpg',
      ingredients: ['potting soil', 'fertilizer', 'seeds/plant'],
      preparation: [
        { step: 'Drill drainage hole in pot' },
        { step: 'Add potting soil' },
        { step: 'Add liquid fertilizer' }
      ]
    },

    function(err) {
      if (err) return console.log(err);
      return res.sendStatus(202);
    }
  );
};
