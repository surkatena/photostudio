// Срабатывание кнопки "Закрыть" section "Contact" 
const contactsCloseBtn = document.querySelector('.contacts__close')
const contactsCloseShow = document.querySelector('.contacts__show__btn')

contactsCloseBtn.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelector('.contacts__info').style.transform = 'scaleX(0)';
  document.querySelector('.contacts__show').style.transform = 'scaleX(1)';
})

contactsCloseShow.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelector('.contacts__info').style.transform = 'scaleX(1)';
  document.querySelector('.contacts__show').style.transform = 'scaleX(0)';
})

// Срабатывание кнопки "Поиск" section "Header" 
const btnSearchClose = document.querySelector('.search__close');
const btnSearch = document.querySelector('.header__search');

btnSearch.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelector('.search').style.transform = 'scaleX(1)';
})

btnSearchClose.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelector('.search').style.transform = 'scaleX(0)';
  document.querySelector('.search__input').value = '';
})

// Срабатывание кнопки "Открыть" в бургер-меню
const burgerOpenBtn = document.querySelector('.burger__btn-open');
const burgerCloseBtn = document.querySelector('.burger__btn-close');

burgerOpenBtn.addEventListener('click', (event) => {
  event.preventDefault();
  burgerCloseBtn.classList.remove('visually-hidden');
  burgerOpenBtn.classList.add('visually-hidden');
  document.querySelector('.nav__adaptive-top').style.transform = 'scale(1)';
  document.querySelector('.nav__adaptive-top').style.height = '100%';
  document.querySelector('.nav__adaptive').classList.add('burger-open');
  
})

burgerCloseBtn.addEventListener('click', (event) => {
  event.preventDefault();
  burgerCloseBtn.classList.add('visually-hidden');
  burgerOpenBtn.classList.remove('visually-hidden');
  document.querySelector('.nav__adaptive-top').style.transform = 'scale(0)';
  document.querySelector('.nav__adaptive-top').style.height = '0';
  document.querySelector('.nav__adaptive').classList.remove('burger-open');
})

// Валидация поля для email section "About"

const aboutEmail = document.getElementById('aboutEmail');
const aboutBtnSend = document.querySelector('.about__btn');

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const NAME_REGEXP =  /^[0-9A-ZА-ЯЁ]+$/i;

aboutBtnSend.addEventListener('click', (event) => {
  event.preventDefault();  
  validateEmail();
})

function validateEmail() {  
  if (isEmailValid(aboutEmail.value)) {
    aboutEmail.classList.remove('about__error__input');
    document.querySelector('.about__label').classList.remove('about__error');
  }
  else{
    aboutEmail.classList.add('about__error__input');
    document.querySelector('.about__label').classList.add('about__error');
  }
}

// Валидация формы section "Contacts"
const contactsEmail = document.getElementById('contactsEmail');
const contactsName = document.getElementById('contactsName');
const contactsComment = document.getElementById('comment');

const contactsBtnSend = document.querySelector('.contacts__btn');

contactsBtnSend.addEventListener('click', (event) => {
  event.preventDefault();
  validName();  
  validEmail();
})

function validEmail() {  
  if (isEmailValid(contactsEmail.value.trim())) {
    contactsEmail.classList.remove('contacts__error__input');
    document.querySelector('.contacts__label-email').classList.remove('contacts__error');
  }
  else{
    contactsEmail.classList.add('contacts__error__input');
    document.querySelector('.contacts__label-email').classList.add('contacts__error');
  }
}
function validName() {  
  if (isNameValid(contactsName.value.trim())) {
    contactsName.classList.remove('contacts__error__input');
    document.querySelector('.contacts__label-name').classList.remove('contacts__error');
  }
  else{
    contactsName.classList.add('contacts__error__input');
    document.querySelector('.contacts__label-name').classList.add('contacts__error');
  }
}

function isEmailValid(email) {
  return EMAIL_REGEXP.test(email);
}
function isNameValid(name) {
  return NAME_REGEXP.test(name);
}
