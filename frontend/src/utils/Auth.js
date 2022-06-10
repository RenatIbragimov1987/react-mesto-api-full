export const url = 'https://api.renat1987.nomoredomains.xyz/';

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export const userRegistration = (email, password) => {
  return fetch(`${url}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password
    }),
  })
    .then(checkResponse)
}

export const userAuthorization = (email, password) => {
  return fetch(`${url}signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password})
  })
    .then(checkResponse)
}

export const getContent = (token) => {
  return fetch(`${url}users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
}



// import BASE_URL from "./utils";

// const checkResponse = (res) => {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(`Error: ${res.status}`);
// };

// export const userRegistration = (email, password) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     credentials: 'include',
//     body: JSON.stringify({email, password}),
//   }).then(checkResponse);
// };

// export const userAuthorization = (email, password) => {
//   return fetch(`${BASE_URL}/signin`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     credentials: 'include',
//     body: JSON.stringify({email, password}),
//   }).then(checkResponse);
// };

// export const signout = () => {
//   return fetch(`${BASE_URL}/signout`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     credentials: 'include',
//   }).then(checkResponse);
// };

// export const getContent = () => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     credentials: 'include',
//   }).then(checkResponse);
// };




// userToken = (token) => {
//   return fetch(`${this._backendUrl}/users/me`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${this._backendUrl}`,
//     },
// 		credentials: 'include',
//   }).then(this._checkResponse);
// };
