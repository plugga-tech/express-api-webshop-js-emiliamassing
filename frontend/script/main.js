import '../style/base.css'
import { displayLoginForm, displayRegisterForm } from './userForm'

const startPage = document.querySelector('.startPage');

function printStartpage() {
  const heading = document.createElement('h1');
  const pElement = document.createElement('p');
  const buttonContainer = document.createElement('div');
  const registerBtn = document.createElement('button');
  const loginBtn = document.createElement('button');

  heading.innerText = 'Welcome to my Star Wars webshop';
  pElement.innerText = 'Create an account or login to place an order';
  registerBtn.innerText = 'Register';
  loginBtn.innerText = 'Log In';

  heading.classList.add('welcomeHeading');
  buttonContainer.classList.add('btnContainer');
  registerBtn.classList.add('register');

  buttonContainer.append(registerBtn, loginBtn);
  startPage.append(heading, pElement, buttonContainer);
  registerBtn.addEventListener('click', displayRegisterForm);
  loginBtn.addEventListener('click', displayLoginForm);
};

printStartpage();

function printProducts() {
    const productContainer = document.querySelector('.products');

    fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        console.log('Products', data);
    })
    .catch(err => {
        console.log('Error', err);
    });
};

printProducts();    