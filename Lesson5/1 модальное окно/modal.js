const modal = document.querySelector('.main');
const hideModal = document.querySelector('.hide_btn');
const showModal = document.querySelector('.modal_btn');

hideModal.addEventListener('click', function () {
    modal.classList.add('hide');
});

showModal.addEventListener('click', function () {
    modal.classList.remove('hide');
});
