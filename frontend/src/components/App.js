import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import '../index.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import auth from '../utils/Auth';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [data, setData] = useState({
    email: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInfoToolTip, setIsInfoToolTip] = useState(false);
  const history = useHistory();

  function handleEditProfileClick() {
    // меняем состояние "редактировать профиль"
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    // меняем состояние "добавления нового места"
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    // меняем состояние "смены аватара"
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    // меняем состояние "большой картинки"
    setSelectedCard(card);
  }
  function closeAllPopups() {
    // закрытие попапов, возвращаем изначальное состояние false для функций
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoToolTip(false);
  }

  //лайки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк настоящего пользователя на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // установка лайка
    if (!isLiked) {
      api
        .addLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка установки лайка: ${err}`);
        });
    } else {
      //удаление лайка
      api
        .removeLike(card._id, isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка удаления лайка: ${err}`);
        });
    }
  }

  //удаление карточки
  function handleCardDelete(card) {
    setIsRequestLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки: ${err}`);
      })
      .finally(() => {
        setIsRequestLoading(false);
      });
  }

  //добавление карточки
  function handleAddPlaceSubmit(newCard) {
    setIsRequestLoading(true);
    api
      .addingNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка добавления карточки: ${err}`);
      })
      .finally(() => {
        setIsRequestLoading(false);
      });
  }

  //изменение данных профиля
  function handleUpdateUser(data) {
    setIsRequestLoading(true);
    api
      .setUserInfo(data)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка изменения данных профиля: ${err}`);
      })
      .finally(() => {
        setIsRequestLoading(false);
      });
  }

  //изменение аватарки
  function handleUpdateAvatar(item) {
    setIsRequestLoading(true);
    api
      .setUserAvatar(item)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка изменения данных профиля: ${err}`);
      })
      .finally(() => {
        setIsRequestLoading(false);
      });
  }

  const checkRes = (data) => {
    if (data) {
      setData({
        email: data.email,
      });
    }
  };

  // отобразить карточки и инфо пользователя
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.downloadingCardsServer(), api.loadingUserInformation()])
        .then(([cards, info]) => {
          setCards(cards);
          setCurrentUser(info);
        })
        .catch((err) =>
          console.log(
            `Ошибка загрузки данных с сервера (cards или userInfo) ${err}`
          )
        );
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      auth
        .getContent()
        .then((data) => {
          if (data && data.email) {
            setLoggedIn(true);
            history.push('/');
            checkRes(data);
          } else {
            setLoggedIn(false);
            history.push('/sign-in');
          }
        })
        .catch((err) => {
          setLoggedIn(false);
          setData({
            email: '',
          });
        });
    }
  }, [loggedIn, history]);

  //авторизация
  function authorization(email, password) {
    setIsRequestLoading(true);
    auth
      .userAuthorization(email, password)
      .then((data) => {
        checkRes(data);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoToolTip({
          open: true,
          status: false,
        });
        console.log(`Ошибка авторизации: ${err}`);
      })
      .finally(() => {
        setIsRequestLoading(false);
      });
  }

  //регистрация
  function registration(email, password) {
    setIsRequestLoading(true);
    auth
      .userRegistration(email, password)
      .then((data) => {
        checkRes(data);
        history.replace({ pathname: '/sign-in' });
        setIsSuccess(true);
        setIsInfoToolTip({
          open: true,
          status: true,
        });
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoToolTip({
          open: true,
          status: false,
        });
        console.log(`Ошибка регистрации: ${err}`);
      })
      .finally(() => {
        setIsRequestLoading(false);
      });
  }

  // выход
  const handleExitWebsite = () => {
    auth.signout();
    setLoggedIn(false);
    setData({
      email: null,
    });
    history.push('/sign-in');
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={data.email} handleExitWebsite={handleExitWebsite} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            cards={cards}
            loggedIn={loggedIn}
            component={Main}
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-in">
            <Login
              authorization={authorization}
              isRequestLoading={isRequestLoading}
            />
          </Route>
          <Route path="/sign-up">
            <Register
              registration={registration}
              isRequestLoading={isRequestLoading}
            />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isRequestLoading={isRequestLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isRequestLoading={isRequestLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isRequestLoading={isRequestLoading}
        />
        <ImagePopup
          name="type_image"
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          isInfoToolTip={isInfoToolTip}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
