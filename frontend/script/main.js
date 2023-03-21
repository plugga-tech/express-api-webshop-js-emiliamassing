import '../style/base.css'
import { displayForm } from './userForm';

const startPage = document.querySelector('.startPage');

function printStartpage() {
  const heading = document.createElement('h1');
  const pElement = document.createElement('p');
  const buttonContainer = document.createElement('div');
  const registerBtn = document.createElement('button');
  const loginBtn = document.createElement('button');

  heading.innerHTML = 'Welcome to my Star Wars webshop';
  pElement.innerHTML = 'Create an account or login to see available products';
  registerBtn.innerHTML = 'Register';
  loginBtn.innerHTML = 'Log In';

  heading.className = 'welcomeHeading';
  buttonContainer.className = 'btnContainer';

  buttonContainer.append(registerBtn, loginBtn);
  startPage.append(heading, pElement, buttonContainer);
  registerBtn.addEventListener('click', displayForm);
};



printStartpage();
