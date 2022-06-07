import BASE_URL from './utils';
class Auth {
  constructor({ address }) {
    this._backendUrl = address;
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  userRegistration = (password, email) => {
    return fetch(`${this._backendUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
			credentials: 'include',
      body: JSON.stringify({ password, email }),
    }).then(this._checkResponse);
  };

  userAuthorization = (password, email) => {
    return fetch(`${this._backendUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
			credentials: 'include',
      body: JSON.stringify({ password, email }),
    }).then(this._checkResponse);
  };

// 	signout = () => {
//     return fetch(`${this._backendUrl}/signout`, {
//         method: "GET",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//         credentials: 'include',
//     }).then(this._checkResponse);
// };

getContent = () => {
    return fetch(`${this._backendUrl}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: 'include',
    }).then(this._checkResponse);
};

  userToken = (token) => {
    return fetch(`${this._backendUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
			credentials: 'include',
    }).then(this._checkResponse);
  };
}

const auth = new Auth({
  address: BASE_URL
});

export default auth;
