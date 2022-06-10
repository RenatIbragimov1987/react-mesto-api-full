import React from "react";

function Register({ registration }) {
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
	const [data, setData] = useState({
		email: "",
		password: ""
});


  function handleChange(e) {
    const {name, value} = e.target;
        setData({
            ...data,
            [name]: value,
        });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
		const {email, password} = data;
    registration(email, password);
		setData({ email: '', password: '' });
  }

  // function handleChangePassword(evt) {
  //   setPassword(evt.target.value);
  // }

  return (
    <>
      <form onSubmit={handleSubmit} className="popup__form">
        <fieldset className="popup__set">
          <h1 className="popup__title-register">Регистрация</h1>
          <label className="popup__form-wrapper">
            <input
              value={data.email}
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="popup__field-register"
            ></input>
          </label>
          <label className="popup__form-wrapper">
            <input
              value={data.password}
              name="password"
              type="password"
              placeholder="Пароль"
              onChange={handleChange}
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
