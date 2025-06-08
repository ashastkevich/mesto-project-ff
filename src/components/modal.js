export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', exitModal);
}

export function closeModal() {
  document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
  document.removeEventListener('keydown', exitModal);
}

function exitModal(evt) {
    if (evt.key === 'Escape') {
      closeModal();
    }
}