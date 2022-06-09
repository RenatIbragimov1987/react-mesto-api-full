import BASE_URL from './utils';
class Api {
  constructor({ address }) {
    this._address = address;
  }

  //возвращаем результат работы метода
  _checkStatus = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  //добавление новой карточки
  addingNewCard = ({ name, link }) => {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
			// credentials: 'include',
      body: JSON.stringify({ name, link }),
    }).then((res) => this._checkStatus(res));
  };

  // постановка и снятие лайка
  addLike = (id) => {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
			// credentials: 'include',
    }).then((res) => this._checkStatus(res));
  };

  // удаление лайка
  removeLike = (id) => {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
			// credentials: 'include',
    }).then((res) => this._checkStatus(res));
  };

  // загрузка информации о пользователе с сервера
  loadingUserInformation() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
			// credentials: 'include',
    }).then((res) => this._checkStatus(res));
  }

  //загрузка карточек с сервера
  downloadingCardsServer = () => {
    return fetch(`${this._address}/cards`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
			// credentials: 'include',
    }).then((res) => this._checkStatus(res));
  };

  // удаление карточки
  deleteCard = (id) => {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
			// credentials: 'include',
    }).then((res) => this._checkStatus(res));
  };

  //редактирование профиля
  setUserInfo = (data) => {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
			// credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkStatus(res));
  };

  // обновление аватара пользователя
  setUserAvatar = (item) => {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: item.avatar,
      }),
			// credentials: 'include',
    }).then((res) => this._checkStatus(res));
  };
}

const api = new Api({
  address: BASE_URL
});

export default api;
