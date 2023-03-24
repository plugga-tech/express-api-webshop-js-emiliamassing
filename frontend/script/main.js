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
  registerBtn.classList.add('registerBtn');
  loginBtn.classList.add('loginBtn');

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
        printProducts(data);
        getCategories();
    })
    .catch(err => {
        console.log('Error', err);
    });
};

fetchProducts();

let loggedinUser = localStorage.getItem("E-mail");

export function printProducts(products) {

    products.map(product => {
        let container = document.createElement('div');
        container.classList.add('productContainer');

        let pElement = document.createElement('p');
        pElement.id = product._id;
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
        category.innerHTML = product.category.name;
        stock.innerHTML = product.stock + ' St';

        const counterContainer = document.createElement('div');
        counterContainer.classList.add('counterContainer');

        let currentAmount = document.createElement('div');
        let operatorBtns = document.createElement('div');
        let plusBtn = document.createElement('button');
        let minusBtn = document.createElement('button');

        currentAmount.classList.add('currentAmount');
        operatorBtns.classList.add('operatorBtns');
        plusBtn.classList.add('plusBtn');
        minusBtn.classList.add('minusBtn');

        currentAmount.innerHTML = '0'; //Ändra denna    
        plusBtn.innerHTML = '+';
        minusBtn.innerHTML = '-';

        let addToCartBtn = document.createElement('button');
        addToCartBtn.id = product._id;
        addToCartBtn.innerHTML = 'Add to cart';

        ulElement.append(description, price, category, stock);
        counterContainer.append(currentAmount, plusBtn, minusBtn, addToCartBtn); 

        container.append(pElement, placeholderImg, ulElement, counterContainer);
        productContainer.appendChild(container);
    });
};

function getCategories() {
    fetch('http://localhost:3000/api/categories')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        printCategories(data);
    })
    .catch(err => {
        console.log('Error', err);
    });
};

function printCategories(categories) {
    const select = document.querySelector('.selectCategory');

    categories.map(category => {
        let option = document.createElement('option');
        option.innerHTML = category.name;
        option.id = category._id;

        select.appendChild(option);
    });
};