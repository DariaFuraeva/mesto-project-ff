import {initialCards, /*handleClickCard*/ } from './cards.js';
import {createCard} from '../components/cards.js'
import {openModal, closeModal} from '../components/modal.js';
import {enableValidation, showInputError, hideInputError, checkInputValidity, setEventListeners, hasInvalidInput, toggleButtonState, clearValidation} from '../components/validation.js';
import {getUserData, getInitialCards, editProfile, addCard, likeCard, editProfileImage, deleteLikeCard} from '../components/api.js';
import {handleLikeCard} from '../components/cards.js'

const modalImage = document.querySelector('.popup_type_image');
const cardImage = document.querySelector('.popup_type_image .popup__content .popup__image');
const cardImageCaption = document.querySelector('.popup_type_image .popup__content .popup__caption');
const editButton = document.querySelector('.profile__edit-button');
const placesList = document.querySelector('.page .content .places__list');
const cardTemplate = document.querySelector('#card-template').content;
const popupEditWindow = document.querySelector('.popup_type_edit');
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupsModal = document.querySelectorAll(".popup");
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const createCardPopup = document.querySelector('.popup_type_new-card');
const createCardFormElement = createCardPopup.querySelector('.popup_type_new-card .popup__content .popup__form');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileImageEdit = document.querySelector('.profile__image-edit');
const popupProfileImage = document.querySelector('.popup_type_edit-avatar');
const profileImageUrlInput = document.querySelector('.popup_type_edit-avatar .popup__content .popup__form .popup__input_type_url');
const editProfileImageFormElement = document.querySelector('.popup_type_edit-avatar .popup__content .popup__form');
let userId;

// // Загрузка данных о пользователе с сервера
// getUserData().then((data) => {
//   // console.log('Это имя пользователя с сервера: ', data.name);
//   console.log('Это данные о пользовтаеле с сервера: ', data);
//   // console.log('Ссылка на аватар', data.avatar);
// })

Promise.all([getUserData(), getInitialCards()])
.then(([userData, cardsArr]) => {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.setAttribute('style', `background-image: url(${userData.avatar})`);
  cardsArr.forEach(function(item) {
    userId = userData._id;
    const newCard = createCard(item, handleClickCard, handleLikeCard, userId);

    placesList.append(newCard);

    const deleteButton = newCard.querySelector('.card__delete-button');
    // userId = userData._id;
  })
})
.catch((err) => {
  console.log('Ошибка. Запрос не выполнен: ', err);
});

// getUserData().then((data) => {
//   profileTitle.textContent = data.name;
//   profileDescription.textContent = data.about;
//   profileImage.setAttribute('style', `background-image: url(${data.avatar})`);
// })

// // Загрузка карточек с сервера
// getInitialCards().then((cardsArr) => {
//   console.log('Это список карточек', cardsArr);
//   cardsArr.forEach(function(item) {
//     const newCard = createCard(item, handleClickCard, handleLikeCard);
//     // console.log(item.name);
//     // console.log(item.link);
//     // console.log('Количество лайков карточки: ', item.likes.length);
//     placesList.append(newCard);
//     const cardLikeCounter = newCard.querySelector('.card__like-counter');
//     cardLikeCounter.textContent = item.likes.length;
//   })
// })

// // Добавление новой карточки
// addCard().then((card) => {
//   // console.log('Это новая карточка', card);
//   const newCard = createCard(card, handleClickCard, handleLikeCard);
//   placesList.prepend(newCard);
// })

// Обработчик "отправки" формы редактирования изображения профиля (автара)
function handleFormEditProfileImage(evt) {
  evt.preventDefault();
  const item = {avatar: ''};
  item.avatar = profileImageUrlInput.value;
  renderLoading(true);
  const modalIsOpened = document.querySelector('.popup_is-opened');

  editProfileImage(item)
  // .then((res) => console.log(res.avatar))
  .then((data) => {
    profileImage.setAttribute('style', `background-image: url(${data.avatar})`)
  })
  .then(() => {
    closeModal(modalIsOpened);
  })
  .finally(() => {
    renderLoading(false);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });
}

// Обработчик «отправки» формы редактирования профиля (имя, занятие)
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const user = {name: '', about: '', avatar: ''};
  // Значения полей jobInput и nameInput из свойства value
  user.name = nameInput.value;
  user.about = jobInput.value;

  renderLoading(true);
  const modalIsOpened = document.querySelector('.popup_is-opened');
  // Обновление данных профиля
  editProfile(user)
  .then(() => {
    // Вставка новых значений с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
  })
  .then(() => {
    closeModal(modalIsOpened);
  })
  .finally(() => {
    renderLoading(false);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });
}

// Обработчик «отправки» формы добавления карточки (название, ссылка)
function handleFormCreateCard(evt) {
  evt.preventDefault();
  const item = {name: '' , link: ''};
  item.name = cardNameInput.value;
  item.link = cardUrlInput.value;

  renderLoading(true);
  const modalIsOpened = document.querySelector('.popup_is-opened');
  const saveButton = modalIsOpened.querySelector('.popup__button');
  // Добавление новой карточки
  addCard(item)
  .then((data) => {
    const newCard = createCard(data, handleClickCard, handleLikeCard);
    placesList.prepend(newCard);
  })
  .then(() => {
    closeModal(modalIsOpened);
  })
  .then(() => {
    // Очистка инпутов формы карточки после закрытия модального окна
    cardNameInput.value = '';
    cardUrlInput.value = '';

    // Делаем кнопку сохранения неактивной
    // (Иначе, форма открывается после успешного сабмита
    // с пустыми значениями в полях и с активной кнопкой сабмита)
    saveButton.classList.add('button_inactive');
    saveButton.setAttribute('disabled', '');
  })
  .finally(() => {
    renderLoading(false);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });
}

// Функция, отображающая надпись "Сохранение..." на кнопке сохранения, пока идёт загрузка
function renderLoading(isLoading) {
  const popupSaveButton = document.querySelector('.popup__button');
  if (isLoading) {
    popupSaveButton.textContent = 'Сохранение...';
  } else {
    popupSaveButton.textContent = 'Сохранить';
  }
}

// Отображение шести карточек при открытии страницы (Использовалось при выполнении ПР5, ПР6)
// initialCards.forEach(function(item){
//   //const name = item.name;
//   //const link = item.link;
//   const newCard = createCard(item, handleClickCard, handleLikeCard);
//   placesList.append(newCard);
// })

// Обработчик нажатия на кнопку редактирования аватара профиля
profileImageEdit.addEventListener('click', function() {
  const profileImageEditForm = popupProfileImage.querySelector('.popup__form')
  clearValidation(profileImageEditForm, validationConfig);
  openModal(popupProfileImage);
})

// Обработчик нажатия на кнопку редактирования имени и описания профиля
editButton.addEventListener('click', function(){
  const profileEditForm = popupEditWindow.querySelector('.popup__form')
  clearValidation(profileEditForm, validationConfig);
  openModal(popupEditWindow);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Обработчик нажатия на кнопку добавления карточки
profileAddButton.addEventListener('click', function(){
  const newCardForm = popupNewCard.querySelector('.popup__form')
  clearValidation(newCardForm, validationConfig);
  openModal(popupNewCard)});

popupsModal.forEach((popup) => {
  popup.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closeModal(popup)
    }
  });
});

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

createCardFormElement.addEventListener('submit', handleFormCreateCard);

editProfileImageFormElement.addEventListener('submit', handleFormEditProfileImage);

// Функция обработки клика по карточке (открытие изображения в модальном окне)
export function handleClickCard(item, title) {
  cardImage.src = item.src;
  cardImage.alt = item.alt;
  cardImageCaption.textContent = title;
  openModal(modalImage);
}

// Функция, которая отвечает за включение валидации всех форм.
// Она принимает все нужные функциям классы
// и селекторы элементов как объект настроек.
export const validationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});

enableValidation(validationConfig);

// @todo: Темплейт карточки

/*createCard('Это имя', 'А это ссылка');*/
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
