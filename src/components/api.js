const myToken = '03a967f6-55ee-4e4e-b7f8-c5d21e5db7dc';
const serverAdress = 'https://nomoreparties.co/v1/wff-cohort-16/';

// GET-запрос для получения данных о пользователе
export function getUserData() {
  return fetch(`${serverAdress}users/me`, {
    headers: {
      authorization: myToken
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })

  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });
}

// GET-запрос для подгрузки начальных карточек с сервера
export function getInitialCards() {
  return fetch(`${serverAdress}cards`, {
    headers: {
      authorization: myToken
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })

  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });
}

// PATCH-запрос для редактирования данных профиля
export function editProfile(data) {
  return fetch(`${serverAdress}users/me`, {
    method: 'PATCH',
    headers: {
      authorization: myToken,
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
  return fetch(`${serverAdress}cards`, {
    method: 'POST',
    headers: {
      authorization: myToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about,
      link: data.link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })

  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });
}

// DELETE-запрос для удаления карточки
export function deleteCardfromServer(card) {
  return fetch(`${serverAdress}cards/${card._id}`, {
    method: 'DELETE',
    headers: {
      authorization: myToken,
      'Content-Type': 'application/json'
    }
  })
  // .then((res) => {
  //   return res.json();
  // })
}

// PUT-запрос для добавления лайка карточки
export function likeCard(card) {
  return fetch(`${serverAdress}cards/likes/${card._id}`, {
    method: 'PUT',
    headers: {
      authorization: myToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      likes: card.likes,
      _id: card._id
    })
  }
)
  .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
}

// DELETE-запрос для удаления лайка карточки
export function deleteLikeCard(card) {
  return fetch(`${serverAdress}cards/likes/${card._id}`, {
    method: 'DELETE',
    headers: {
      authorization: myToken,
    },
    body: JSON.stringify({
      likes: card.likes,
      _id: card._id
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })

  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });
}

// PATCH-запрос для обновления аватара пользователя
export function editProfileImage(data) {
  return fetch(`${serverAdress}users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: myToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: data.avatar
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })

  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });
}
