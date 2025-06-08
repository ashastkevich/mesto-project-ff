import './index.css';
import {initialCards} from './components/cards';
import {addCard, removeCard, clickImage, cardLike} from './components/card';
import {openModal, closeModal} from './components/modal';

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
const popupClose = document.querySelector('.popup__close');
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


modals.forEach((modal) => {
  modal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      closeModal();
    }
  })
})

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closeModal();
}

formEdit.addEventListener('submit', handleFormEditSubmit);

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  placesElement.append(addCard(placeNameInput.value, linkInput.value, cardTemplate, removeCard, clickImage));
  closeModal();
  formAddCard.reset();
}

formAddCard.addEventListener('submit', handleFormAddCardSubmit);