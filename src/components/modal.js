// Работа модальных окон

//Открытие модального окна
export function openModal(popup){
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape)
};

// Закрытие модального окна
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
};

export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const modalIsOpened = document.querySelector('.popup_is-opened');
    closeModal(modalIsOpened);
    //modalIsOpened.classList.remove('popup_is-opened');
  }
}

// Закрытие модального окна по нажатию Esc. Работает.
/*export function closeModalByEsc(popup) {
  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
      popup.classList.remove('popup_is-opened');
      document.removeEventListener('keydown', closeModalByEsc);
    }
  })
}*/




