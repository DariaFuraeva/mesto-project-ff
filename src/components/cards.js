import { deleteCardfromServer} from "./api";
const cardTemplate = document.querySelector('#card-template').content;
const myId = '9ba15da7537acf3e06b7d4bc';

// Функция удаления карточки
export function deleteCard(cardItem) {
  // deleteCardfromServer(cardItem);
  // console.log(cardItem);
  cardItem.remove();
}

// Функция создания карточки
export function createCard(item, handleClickCard, handleLikeCard, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = `Фото. Пейзаж. ${item.name}`;
  cardTitle.textContent = item.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCardfromServer(item)
    .then(() => deleteCard(cardElement))

  });

  // Навешиваем слушатель клика по карточке
  cardImage.addEventListener('click', () => handleClickCard(cardImage, cardTitle.textContent));

  userId = myId;
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  cardLikeCounter.textContent = item.likes.length;
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  // При создании карточки проверяем, была ли она лайкнута мной. Если да, закрашиваем сердечко.
  if (item.likes.some(user => {
    return user._id === myId
  })) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  // Если карточка уже была лайкнута мной, навешиваем флаг
  let likedCardFlag = false;
  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    likedCardFlag = true;
  } else {
    likedCardFlag = false;
  }

  // Навешиваем слушатель клика по кнопке лайка
  cardLikeButton.addEventListener('click', () => {
    handleLikeCard(cardLikeButton, likedCardFlag, cardLikeCounter, item);
  })

  return cardElement;
};





