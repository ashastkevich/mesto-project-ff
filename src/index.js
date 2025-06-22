import './index.css';
import {initialCards} from './components/cards';
import {addCard, removeCard, cardLike} from './components/card';
import {openModal, closeModal, addExitClickModalHandler} from './components/modal';
import { enableValidation, clearValidation } from './components/validation';

//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//DOM узлы
const placesElement = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const editButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
export const popupImage = document.querySelector('.popup_type_image');
const modals = document.querySelectorAll('.popup');
const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;
const formAddCard = document.forms['new-place'];
const placeNameInput = formAddCard.elements['place-name'];
const linkInput = formAddCard.elements.link;
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  inputTypeErrorClass: 'popup__input-type-error',
  errorClass: 'popup__error-visible'
}

// Вывести карточки на страницу
initialCards.forEach(item => placesElement.append(addCard(item.name, item.link, cardTemplate, removeCard, clickImage, cardLike)));

editButton.addEventListener('click', evt => {
  openModal(editPopup);
  formEdit.elements.name.value = document.querySelector('.profile__title').textContent;
  formEdit.elements.description.value = document.querySelector('.profile__description').textContent;
  clearValidation(editPopup, validationConfig);
});

newCardButton.addEventListener('click', evt => {
  openModal(newCardPopup);
  formAddCard.elements['place-name'].value = '';
  formAddCard.elements.link.value = '';
  clearValidation(newCardPopup, validationConfig);
});


modals.forEach(addExitClickModalHandler);

export function clickImage(evt) {
  const popImg = popupImage.querySelector('.popup__image');
  const popCaption = popupImage.querySelector('.popup__caption');
  openModal(popupImage);
  popImg.setAttribute('src', evt.target.getAttribute('src'));
  popImg.setAttribute('alt', evt.target.getAttribute('alt'));
  popCaption.textContent = evt.target.getAttribute('alt');
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closeModal(formEdit);
}

formEdit.addEventListener('submit', handleFormEditSubmit);

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  placesElement.prepend(addCard(placeNameInput.value, linkInput.value, cardTemplate, removeCard, clickImage, cardLike));
  closeModal(newCardPopup);
  formAddCard.reset();
}

formAddCard.addEventListener('submit', handleFormAddCardSubmit);

enableValidation(validationConfig);