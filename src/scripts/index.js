import {initialCards, /*handleClickCard*/ } from './cards.js';
import {createCard} from '../components/cards.js'
import {openModal, closeModal, closeByEscape/*closeModalByEsc*/} from '../components/modal.js';
import {enableValidation, showInputError, hideInputError, checkInputValidity, setEventListeners, hasInvalidInput, toggleButtonState} from '../components/validation.js';
import {getUserData, getInitialCards, editProfile, addCard, likeCard, editProfileImage, deleteLikeCard} from '../components/api.js';

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
    //console.log(item);
    // console.log(item.link);
    // console.log('Количество лайков карточки: ', item.likes.length);
    placesList.append(newCard);
    // const cardLikeCounter = newCard.querySelector('.card__like-counter');
    // cardLikeCounter.textContent = item.likes.length;

    const deleteButton = newCard.querySelector('.card__delete-button');
    const myId = '9ba15da7537acf3e06b7d4bc';
    // console.log(item.owner._id, 'Автор карточки');
    if (!(item.owner._id === myId)) {
      // deleteButton.setAttribute('disabled', '');
      deleteButton.classList.add('hidden');
    };
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

// Обработчик "отправки" формы редактирования изображения профиля (автара)
function handleFormEditProfileImage(evt) {
  evt.preventDefault();
  const item = {avatar: ''};
  item.avatar = profileImageUrlInput.value;
  renderLoading(true);

  editProfileImage(item)
  // .then((res) => console.log(res.avatar))
  .then((data) => {
    profileImage.setAttribute('style', `background-image: url(${data.avatar})`)
  })
  .finally(() => {
    renderLoading(false);
  })

  const modalIsOpened = document.querySelector('.popup_is-opened');
  closeModal(modalIsOpened);
}

// Обработчик «отправки» формы редактирования профиля (имя, занятие)
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const user = {name: '', about: '', avatar: ''};
  // Значения полей jobInput и nameInput из свойства value
  user.name = nameInput.value;
  user.about = jobInput.value;

  renderLoading(true);
  // Обновление данных профиля
  editProfile(user)
  .finally(() => {
    renderLoading(false);
  })

  // Вставка новых значений с помощью textContent
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  const modalIsOpened = document.querySelector('.popup_is-opened');
  closeModal(modalIsOpened)
}

// Обработчик «отправки» формы добавления карточки (название, ссылка)
function handleFormCreateCard(evt) {
  evt.preventDefault();
  const item = {name: '' , link: ''};
  item.name = cardNameInput.value;
  item.link = cardUrlInput.value;

  renderLoading(true);
  // Добавление новой карточки
  addCard(item)
  .then((data) => {
    const newCard = createCard(data, handleClickCard, handleLikeCard);
    placesList.prepend(newCard);
  })
  .finally(() => {
    renderLoading(false);
  })

  const modalIsOpened = document.querySelector('.popup_is-opened');
  closeModal(modalIsOpened);
  cardNameInput.value = '';
  cardUrlInput.value = '';
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
  openModal(popupProfileImage);
})

// Обработчик нажатия на кнопку редактирования имени и описания профиля
editButton.addEventListener('click', function(){
  openModal(popupEditWindow);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Обработчик нажатия на кнопку реддобавления карточки
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

editProfileImageFormElement.addEventListener('submit', handleFormEditProfileImage);



// Функция обработки клика по кнопке лайка
export function handleLikeCard(button, flag, counter, item) {
  button.classList.toggle('card__like-button_is-active');

  // Навешиваем флаг в зависимости от того, лайкнута МНОЙ карточка или нет
  if (button.classList.contains('card__like-button_is-active')) {
    flag = false;
  } else {
    flag = true;
  }

  // В зависимости от значения флага либо добавляем лайк, либо удаляем
  if (flag === false) {
    console.log('лАЙКАЕМ!');
    likeCard(item)
    .then((data) => {
      counter.textContent = data.likes.length;
    })
  } else {
    deleteLikeCard(item)
    .then((data) => {
      counter.textContent = data.likes.length;
    })
  }
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
