
export function getUserData() {
  fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me', {
    headers: {
      authorization: '03a967f6-55ee-4e4e-b7f8-c5d21e5db7dc'
    }
  })
    .then(res => res.json())

    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
}











// GET-запрос для подгрузки начальных карточек с сервера
export function getInitialCards() {
  fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {
    headers: {
      authorization: '03a967f6-55ee-4e4e-b7f8-c5d21e5db7dc'
    }
  })
    .then((res) => {
      return res.json();
    })

    .then((result) => {
      console.log(result);
    })



    // .then((result) => {
    //   newArray = result;
    // })

    // .then((res) => {

    //     res.forEach(function(item){
    //       //const name = item.name;
    //       //const link = item.link;
    //       const newCard = createCard(item, handleClickCard, handleLikeCard);
    //       placesList.append(newCard);
    //     })

    // })


    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });



  }

  //console.log(getInitialCards());

  const example = getInitialCards();
  console.log('А вот и результат', example);


