import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {useContext} from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__trash ${
    isOwn ? "element__trash_type_visible" : "element__trash"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (`element__like ${isLiked ? "element__like_active_black" : "element__like"}`);

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="element">
      <div className="element__container">
        <button
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
          type="button"
        ></button>
        <img
          className="element__card"
          onClick={handleClick}
          src={card.link}
          alt={card.name}
        />
      </div>
      <div className="element__info">
        <h2 className="element__title" type="text">
          {card.name}
        </h2>
        <div className="element__likes-info">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <p className="element__counter-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
