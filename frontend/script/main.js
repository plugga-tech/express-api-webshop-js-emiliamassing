import '../style/base.css'
import { renderForm } from './userForm'

const startPage = document.querySelector('.startPage');

function printStartpage() {
  const heading = document.createElement('h1');
  const pElement = document.createElement('p');
  const buttonContainer = document.createElement('div');
  const registerBtn = document.createElement('button');
  const loginBtn = document.createElement('button');

  heading.innerText = 'Welcome to my Star Wars webshop';
  pElement.innerText = 'Create an account or login to see available products';
  registerBtn.innerText = 'Register';
  loginBtn.innerText = 'Log In';

  heading.classList.add('welcomeHeading');
  buttonContainer.classList.add('btnContainer');
  registerBtn.classList.add('register');

  buttonContainer.append(registerBtn, loginBtn);
  startPage.append(heading, pElement, buttonContainer);
  registerBtn.addEventListener('click', renderForm);
};



printStartpage();
