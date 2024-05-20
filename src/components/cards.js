import { handleClickCard } from "../scripts/index";
//import {handleLikeCard} from "../scripts/index";
// import {handleLikeCard} from "../../src/scripts/index.js"
// const placesList = document.querySelector('.page .content .places');
const cardTemplate = document.querySelector('#card-template').content;
//const cardTitle = document.querySelector('.card__description .card__title');

// Функция удаления карточки
export function deleteCard(cardItem) {
  cardItem.remove();
}

// Функция создания карточки
export function createCard(item, handleClickCard, handleLikeCard) {
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





