import './index.css';
import {initialCards} from './components/cards';
import {addCard, removeCard, cardLike} from './components/card';
import {openModal, closeModal, addExitClickModalHandler} from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, changeAvatar } from './components/api';

//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//DOM узлы
const placesElement = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarButton = document.querySelector('.profile__image');
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
const formAvatar = document.forms['edit-avatar'];
const avatarLinkInput = formAvatar.elements['avatar-link'];
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  inputTypeErrorClass: 'popup__input-type-error',
  errorClass: 'popup__error-visible'
}

export let myID;
getUserInfo()
  .then(result => {
    document.querySelector('.profile__image').style.backgroundImage = `url("${result.avatar}")`;
    document.querySelector('.profile__title').textContent = result.name;
    document.querySelector('.profile__description').textContent = result.about;
    myID = result._id;
  })
  .catch(err => {
    console.log(err);
  });

getInitialCards()
  .then(result => {
    result.forEach(item => {
      let myCard = true;
      if (item.owner._id != myID) myCard = false;
      placesElement.append(addCard(item.name, item.link, item.likes, item._id, cardTemplate, removeCard, clickImage, cardLike, myCard));
    });
  })
  .catch(err => {
  console.log(err);
  });

avatarButton.addEventListener('click', evt => {
  openModal(avatarPopup);
  formAvatar.elements['avatar-link'].value = '';
  clearValidation(avatarPopup, validationConfig);
});


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

function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  evt.target.elements.avatarBtn.textContent = 'Сохранение...';
  document.querySelector('.profile__image').style.backgroundImage = `url("${avatarLinkInput.value}")`;
  changeAvatar(avatarLinkInput.value)
    .finally(res => {
      evt.target.elements.avatarBtn.textContent = 'Сохранить';
      closeModal(avatarPopup);
    });
}

formAvatar.addEventListener('submit', handleFormAvatarSubmit);


function handleFormEditSubmit(evt) {
  evt.preventDefault();
  evt.target.elements.editBtn.textContent = 'Сохранение...'
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  updateUserInfo(nameInput.value, jobInput.value)
    .finally(res => {
      evt.target.elements.editBtn.textContent = 'Сохранить';
      closeModal(editPopup);
    })
}

formEdit.addEventListener('submit', handleFormEditSubmit);

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  evt.target.elements.addCardBtn.textContent = 'Сохранение...'
  addNewCard(placeNameInput.value, linkInput.value)
    .then(result => {
      placesElement.prepend(addCard(placeNameInput.value, linkInput.value, [], result._id, cardTemplate, removeCard, clickImage, cardLike, true));
    })
    .catch(err => {
      console.log(err);
    })
    .finally(res => {
      evt.target.elements.addCardBtn.textContent = 'Сохранить';
      closeModal(newCardPopup);
      formAddCard.reset();
    });
}

formAddCard.addEventListener('submit', handleFormAddCardSubmit);

enableValidation(validationConfig);