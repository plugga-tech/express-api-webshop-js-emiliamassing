import '../style/base.css'
import { displayLoginForm, displayRegisterForm } from './userForm'

const startPage = document.querySelector('.startPage');
const productContainer = document.querySelector('.products');

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

function fetchProducts() {
    fetch('http://localhost:3000/api/products/')
    .then(res => res.json())
    .then(data => {
        console.log('Products', data);
        printProducts(data);
    })
    .catch(err => {
        console.log('Error', err);
    });
};

fetchProducts();

function printProducts(products) {

    products.map(product => {
        let container = document.createElement('div');
        container.classList.add('productContainer');

        let pElement = document.createElement('p');
        pElement.id = product.id;
        pElement.innerHTML = product.title;

        const placeholderImg = document.createElement('div');
        placeholderImg.classList.add('placeholderImg');

        const ulElement = document.createElement('ul');

        let description = document.createElement('li');
        let price = document.createElement('li');
        let category = document.createElement('li');
        let stock = document.createElement('li');

        description.innerHTML = product.description;
        price.innerHTML = product.price + ' SEK';
        category.innerHTML = product.category;
        stock.innerHTML = product.stock + ' St';

        ulElement.append(description, price, category, stock);  
        container.append(pElement, placeholderImg, ulElement);
        productContainer.appendChild(container);
    });
}