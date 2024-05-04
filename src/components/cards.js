import { openModal } from "./modal";

const placesList = document.querySelector('.page .content .places');
const cardTemplate = document.querySelector('#card-template').content;
const modalImage = document.querySelector('.popup_type_image');
const cardImage = document.querySelector('.popup_type_image .popup__content .popup__image');
const cardImageCaption = document.querySelector('.popup_type_image .popup__content .popup__caption');
//const cardTitle = document.querySelector('.card__description .card__title');

// Функция удаления карточки
export function deleteCard(cardItem) {
  cardItem.remove();
}

// Функция обработки клика по карточке (открытие изображения в модальном окне)
export function handleClickCard(item, title) {
  cardImage.src = item.src;
  cardImage.alt = item.alt;
  cardImageCaption.textContent = title;
  openModal(modalImage);
}
// Функция обработки клика по кнопке лайка
export function handleLikeCard(button) {
    button.classList.toggle('card__like-button_is-active');
}

// Функция создания карточки
export function createCard(item) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = `Фото. Пейзаж. ${item.name}`;
  cardTitle.textContent = item.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  cardImage.addEventListener('click', () => handleClickCard(cardImage, cardTitle.textContent));

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', () => handleLikeCard(cardLikeButton));

  return cardElement;
};

