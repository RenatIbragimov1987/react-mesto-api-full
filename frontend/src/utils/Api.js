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
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, link }),
    }).then((res) => this._checkStatus(res));
  };

  // постановка лайка
  addLike = (id) => {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((res) => this._checkStatus(res));
  };

  // удаление лайка
  removeLike = (id) => {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((res) => this._checkStatus(res));
  };

  // загрузка информации о пользователе с сервера
  loadingUserInformation() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((res) => this._checkStatus(res));
  }

  //загрузка карточек с сервера
  downloadingCardsServer = () => {
    return fetch(`${this._address}/cards`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((res) => this._checkStatus(res));
  };

  // удаление карточки
  deleteCard = (id) => {
    return fetch(`${this._address}/cards/${id}/delete-card`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((res) => this._checkStatus(res));
  };

  //редактирование профиля
  setUserInfo = ({ name, about }) => {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about,
      }),
      credentials: 'include',
    }).then((res) => this._checkStatus(res));
  };

  // обновление аватара пользователя
  setUserAvatar = ({ avatar }) => {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
      credentials: 'include',
    }).then((res) => this._checkStatus(res));
  };
}

const api = new Api({
  address: BASE_URL,
});

export default api;
