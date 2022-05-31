// import React from "react";
import { Switch, Route, Link } from 'react-router-dom'

function Header({email, handleExitWebsite}) {
  return (
    <header className="header page__header">
      <a href="#" className="header__logo"></a>
			<Switch>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__come">Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__come">Войти</Link>
        </Route>
        <Route exact path="/">
          <div className="header__access">
            <p className="header__address">{email}</p>
            <button className="header__log-off" onClick={handleExitWebsite}>Выйти</button>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
