import React from "react";

function Register({ registration }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    registration(email, password);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="popup__form">
        <fieldset className="popup__set">
          <h1 className="popup__title-register">Регистрация</h1>
          <label className="popup__form-wrapper">
            <input
              value={email}
              name="email"
              type="email"
							id="email"
              placeholder="Email"
              onChange={handleChangeEmail}
              required
              className="popup__field-register"
            ></input>
          </label>
          <label className="popup__form-wrapper">
            <input
              value={password}
              name="password"
              type="password"
							id="password"
              placeholder="Пароль"
              onChange={handleChangePassword}
              required
              className="popup__field-register"
            ></input>
          </label>
          <div className="popup__submit-register">
            <button
              className="popup__submit-button popup__submit-button_register"
              type="submit"
              onSubmit={handleSubmit}
            >
              Зарегистрироваться
            </button>
            <p className="popup__question-register">
              Уже зарегистрированы? &nbsp;
              <a href="#" className="popup__question-register-link">
                Войти
              </a>
            </p>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default Register;
