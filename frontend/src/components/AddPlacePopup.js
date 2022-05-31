import "../utils/Api";
import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setlink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setlink(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName("");
    setlink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="form_add"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
			isRequestLoading={props.isRequestLoading}
    >
      <label className="popup__form-wrapper">
        <input
          onChange={handleChangeName}
          value={name}
          id="popup-title-field"
          placeholder="Название"
          type="text"
          className="popup__field popup__field_title"
          name="form-title"
          required
          minLength="2"
          maxLength="30"
          autoComplete="off"
        />
        <span className="popup-title-field-error popup__input-error popup__input-error_active" />
      </label>
      <label className="popup__form-wrapper">
        <input
          onChange={handleChangeLink}
          value={link}
          id="popup-address-field"
          placeholder="Ссылка на картинку"
          type="url"
          className="popup__field popup__field_subtitle"
          name="form-subtitle"
          required
          autoComplete="off"
        />
        <span className="popup-address-field-error popup__input-error popup__input-error_active" />
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
