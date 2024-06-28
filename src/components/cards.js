import { deleteCardfromServer, likeCard } from "./api";
const cardTemplate = document.querySelector('#card-template').content;
//const cardTitle = document.querySelector('.card__description .card__title');

// Функция удаления карточки
export function deleteCard(cardItem) {
  // deleteCardfromServer(cardItem);
  // console.log(cardItem);
  cardItem.remove();

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
  // const myId = '9ba15da7537acf3e06b7d4bc';
  // console.log(item.owner._id, 'Автор карточки');
  // if (!(item.owner._id === myId)) {
  //   // deleteButton.setAttribute('disabled', '');
  //   deleteButton.classList.add('hidden');
  // };

  deleteButton.addEventListener('click', () => {
    deleteCardfromServer(item)
    .then(() => deleteCard(cardElement))

  });


  cardImage.addEventListener('click', () => handleClickCard(cardImage, cardTitle.textContent));

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', () => {
    handleLikeCard(cardLikeButton);
    // likeCard(item);
  });

//  Отображение количества лайков
  // const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  // // console.log(cardLikeCounter.textContent);
  // cardLikeCounter.textContent = item.likes.length;

  //console.log(item.likes.length, 'Кто лайкнул');


  // console.log(item);

  // console.log('id карточки: ', item._id)

  return cardElement;
};





