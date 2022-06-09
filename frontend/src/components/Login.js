import React from "react";

function Login({ authorization }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    authorization(email, password);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <>
      <form className="popup__form" onSubmit={handleSubmit}>
        <fieldset className="popup__set">
          <h1 className="popup__title-register">Вход</h1>
          <label className="popup__form-wrapper">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChangeEmail}
              required
              className="popup__field-register"
            ></input>
          </label>
          <label className="popup__form-wrapper">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={handleChangePassword}
              required
              className="popup__field-register"
            ></input>
          </label>
          <div className="popup__submit-register">
            <button
              type="submit"
              onSubmit={handleSubmit}
              className="popup__submit-button popup__submit-button_register"
            >
              Войти
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default Login;
