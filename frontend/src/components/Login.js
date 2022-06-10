import React, {useState} from 'react';

function Login({ authorization, isRequestLoading }) {
	const [data, setData] = useState({
		email: "",
		password: ""
})

const handleChange = (e) => {
		const {name, value} = e.target;

		setData({
				...data,
				[name]: value,
		});
};

const handleSubmit = (e) => {
		e.preventDefault();
		if (!data.email || !data.password) {
				console.log(data.email)
				console.log(data.password)
				return;
		}
		const {email, password} = data;
		authorization(email, password);
}
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");

  // function handleChangeEmail(evt) {
  //   setEmail(evt.target.value);
  // }

  // function handleSubmit(evt) {
  //   evt.preventDefault();
  //   authorization(email, password);
  // }

  // function handleChangePassword(evt) {
  //   setPassword(evt.target.value);
  // }

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
              value={data.email}
              onChange={handleChange}
              required
              className="popup__field-register"
            ></input>
          </label>
          <label className="popup__form-wrapper">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={data.password}
              onChange={handleChange}
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
							{isRequestLoading ? 'Вход...' : 'Войти'}
              
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default Login;
