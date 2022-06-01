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
      body: JSON.stringify({ password, email }),
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
    }).then(this._checkResponse);
  };
}

const auth = new Auth({
  address: "https://auth.nomoreparties.co",
});

export default auth;