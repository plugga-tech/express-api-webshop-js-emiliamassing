const userForm = document.querySelector('.userForm');
const form = document.createElement('form');

export function renderForm() {
    const loginHeading = document.createElement('h1');
    const emailInput = document.createElement('input');
    const usernameInput = document.createElement('input');
    const passwordInput = document.createElement('input');
    const createUserBtn = document.createElement('button');
    
  
    loginHeading.innerText = 'Create account';
    createUserBtn.innerText = 'Create user';

    emailInput.placeholder = 'E-mail';
    usernameInput.placeholder = 'Username';
    passwordInput.placeholder = 'Password';
    passwordInput.type = 'password';

    emailInput.classList.add('createEmail');
    usernameInput.classList.add('createUsername');
    passwordInput.classList.add('createPassword');
  
    userForm.appendChild(form);
    form.append(loginHeading, emailInput, usernameInput, passwordInput, createUserBtn);

    createUserBtn.addEventListener('click', createUser);
};

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
    .then(data =>{
        emailInput.value = '';
        usernameInput.value = '';
        passwordInput.value = '';
    })
    .catch(err => {
        console.log('error', err);
    });
    
    console.log('User created');
};

function loginUser() {
    
}

