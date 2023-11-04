const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('passwordConfirm');
const check = document.querySelector('#check');
const button = document.querySelector('.button');
const error = document.querySelector('.error')
// const formInput = document.querySelector('.form__input')

form.addEventListener('submit', e => {
  e.preventDefault();
  validateInputs();
  // console.log(localStorage.setItem('username',username.value))
  // form.style.display = 'none';
  // form.insertAdjacentHTML('afterend', `<h2>Вы создали аккаунт!</h2>`)
});

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
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(String(email).toLowerCase());
}

const isValidPassword = password => {
  const regexPass = /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-z]).{8,}/
  return regexPass.test(String(password));
}
// main validation

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
    setError(password, 'Минимум 8 символов и 1 хотя бы спецсимвол ')
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
    // error.style.color = 'blue';
  } else {
    setError(check, 'Вы обязаны подтвердить, что хотите зарегистрироваться')
  }



}
// const setError = (element, message) => {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector('.error');

//     errorDisplay.innerText = message;
//     inputControl.classList.add('error');
//     inputControl.classList.remove('success')
// }

// const setSuccess = element => {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector('.error');

//     errorDisplay.innerText = '';
//     inputControl.classList.add('success');
//     inputControl.classList.remove('error');
// };

// const isValidEmail = email => {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

// const validateInputs = () => {
//     const fioValue = fio.value.trim();
//     const emailValue = email.value.trim();
//     const passwordValue = password.value.trim();
//     const password2Value = password2.value.trim();

//     if(fioValue === '') {
//         setError(fio, 'Fio is required');
//     } else {
//         setSuccess(fio);
//     }

//     if(emailValue === '') {
//         setError(email, 'Email is required');
//     } else if (!isValidEmail(emailValue)) {
//         setError(email, 'Provide a valid email address');
//     } else {
//         setSuccess(email);
//     }

//     if(passwordValue === '') {
//         setError(password, 'Password is required');
//     } else if (passwordValue.length < 8 ) {
//         setError(password, 'Password must be at least 8 character.')
//     } else {
//         setSuccess(password);
//     }

//     if(password2Value === '') {
//         setError(password2, 'Please confirm your password');
//     } else if (password2Value !== passwordValue) {
//         setError(password2, "Passwords doesn't match");
//     } else {
//         setSuccess(password2);
//     }
//   }
// const canPass = () => {

// }
// if (canPass) {
//   localStorage.setItem('email', emailValue.value);
//   localStorage.setItem('fio', fioValue.value);
//   localStorage.setItem('password', passwordValue.value);
//   form.insertAdjacentHTML('afterend', `<h2>Вы создали аккаунт!</h2>`);
//   form.remove();
