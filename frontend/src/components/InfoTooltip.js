import SuccessIcon from "../images/SuccessIcon.svg";
import ErrorIcon from "../images/ErrorIcon.svg";
import closeIcon from "../images/CloseIcon.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup popup_info-tooltip ${isOpen && "popup_opened"}`}>
      <div className="popup__container-tooltip">
        <img
          src={closeIcon}
					alt="pic"
          className="popup__close-icon"
          onClick={onClose}
        ></img>

        <img
          className="popup__tooltip-img"
          src={isSuccess ? SuccessIcon : ErrorIcon}
					alt="pic"
        />

        <h3 className={`popup__title popup__title-tooltip`}>
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;

// function InfoTooltip({ isInfoToolTip, onClose, isSuccess }) {
// 	function handleCloseByClick(evt) {
// 		if (evt.currentTarget === evt.target) {
// 				onClose();
// 		}
// }
//   return (
//     <div onClick={handleCloseByClick} className={`popup popup_info-tooltip ${isInfoToolTip.open && "popup_opened"}`}>
//       <div className="popup__container-tooltip">
//       	<img alt="pic" src={closeIcon} className="popup__close-icon" onClick={onClose} />
//         <img alt="pic" className="popup__tooltip-img" src={isSuccess ? SuccessIcon : ErrorIcon} />
//         <h3 className={`popup__title popup__title-tooltip`}>
//         {isSuccess
//           ? "Вы успешно зарегистрировались!"
//           : "Что-то пошло не так! Попробуйте ещё раз."}
//         </h3>
//       </div>
//     </div>
//   );
// }

// export default InfoTooltip;
