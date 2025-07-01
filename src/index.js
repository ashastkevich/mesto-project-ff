import './index.css';
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
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popImg = popupImage.querySelector('.popup__image');
const popCaption = popupImage.querySelector('.popup__caption');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  inputTypeErrorClass: 'popup__input-type-error',
  errorClass: 'popup__error-visible'
}

let myID;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardData]) => {
    profileImage.style.backgroundImage = `url("${userData.avatar}")`;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    myID = userData._id;
    cardData.forEach(item => {
      let myCard = true;
      if (item.owner._id != myID) myCard = false;
      placesElement.append(addCard(item.name, item.link, item.likes, item._id, cardTemplate, removeCard, clickImage, cardLike, myCard, myID));
    });
  })
  .catch(err => {
    console.log(err);
  });

avatarButton.addEventListener('click', evt => {
  openModal(avatarPopup);
  avatarLinkInput.value = '';
  clearValidation(avatarPopup, validationConfig);
});


editButton.addEventListener('click', evt => {
  openModal(editPopup);
  formEdit.elements.name.value = profileTitle.textContent;
  formEdit.elements.description.value = profileDescription.textContent;
  clearValidation(editPopup, validationConfig);
});

newCardButton.addEventListener('click', evt => {
  openModal(newCardPopup);
  formAddCard.reset();
  clearValidation(newCardPopup, validationConfig);
});


modals.forEach(addExitClickModalHandler);

// !ВНИМАНИЕ Ревьюера! Вы почему-то в рамках последнего ревью смотрели предыдущую версию моего проекта. 
// В той версии, которую я вам направил на ревью все ваши замечания уже были исправлены.
// На Github была выложена корректная последняя версия.

function clickImage(name, link) {
  openModal(popupImage);
  popImg.setAttribute('src', link);
  popImg.setAttribute('alt', name);
  popCaption.textContent = name;
}

function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  evt.target.elements.avatarBtn.textContent = 'Сохранение...';
  changeAvatar(avatarLinkInput.value)
    .then(res => {
      profileImage.style.backgroundImage = `url("${avatarLinkInput.value}")`;
      closeModal(avatarPopup);
      formAvatar.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      evt.target.elements.avatarBtn.textContent = 'Сохранить';
    });
}

formAvatar.addEventListener('submit', handleFormAvatarSubmit);


function handleFormEditSubmit(evt) {
  evt.preventDefault();
  evt.target.elements.editBtn.textContent = 'Сохранение...'
  updateUserInfo(nameInput.value, jobInput.value)
    .then(res => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closeModal(editPopup);
      formEdit.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      evt.target.elements.editBtn.textContent = 'Сохранить';
    });
}

formEdit.addEventListener('submit', handleFormEditSubmit);

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  evt.target.elements.addCardBtn.textContent = 'Сохранение...'
  addNewCard(placeNameInput.value, linkInput.value)
    .then(result => {
      placesElement.prepend(addCard(placeNameInput.value, linkInput.value, [], result._id, cardTemplate, removeCard, clickImage, cardLike, true, myID));
      closeModal(newCardPopup);
      formAddCard.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(res => {
      evt.target.elements.addCardBtn.textContent = 'Сохранить';
    });
}

formAddCard.addEventListener('submit', handleFormAddCardSubmit);

enableValidation(validationConfig);