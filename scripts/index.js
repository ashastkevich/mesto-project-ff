// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки
function addCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);
  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(evt) {
  evt.target.closest('.card').remove();
}


// @todo: Вывести карточки на страницу
initialCards.forEach(item => document.querySelector('.places__list').append(addCard(item.name, item.link)));
