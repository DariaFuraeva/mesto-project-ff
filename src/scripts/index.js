import {initialCards, /*handleClickCard*/ } from './cards.js';
import {createCard} from '../components/cards.js'
import {openModal, closeModal, closeByEscape/*closeModalByEsc*/} from '../components/modal.js';
import {enableValidation, showInputError, hideInputError, checkInputValidity, setEventListeners, hasInvalidInput, toggleButtonState} from '../components/validation.js';
import { getUserData } from '../components/api.js';
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

// Элемент формы для редактирования профиля
// const profileEditform = document.forms.edit-profile;

// const nameError = profileEditform.querySelector(`.${nameInput.id}-error`);
// const jobError = profileEditform.querySelector(`.${jobInput.id}-error`);

getUserData().then((data) => {
  console.log(data);
})
getUserData().then((data) => {
  profileTitle.textContent = data.name;

})







// Обработчик «отправки» формы редактирования профиля (имя, занятие)
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Значения полей jobInput и nameInput из свойства value
  nameInput.value;
  jobInput.value;

  // Вставка новых значений с помощью textContent
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  const modalIsOpened = document.querySelector('.popup_is-opened');
  closeModal(modalIsOpened);
}

// Обработчик «отправки» формы добавления карточки (название, ссылка)
function handleFormCreateCard(evt) {
  evt.preventDefault();
  const item = {name: 'gbg' , link: 'https://www.google.com/imgres?q=%D0%BA%D0%BE%D1%82&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F0%2F0e%2FFelis_silvestris_silvestris.jpg&imgrefurl=https%3A%2F%2Fru.wikipedia.org%2Fwiki%2F%25D0%259B%25D0%25B5%25D1%2581%25D0%25BD%25D0%25BE%25D0%25B9_%25D0%25BA%25D0%25BE%25D1%2582&docid=Rm7BJO6MTjUm8M&tbnid=NEO8sL4d0dLmPM&vet=12ahUKEwis3LiW0O-FAxVHMRAIHaBEA-cQM3oECBkQAA..i&w=1496&h=1729&hcb=2&ved=2ahUKEwis3LiW0O-FAxVHMRAIHaBEA-cQM3oECBkQAA'};
  item.name = cardNameInput.value;
  item.link = cardUrlInput.value;
  console.log(item);
  const newCard = createCard(item, handleClickCard, handleLikeCard);
  placesList.prepend(newCard);
  const modalIsOpened = document.querySelector('.popup_is-opened');
  closeModal(modalIsOpened);
  cardNameInput.value = '';
  cardUrlInput.value = '';
}


// getInitialCards();
// console.log(example);
// newInitialCards.forEach(function(item){
//     //const name = item.name;
//     //const link = item.link;
//     const newCard = createCard(item, handleClickCard, handleLikeCard);
//     placesList.append(newCard);
//   })

// Отображение шести карточек при открытии страницы
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
