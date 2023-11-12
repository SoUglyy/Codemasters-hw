const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('passwordConfirm');
const check = document.querySelector('#check');
const button = document.querySelector(".button");
const error = document.querySelector('.error');
const formBox = document.querySelector(".form__control");


button.addEventListener("click", btnSubmit);

// main validation
function btnSubmit (e) {
  e.preventDefault();
  validateInputs();
  checkValidform();
  
}
//main validation ends

function checkValidform () {
  const formBox = document.querySelectorAll(".form__control")
  const labelCheckbox = document.querySelector(".form__checkbox-label")
  let valid = 0; 
  formBox.forEach((el) => {
    if (el.classList.contains("success")) {
        valid = valid + 1;
    }
});
  if (valid === 4  && labelCheckbox.classList.contains("success")) { 
    localStorage.setItem('E-mail', email.value);
    localStorage.setItem('Username', username.value);
    localStorage.setItem('Password', password.value);
    localStorage.setItem('Password2', password2.value);
    form.style.display = 'none';
    form.insertAdjacentHTML('afterend', `<h1 style = "text-align: center;">Вы создали аккаунт!</h1>`);
}
}
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
}

const setSuccess = element => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};



const isValidEmail = email => {
  const regexEmail  = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(String(email).toLowerCase());
}

const isValidPassword = password  => {
  const regexPass = /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-z]).{8,}/
  return regexPass.test(String(password));
}


const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const passwordConfirm = password2.value.trim();
  
  if (usernameValue === '') {
    setError(username, 'Введите ФИО')
  } else {
    setSuccess(username);
    
  }

  if (emailValue === '') {
    setError(email, 'Введите E-mail')
  } else if (!isValidEmail(emailValue)) {
    setError(email, 'Введите корректный email в формате xxx@xxx.xx')
 
  } else {
    setSuccess(email);
  }


  if (passwordValue === '') {
    setError(password, 'Введите пароль')
  }
  else if (!isValidPassword(passwordValue)) {
    setError(password, 'Пароль должен состоять из 8 символов, содержать минимум 1 цифру и 1 спецсимвол')
  } else {
    setSuccess(password);
  }

  if (passwordConfirm === '') {
    setError(password2, 'Пожалуйста подтвердите ваш пароль')
  } else if (passwordConfirm !== passwordValue) {
    setError(password2, 'Пароли не совпадают')
  } else {
    setSuccess(password2);
  }
 
  if (check.checked) {
    setSuccess(check);
  } else{
    setError(check,'Вы обязаны подтвердить, что хотите зарегистрироваться')
  }



}
