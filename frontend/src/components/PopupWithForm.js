import closeIcon from "../images/CloseIcon.svg";
import { useCallback, useEffect } from "react";

function PopupWithForm(props) {
  const handleEscClose = useCallback(
    ({ key }) => {
      if (key === "Escape") {
        props.onClose();
      }
    },
    [props.onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [handleEscClose, props.isOpen]);

  return (
    <div
      className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__container">
        <button
          className="popup__close-icon popup__close-icon_profil"
          type="button"
          onClick={props.onClose}
        >
          <img src={closeIcon} className="popup__icon" alt="редактор" />
        </button>
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate
        >
          <fieldset className="popup__set">
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button
              type="submit"
              className="popup__submit-button popup__submit-button_save popup__submit-button_inactive"
              
            >
							{props.isRequestLoading ? 'Сохранение...' : props.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
