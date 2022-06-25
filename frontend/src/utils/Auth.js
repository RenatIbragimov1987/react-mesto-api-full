import BASE_URL from './utils';
class Auth {
  constructor({ address }) {
    this._backendUrl = address;
  };

  _checkResponse = (res) => {
		console.log('res', res);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);

  };

	//регистрация
  userRegistration = (email, password) => {
    return fetch(`${this._backendUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
			credentials: 'include',
      body: JSON.stringify({email, password}),
    })
		.then(this._checkResponse);
  };

	//авторизация
  userAuthorization (email, password) {
			return fetch(`${this._backendUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
			credentials: 'include',
      body: JSON.stringify({email, password}),
		})
		.then(this._checkResponse)
		.catch(err => {
			console.log('err', err);
		})
  };


	signout = () => {
    return fetch(`${this._backendUrl}/signout`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: 'include',
    })
		.then(this._checkResponse);
  };

	getContent = () => {
    return fetch(`${this._backendUrl}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: 'include',
    })
    .then(this._checkResponse);
	};

}

const auth = new Auth({
  address: BASE_URL,
});

export default auth;
