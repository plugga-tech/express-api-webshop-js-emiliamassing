const createUserBtn = document.querySelector('.createUserBtn');
const loginUserBtn = document.querySelector('.loginUserBtn');

export function displayRegisterForm() {
    const registerForm = document.querySelector('.registerForm');
    if(registerForm.style.display === 'flex') {
        registerForm.style.display = 'none';
    }else  {    
        registerForm.style.display = 'flex';
    };
};

createUserBtn.addEventListener('click', createUser);

function createUser(e) {
    const emailInput = document.querySelector('.createEmail');
    const usernameInput = document.querySelector('.createUsername');
    const passwordInput = document.querySelector('.createPassword');

    e.preventDefault();
    let newUser = {email: emailInput.value, username: usernameInput.value, password: passwordInput.value};

    fetch('http://localhost:3000/api/users/add', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {
        emailInput.value = '';
        usernameInput.value = '';
        passwordInput.value = '';
    })
    .catch(err => {
        console.log('error', err);
    });
    
    console.log('User created');
};


export function displayLoginForm() {
    const loginForm = document.querySelector('.loginForm');

    if(loginForm.style.display === 'flex') {
        loginForm.style.display = 'none';
    }else  {    
        loginForm.style.display = 'flex';
    };
};  

loginUserBtn.addEventListener('click', loginUser);

function loginUser(e) {
    const emailInput = document.querySelector('.loginEmail');
    const passwordInput = document.querySelector('.loginPassword');
    const startPage = document.querySelector('.startPage');
    e.preventDefault();
    let userInfo = {email: emailInput.value, password: passwordInput.value};

    fetch('http://localhost:3000/api/users/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data => {
        emailInput.value = '';
        passwordInput.value = '';
        if(data.email){
            const greeting = document.createElement('p');
            greeting.innerText = 'You are now signed in';
            startPage.appendChild(greeting);

            displayLoginForm();
        }
    })
    .catch(err => {
        console.log('Error', err);
    });

    console.log('Logged in');
};