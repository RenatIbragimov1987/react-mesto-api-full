class Api {
  constructor({ address, headers }) {
    this._address = address;
    this._headers = headers;
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
        Authorization: this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    }).then((res) => this._checkStatus(res));
  };

  // постановка и снятие лайка
  addLike = (id) => {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        Authorization: this._headers,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkStatus(res));
  };

  // удаление лайка
  removeLike = (id) => {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: this._headers,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkStatus(res));
  };

  // загрузка информации о пользователе с сервера
  loadingUserInformation() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: {
        Authorization: this._headers,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkStatus(res));
  }

  //загрузка карточек с сервера
  downloadingCardsServer = () => {
    return fetch(`${this._address}/cards`, {
      method: "GET",
      headers: {
        Authorization: this._headers,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkStatus(res));
  };

  // удаление карточки
  deleteCard = (id) => {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: this._headers,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkStatus(res));
  };

  //редактирование профиля
  setUserInfo = (data) => {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: this._headers,
        "Content-Type": "application/json",
      },
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
        Authorization: this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: item.avatar,
      }),
    }).then((res) => this._checkStatus(res));
  };
}

const api = new Api({
  address: "https://api.renat1987.nomoredomains.xyz",
  headers: "e8a9f2b0-25e0-4ec4-83e8-52c6f0623a7c",
});

export default api;
