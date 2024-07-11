import {deleteCardfromServer, likeCard, deleteLikeCard} from "./api";
const cardTemplate = document.querySelector('#card-template').content;

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

  // console.log(item.owner._id, 'Автор карточки');
  userId = item.owner._id;
  // При создании карточки проверяем, кто её автор. Если я, то скрываем кнопку удаления
  if (!(item.owner._id === userId)) {
    // deleteButton.setAttribute('disabled', '');
    deleteButton.classList.add('hidden');
  };

  deleteButton.addEventListener('click', () => {
    deleteCardfromServer(item)
    .then(() => deleteCard(cardElement))
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    })
  });

  // Навешиваем слушатель клика по карточке
  cardImage.addEventListener('click', () => handleClickCard(cardImage, cardTitle.textContent));

  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  cardLikeCounter.textContent = item.likes.length;
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  // При создании карточки проверяем, была ли она лайкнута мной. Если да, закрашиваем сердечко.
  if (item.likes.some(user => {
    return user._id === userId
  })) {
    cardLikeButton.classList.add('card__like-button_is-active');
    console.log('Есть мой лайк!');
  }

  // Если карточка уже была лайкнута мной, навешиваем флаг
  const isLikedCard = cardLikeButton.classList.contains('card__like-button_is-active');

  // Навешиваем слушатель клика по кнопке лайка
  cardLikeButton.addEventListener('click', () => {
    handleLikeCard(cardLikeButton, isLikedCard, cardLikeCounter, item);
  })

  return cardElement;
};

// Функция обработки клика по кнопке лайка
export function handleLikeCard(button, isLikedCard, counter, item) {
  button.classList.toggle('card__like-button_is-active');

  // Навешиваем флаг в зависимости от того, лайкнута МНОЙ карточка или нет
  isLikedCard = button.classList.contains('card__like-button_is-active');
  if(isLikedCard) {
    // console.log('лАЙКАЕМ!');
    likeCard(item)
    .then((data) => {
      counter.textContent = data.likes.length;
      })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  } else {
    // console.log('Дизлайк, отписка')
    deleteLikeCard(item)
    .then((data) => {
      counter.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }
}




