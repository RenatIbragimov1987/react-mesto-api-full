import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
// import Loader from "./Loader";
import api from "../utils/Api";
import auth from "../utils/Auth";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInfoToolTip, setIsInfoToolTip] = useState(false);
  const history = useHistory();

  //загрузка данных пользователя с сервера
  useEffect(() => {
    setIsRequestLoading(true);
    api
      .loadingUserInformation() //запрос
      .then((currentUser) => {
        setCurrentUser(currentUser); //вытянули данные в State
      })
      .catch((err) => {
        console.log(`Ошибка запроса данных пользователя с сервера: ${err}`);
      })
			.finally(() => {
        setIsRequestLoading(false);
      });
  }, []);

  // загрузка карточек с сервера
  useEffect(() => {
    setIsRequestLoading(true);
    api
      .downloadingCardsServer() //запрос
      .then((cards) => {
        setCards(cards); //вытянули данные в State
      })
      .catch((err) => {
        console.log(`Ошибка загрузки карточек с сервера: ${err}`);
      })
			.finally(() => {
        setIsRequestLoading(false);
      });
  }, []);

  //лайки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
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
  function handleAddPlaceSubmit(name, link) {
    setIsRequestLoading(true);
    api
      .addingNewCard(name, link)
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

  //регистрация
  function registration(email, password) {
		setIsRequestLoading(true)
    auth
      .userRegistration(email, password)
      .then(() => {
        setIsSuccess(true);
        authorization(email, password);
        setIsInfoToolTip(true);
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoToolTip(true);
        console.log(`Ошибка регистрации: ${err}`);
      })
			.finally(() => {
        setIsRequestLoading(false);
      });
  }

  //авторизация
  // function authorization(email, password) {
	// 	setIsRequestLoading(true)
  //   auth
  //     .userAuthorization(email, password)
  //     .then((data) => {
  //       if (data.token) {
  //         setLoggedIn(true);
  //         localStorage.setItem("jwt", data.token);
  //         setEmail(email);
  //         history.push("/");
  //       }
  //     })
  //     .catch((err) => {
  //       setIsSuccess(false);
  //       setIsInfoToolTip(true);
  //       console.log(`Ошибка авторизации: ${err}`);
  //     })
	// 		.finally(() => {
  //       setIsRequestLoading(false);
  //     });
  // }

	function authorization(email, password) {
		setIsRequestLoading(true);
		auth.userAuthorization(email, password)
				.then((data) => {
						checkRes(data)
						setLoggedIn(true);
						history.push('/');
				})
				.catch((err) => {
						console.error(err)
						setIsInfoToolTip({
								open: true,
								status: false
						});
						console.log(`Ошибка авторизации: ${err}`);

				})
				.finally(() => {
					setIsRequestLoading(false);
				});
	};
  //выход с сайта
  function handleExitWebsite() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
    history.push("/sign-in");
  }

  function handleToken() {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      auth
        .userToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(`Ошибка токена: ${err}`);
        });
    }
  }

  useEffect(() => {
    handleToken();
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} handleExitWebsite={handleExitWebsite} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Route path="/sign-up">
            <Register registration={registration} />
          </Route>
          <Route path="/sign-in">
            <Login authorization={authorization} />
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
          isOpen={isInfoToolTip}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
