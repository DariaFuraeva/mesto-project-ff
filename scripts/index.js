const placesList = document.querySelector('.page .content .places');


function createCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  placesList.append(cardElement);
  deleteButton.addEventListener('click', function(evt){
    const cardItem = deleteButton.closest('.places__item');
    cardItem.remove();
  })
}

initialCards.forEach(function(item){
  const name = item.name;
  const link = item.link;
  createCard(name, link);
})



// @todo: Темплейт карточки

/*createCard('Это имя', 'А это ссылка');*/
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
