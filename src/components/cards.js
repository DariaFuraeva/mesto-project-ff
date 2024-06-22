import { deleteCardfromServer } from "./api";
const cardTemplate = document.querySelector('#card-template').content;
//const cardTitle = document.querySelector('.card__description .card__title');

// Функция удаления карточки
export function deleteCard(cardItem) {
  cardItem.remove();
  deleteCardfromServer(cardItem);
}

// deleteCard(cardId).then((card) => {
//   if (cardId === card._id) {
//     card.remove();
//   }
// })

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
  // console.log(item._id, ' Это id пользователя');

  // const myId = '9ba15da7537acf3e06b7d4bc';
  // console.log('id автора карточки: ', item.owner_id)
  // if (!(item.owner_id === myId)) {
  //     // deleteButton.setAttribute('disabled', '');
  //     deleteButton.classList.add('hidden');
  // };
  return cardElement;
};





