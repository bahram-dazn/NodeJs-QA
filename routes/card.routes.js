const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
const cardSchema =require('./../models/card.model');


const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = (app) => {

  app.get(`/api/cards`, async (req, res) => {
    const cards = db.get('cards').value();
    return res.status(200).send(cards);
  });

  app.post(`/api/card`, async (req, res) => {
    const { name, pan, limit, balance=0 } = req.body;
  
  // Schema Validation
  const result = cardSchema.validate({ name, pan, limit, balance}); 
  const { value, error } = result; 
  const valid = error == null; 
  if (!valid) { 
    // Schema Validation Error Response
    return res.status(422).json({ 
      error: error, 
      data: value 
    });
  } else { 
      const id = shortid.generate();
      const cards = db
        .get('cards')
        .push({ id, name, pan, limit, balance })
        .write();

      const card = db.get('cards')
        .find({ id })
        .value();
      // Schema Validation Success Response
      return res.status(201).send({
        error: false,
        card
      });
    }
  })

  app.put(`/api/card`, async (req, res) => {
    const { name, pan, limit, balance, id } = req.body;

    let cards = db.get('cards')
        .find({ id })
        .assign({ name, pan, limit, balance })
        .write();

    const card = db.get('cards')
      .find({ id })
      .value();

    return res.status(202).send({
      error: false,
      card
    });
  });

  app.delete(`/api/card/:id`, async (req, res) => {
    const { id } = req.params;
    console.log(id);

    db.get('cards')
      .remove({ id })
      .write()

    return res.status(202).send({
      error: false
    })

  })

}