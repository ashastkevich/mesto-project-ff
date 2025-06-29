import { myID } from "..";
import { removeCardAPI, addLike, removeLike } from "./api";

// @todo: Функция создания карточки
export function addCard(name, link, likes, cardID, cardTmp, removeCard, clickImage, cardLike, myCard) {
  const cardElement = cardTmp.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikes = cardElement.querySelector('.card__like-amount');
  cardImageElement.src = link;
  cardImageElement.alt = name;
  cardLikes.textContent = likes.length;
  if (likes.some((id) => {
      return id._id === myID;
  })) {
      cardLikeButton.classList.add('card__like-button_is-active');
  }
  cardElement.id = cardID;
  cardElement.querySelector('.card__title').textContent = name;
  if (myCard) {
    cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);
  } else {
    cardElement.querySelector('.card__delete-button').remove();
  }
  cardImageElement.addEventListener('click', clickImage);
  cardLikeButton.addEventListener('click', cardLike);
  return cardElement;
}

// Функция удаления карточки
export function removeCard(evt) {
  removeCardAPI(evt.target.closest('.card').id)
    .then(res => {
        evt.target.closest('.card').remove(); 
    })
    .catch(err => {
        console.log(err);
    }); 
}

export function cardLike (evt) {
  const card = evt.target.closest('.card');
  if (evt.target.classList.contains('card__like-button_is-active')) {
    removeLike(card.id)
      .then(result => {
        card.querySelector('.card__like-amount').textContent = result.likes.length;
        evt.target.classList.toggle('card__like-button_is-active');
      })
      .catch(err => {
        console.log(err);
      }); 
  } else {
    addLike(card.id)
      .then(result => {
        card.querySelector('.card__like-amount').textContent = result.likes.length;
        evt.target.classList.toggle('card__like-button_is-active');
      })
      .catch(err => {
        console.log(err);
      }); 
  };
}