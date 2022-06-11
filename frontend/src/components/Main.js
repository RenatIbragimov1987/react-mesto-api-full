import React, { useContext } from "react";
import "../utils/Api";
import profilePencil from "../images/VectorEdditButton.svg";
import profileButtonPlus from "../images/Vectorbutton.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile page__profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            {currentUser.avatar && (
              <img
                className="profile__avatar"
                name="avatar"
                src={currentUser.avatar}
                alt="аватар"
              />
            )}
            <div className="profile__button-background">
              <button
                type="button"
                className="profile__edit-avatar"
                onClick={props.onEditAvatar}
                aria-label="Редактировать аватар"
              ></button>
            </div>
          </div>
          <div className="profile__profile-info">
            <div className="profile__name-info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                onClick={props.onEditProfile}
                type="button"
              >
                <img
                  className="profile__pencil"
                  src={profilePencil}
                  alt="Редактировать профиль"
                />
              </button>
            </div>
            <p className="profile__paragraph">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__button-add"
          onClick={props.onAddPlace}
          type="button"
        >
          <img
            className="profile__plus"
            src={profileButtonPlus}
            alt="Добавить место"
          />
        </button>
      </section>
      <ul className="elements page__elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
            onCardClick={props.onCardClick}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
