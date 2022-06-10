class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _isResOk(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  downloadingCardsServer() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._isResOk);
  }

  loadingUserInformation() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._isResOk);
  }

  setUserInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      }),
    }).then(this._isResOk);
  }

  addingNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._isResOk);
  }

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._isResOk);
  }

  addLike(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._isResOk);
  }

  removeLike(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._isResOk);
  }

  setUserAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar
      }),
    }).then(this._isResOk);
  }
}

const token = localStorage.getItem('jwt');
const api = new Api({
  url: "https://api.mesto.app.nomoredomains.xyz",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default api;

// import BASE_URL from './utils';
// class Api {
//   constructor({ address }) {
//     this._address = address;
//   }

//   //возвращаем результат работы метода
//   _checkStatus = (res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Error: ${res.status}`);
//   };

//   //добавление новой карточки
//   addingNewCard = ({ name, link }) => {
//     return fetch(`${this._address}/cards`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
// 			credentials: 'include',
//       body: JSON.stringify({ name, link }),
//     }).then((res) => this._checkStatus(res));
//   };

//   // постановка и снятие лайка
//   addLike = (id) => {
//     return fetch(`${this._address}/cards/likes/${id}`, {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
// 			credentials: 'include',
//     }).then((res) => this._checkStatus(res));
//   };

//   // удаление лайка
//   removeLike = (id) => {
//     return fetch(`${this._address}/cards/likes/${id}`, {
//       method: "DELETE",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
// 			credentials: 'include',
//     }).then((res) => this._checkStatus(res));
//   };

//   // загрузка информации о пользователе с сервера
//   loadingUserInformation() {
//     return fetch(`${this._address}/users/me`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
// 			credentials: 'include',
//     }).then((res) => this._checkStatus(res));
//   }

//   //загрузка карточек с сервера
//   downloadingCardsServer = () => {
//     return fetch(`${this._address}/cards`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
// 			credentials: 'include',
//     }).then((res) => this._checkStatus(res));
//   };

//   // удаление карточки
//   deleteCard = (id) => {
//     return fetch(`${this._address}/cards/${id}`, {
//       method: "DELETE",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
// 			credentials: 'include',
//     }).then((res) => this._checkStatus(res));
//   };

//   //редактирование профиля
//   setUserInfo = (data) => {
//     return fetch(`${this._address}/users/me`, {
//       method: "PATCH",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name: data.name,
//         about: data.about,
//       }),
// 			credentials: 'include',
//     }).then((res) => this._checkStatus(res));
//   };

//   // обновление аватара пользователя
//   setUserAvatar = (item) => {
//     return fetch(`${this._address}/users/me/avatar`, {
//       method: "PATCH",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         avatar: item.avatar,
//       }),
// 			credentials: 'include',
//     }).then((res) => this._checkStatus(res));
//   };
// }

// const api = new Api({
//   address: BASE_URL
// });

// export default api;
