import '../style/base.css'
import { displayForm } from './userForm';

const startPage = document.querySelector('.startPage');

function printStartpage() {
  const heading = document.createElement('h1');
  const pElement = document.createElement('p');
  const button = document.createElement('button');

  heading.innerHTML = 'Welcome to my Star Wars webshop';
  pElement.innerHTML = 'Create an account or login to see available products';
  button.innerHTML = 'Register';

  heading.className = 'welcomeHeading';

  startPage.append(heading, pElement, button);
  button.addEventListener('click', displayForm);
};



printStartpage();
