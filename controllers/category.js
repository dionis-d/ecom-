const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

async function getAll(req, res) {
    try {
        const categories = await Category.find({
            user: req.user.id
        });
        res.status(200).json(categories);
    } catch (err) {
        errorHandler(res, err);
    }
}

async function getById(req, res) {
    try {
        const category = await Category.findById({
            user: req.user.id
        });
        res.status(200).json(category);

    } catch (err) {
        errorHandler(res, err);
    }
}

async function remove(req, res) {
    try {
        await Category.remove({_id: req.params.id});
        await Position.remove({category: req.params.id});
        res.status(200).json({message: 'category has been deleted'})
    } catch (err) {
        errorHandler(res, err);
    }
}

function create(req, res) {
    try {

    } catch (err) {
        errorHandler(res, err);
    }
}

function update(req, res) {
    try {

    } catch (err) {
        errorHandler(res, err);
    }
}

module.exports = {
    getAll,
    getById,
    remove,
    create,
    update
};