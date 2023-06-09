import '../style/base.css'
import { displayLoginForm, displayRegisterForm } from './userForm'

const startPage = document.querySelector('.startPage');
const productContainer = document.querySelector('.products');
const flexContainer = document.querySelector('.flexContainer');
const shoppingCart = document.querySelector('.shoppingCart');
const shoppingCartBtn = document.querySelector('.shoppingCartBtn');

let cart = JSON.parse(localStorage.getItem('Cart')) || [];

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

        currentAmount.innerHTML = 0; //Ändra denna    
        plusBtn.innerHTML = '+';
        minusBtn.innerHTML = '-';

        let addToCartBtn = document.createElement('button');
        addToCartBtn.id = product._id;
        addToCartBtn.innerHTML = 'Add to cart';

        ulElement.append(description, price, category, stock);
        counterContainer.append(currentAmount, plusBtn, minusBtn, addToCartBtn); 

        container.append(pElement, placeholderImg, ulElement, counterContainer);
        productContainer.appendChild(container);

        addToCartBtn.addEventListener('click', (e) => {
            addProductToCart(e.target.id);        
        });
    });
};

function addProductToCart(productId) {
    fetch('http://localhost:3000/api/products/' + productId)
    .then(res => res.json())
    .then(data => {
        let equalProduct = cart.find(cartProduct => cartProduct._id === data._id)
        if(equalProduct) {
            equalProduct.quantity ++;
        }else {
            const updatedCart = [...cart, {...data, quantity: 1}];
            cart = updatedCart;
        }
        
        localStorage.setItem('Cart', JSON.stringify(cart));
    })
    .catch(err => {
        console.log('Error', err);
    })
};

function getCategories() {
    fetch('http://localhost:3000/api/categories')
    .then(res => res.json())
    .then(data => {
        printCategories(data);
    })
    .catch(err => {
        console.log('Error', err);
    });
};

function printCategories(categories) {
    const filterContainer = document.querySelector('.filter');

    categories.map(category => {
        let button = document.createElement('button');
        button.innerHTML = category.name;
        button.id = category._id;
        button.classList.add('filterBtn');

        filterContainer.appendChild(button);

        button.addEventListener('click', (e) => {
            showProductByCategory(e.target.id);
        });
    });
};

function showProductByCategory(categoryId) {
    fetch('http://localhost:3000/api/products/category/' + categoryId)
    .then(res => res.json())
    .then(data => {
        productContainer.innerHTML = '';
        printProducts(data);
    })
    .catch(err => {
        console.log('Error', err);
    });
};

shoppingCartBtn.addEventListener('click', printCart);

function printCart() {
    productContainer.classList.toggle('toggleHidden');
    shoppingCart.classList.toggle('toggleHidden');

    const productsInCart = JSON.parse(window.localStorage.getItem('Cart'));

    productsInCart.map(product => {
        let orderProductContainer = document.createElement('div');
        orderProductContainer.classList.add('orderProductContainer');

        let title = document.createElement('h3');
        title.innerHTML = product.title;

        const placeholderImg = document.createElement('div');
        placeholderImg.classList.add('placeholderImg');

        const ulElement = document.createElement('ul');

        let description = document.createElement('li');
        let price = document.createElement('li');
        let quantity = document.createElement('li');

        description.innerHTML = product.description;
        price.innerHTML = product.price * product.quantity + ' SEK';
        quantity.innerHTML = product.quantity;

        ulElement.append(description, price, quantity);

        orderProductContainer.append(title, placeholderImg, ulElement);
        flexContainer.appendChild(orderProductContainer);
    });

    console.log(productsInCart);
};