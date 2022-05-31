import "../utils/Api";
import React, { useContext, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatar = useRef();

  React.useEffect(() => {
    avatar.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      buttonText="Сохранить"
      name="update-avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
			isRequestLoading={props.isRequestLoading}
    >
      <label className="popup__form-wrapper">
        <input
          id="popup-avatar-field"
          type="url"
          name="avatar"
          className="popup__field popup__field_form_subtitle"
          placeholder="Ссылка на картинку"
          minLength="2"
          maxLength="200"
          ref={avatar}
          required
          autoComplete="off"
        />
        <span className="popup-avatar-field-error popup__input-error popup__input-error_active"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
