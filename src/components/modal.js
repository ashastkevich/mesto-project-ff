export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', exitModal);
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', exitModal);
}

function exitModal(evt) {
    if (evt.key === 'Escape') {
      closeModal(document.querySelector('.popup_is-opened'));
    }
}

export function handleExitClickModal (modal) {
  modal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      closeModal(modal);
    }
  })
}