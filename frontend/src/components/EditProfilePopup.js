import "../utils/Api";
import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen, currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
			isRequestLoading={props.isRequestLoading}
    >
      <label className="popup__form-wrapper">
        <input
          id="popup-name-field"
          type="text"
          value={name || ""}
          onChange={handleChangeName}
          name="name"
          className="popup__field popup__field_form_title"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          autoComplete="off"
        />
        <span className="popup-name-field-error popup__input-error popup__input-error_active"></span>
      </label>
      <label className="popup__form-wrapper">
        <input
          id="popup-profession-field"
          type="text"
          value={description || ""}
          onChange={handleChangeDescription}
          name="about"
          className="popup__field popup__field_form_subtitle"
          placeholder="Вид деятельности"
          minLength="2"
          maxLength="200"
          required
          autoComplete="off"
        />
        <span className="popup-profession-field-error popup__input-error popup__input-error_active"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
