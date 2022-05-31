import React from "react";
import closeIcon from "../images/CloseIcon.svg";

function ImagePopup({ card, onClose, name }) {
  return (
    <div className={`popup popup_${name} ${card && "popup_opened"}`}>
      <div className="popup__container popup__container_type_image">
        <button
          type="button"
          className="popup__close-icon popup__close-icon_img"
          onClick={onClose}
        >
          <img src={closeIcon} className="popup__icon" alt="редактор" />
        </button>
        {card && <img className="popup__img" src={card.link} alt={card.name} />}
        {card && <h2 className="popup__image-title">{card.name}</h2>}
      </div>
    </div>
  );
}

export default ImagePopup;
