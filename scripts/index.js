// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesElement = document.querySelector('.places__list');

// @todo: DOM узлы

// @todo: Функция создания карточки
function addCard(name, link, removeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  cardImageElement.src = link;
  cardImageElement.alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);
  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(evt) {
  evt.target.closest('.card').remove();
}


// @todo: Вывести карточки на страницу
initialCards.forEach(item => placesElement.append(addCard(item.name, item.link, removeCard)));
