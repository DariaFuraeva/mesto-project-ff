// GET-запрос для получения данных о пользователе
export function getUserData() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me', {
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
  return fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {
    headers: {
      authorization: '03a967f6-55ee-4e4e-b7f8-c5d21e5db7dc'
    }
  })
    .then((res) => {
      return res.json();
    })
}

// PATCH-запрос для редактирования данных профиля
export function editProfile(data) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '03a967f6-55ee-4e4e-b7f8-c5d21e5db7dc',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })

  });
}

// POST-запрос для добавлени новой карточки
export function addCard(data) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {
    method: 'POST',
    headers: {
      authorization: '03a967f6-55ee-4e4e-b7f8-c5d21e5db7dc',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about,
      link: data.link
    })
  })
}

// DELETE-запрос для удаления карточки
export function deleteCardfromServer(card) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-16/cards/${card._id}`, {
    method: 'DELETE',
    headers: {
      authorization: '03a967f6-55ee-4e4e-b7f8-c5d21e5db7dc',
      'Content-Type': 'application/json'
    }
  })
  // .then((res) => {
  //   return res.json();
  // })
}

// PUT-запрос для добавления лайка карточки
export function likeCard(card) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-16/cards/likes/${card._id}`, {
    method: 'PUT',
    headers: {
      authorization: '03a967f6-55ee-4e4e-b7f8-c5d21e5db7dc',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      likes: card.likes,
      _id: card._id
    })
  }
  // .then((res) => consile.log(res));
)}

// DELETE-запрос для удаления лайка карточки
export function deleteLikeCard(card) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-16/cards/likes/${card._id}`), {
    method: 'DELETE',
    headers: {
      authorization: '03a967f6-55ee-4e4e-b7f8-c5d21e5db7dc',
    }
  }
}

// // PATCH-запрос для обновления аватара пользователя
// export function editProfile(data) {
//   return fetch('https://nomoreparties.co/v1/cohortId/users/me/avatar', {
//     method: 'PATCH',
//     headers: {
//       authorization: '03a967f6-55ee-4e4e-b7f8-c5d21e5db7dc',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       avatar: ''
//     })

//   });
// }
