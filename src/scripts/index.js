import {initialCards, /*handleClickCard*/ } from './cards.js';
import {createCard} from '../components/cards.js'
import {openModal, closeModal, closeByEscape/*closeModalByEsc*/} from '../components/modal.js';
import {enableValidation, showInputError, hideInputError, checkInputValidity, setEventListeners, hasInvalidInput, toggleButtonState} from '../components/validation.js';
import {getUserData, getInitialCards, editProfile, addCard} from '../components/api.js';
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
// Элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

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
    const newCard = createCard(item, handleClickCard, handleLikeCard);
    // console.log(item.name);
    // console.log(item.link);
    // console.log('Количество лайков карточки: ', item.likes.length);
    placesList.append(newCard);
    const cardLikeCounter = newCard.querySelector('.card__like-counter');
    cardLikeCounter.textContent = item.likes.length;
  })
})

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

// Обработчик «отправки» формы редактирования профиля (имя, занятие)
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const user = {name: '', about: '', avatar: ''};
  // Значения полей jobInput и nameInput из свойства value
  user.name = nameInput.value;
  user.about = jobInput.value;

  // Обновление данных профиля
  editProfile(user);

  // Вставка новых значений с помощью textContent
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  const modalIsOpened = document.querySelector('.popup_is-opened');
  closeModal(modalIsOpened);
}

// Обработчик «отправки» формы добавления карточки (название, ссылка)
function handleFormCreateCard(evt) {
  evt.preventDefault();
  const item = {name: '' , link: ''};
  item.name = cardNameInput.value;
  item.link = cardUrlInput.value;

  // Добавление новой карточки
  addCard(item);
  const newCard = createCard(item, handleClickCard, handleLikeCard);
  console.log(item["owner"]);
  placesList.prepend(newCard);


  const modalIsOpened = document.querySelector('.popup_is-opened');
  closeModal(modalIsOpened);
  cardNameInput.value = '';
  cardUrlInput.value = '';

}

// Отображение шести карточек при открытии страницы (Использовалось при выполнении ПР5, ПР6)
// initialCards.forEach(function(item){
//   //const name = item.name;
//   //const link = item.link;
//   const newCard = createCard(item, handleClickCard, handleLikeCard);
//   placesList.append(newCard);
// })

editButton.addEventListener('click', function(){
  openModal(popupEditWindow)
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

profileAddButton.addEventListener('click', function(){
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

// Функция обработки клика по кнопке лайка
export function handleLikeCard(button) {
  button.classList.toggle('card__like-button_is-active');
}

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
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});



// @todo: Темплейт карточки

/*createCard('Это имя', 'А это ссылка');*/
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
