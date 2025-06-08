import { openModal } from "./modal";
import { popupImage } from "..";

// @todo: Функция создания карточки
export function addCard(name, link, cardTmp, removeCard, clickImage, cardLike) {
  const cardElement = cardTmp.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardImageElement.src = link;
  cardImageElement.alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);
  cardImageElement.addEventListener('click', clickImage);
  cardLikeButton.addEventListener('click', cardLike);
  return cardElement;
}

// Функция удаления карточки
export function removeCard(evt) {
  evt.target.closest('.card').remove();
}

export function clickImage(evt) {
  const popImg = popupImage.querySelector('.popup__image');
  const popCaption = popupImage.querySelector('.popup__caption');
  openModal(popupImage);
  popImg.setAttribute('src', evt.target.getAttribute('src'));
  popImg.setAttribute('alt', evt.target.getAttribute('alt'));
  popCaption.textContent = evt.target.getAttribute('alt');
}

export function cardLike (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}