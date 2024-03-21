const placesList = document.querySelector('.page .content .places');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__title').textContent = name;
  cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = `Фото. Пейзаж. ${name}`;
  deleteButton.addEventListener('click', () => deleteCard(cardElement));
  return cardElement;
}

function deleteCard(cardItem) {
  cardItem.remove();
}

initialCards.forEach(function(item){
  const name = item.name;
  const link = item.link;
  const newCard= createCard(name, link);
  placesList.append(newCard);
})



// @todo: Темплейт карточки

/*createCard('Это имя', 'А это ссылка');*/
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
