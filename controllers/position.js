const Position = require('../models/Position');
const errHandler = require('../utils/errorHandler');


async function getByCategoryId(req, res) {
    try {
        const position = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        });

        res.status(200).json(position);
    } catch (e) {
        errHandler(res, e);
    }
}

async function create(req, res) {
    try {
        const position = await new Position({
          name: req.body.name,
          cost: req.body.cost,
          category: req.body.category,
          user: req.user.id
        }).save();
        res.status(201).json(position);
    } catch (e) {
        errHandler(res, e);
    }
}

async function remove(req, res) {
    try {
    await Position.remove({
      _id: req.params.id
    });
    res.status(200).json({
      message: 'Position has been deleted'
    })
    } catch (e) {
        errHandler(res, e);
    }
}

async function update(req, res) {
    try {
      const position = await Position.findOneAndUpdate(
          {_id: req.params.id},
          {$set: req.body},
          {new: true}); // update data from req.body
      res.status(200).json(position);
    } catch (e) {
        errHandler(res, e);
    }
}

module.exports = {
    getByCategoryId,
    create,
    remove,
    update
};
