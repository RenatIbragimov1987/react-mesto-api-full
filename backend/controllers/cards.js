const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundDataError = require('../errors/NotFoundDataError');
const DeleteDataError = require('../errors/DeleteDataError');

const getCard = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate((['owner', 'likes'])).exec();
    res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const owner = req.userId;
    const { name, link } = req.body;
    const card = new Card({ name, link, owner });
    await card.save();
    await card.populate('owner');
    res.status(201).send(await card.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Произошла ошибка. Поля должны быть заполнены'));
      return;
    }
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const cardById = await Card.findById(cardId);
    if (!cardById) {
      next(new NotFoundDataError('Нет карточки с этим id'));
      return;
    }
    const cardOwner = cardById.owner.toString();
    if (cardOwner !== req.userId) {
      next(new DeleteDataError('Нет прав для удаления чужой карточки'));
      return;
    }
    const cardDelete = await Card.findByIdAndDelete(cardById);
    res.status(200).send(cardDelete);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Неверный id у карточки'));
      return;
    }
    next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.userId } },
      { new: true },
    ).populate(['owner', 'likes']);
    if (!like) {
      next(new NotFoundDataError('Нет карточки с этим id'));
      return;
    }
    res.status(200).send(like);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Неверный id у карточки'));
      return;
    }
    next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.userId } },
      { new: true },
    ).populate(['owner', 'likes']);
    if (!like) {
      next(new NotFoundDataError('Нет карточки с этим id'));
      return;
    }
    res.status(200).send(like);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Неверный id у карточки'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
