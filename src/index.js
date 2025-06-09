import './index.css';
import {initialCards} from './components/cards';
import {addCard, removeCard, cardLike} from './components/card';
import {openModal, closeModal, handleExitClickModal} from './components/modal';

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

// Вывести карточки на страницу
initialCards.forEach(item => placesElement.append(addCard(item.name, item.link, cardTemplate, removeCard, clickImage, cardLike)));

editButton.addEventListener('click', evt => {
  openModal(editPopup);
  formEdit.elements.name.value = document.querySelector('.profile__title').textContent;
  formEdit.elements.description.value = document.querySelector('.profile__description').textContent;
});

newCardButton.addEventListener('click', evt => {
  openModal(newCardPopup);
});


modals.forEach(handleExitClickModal);

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