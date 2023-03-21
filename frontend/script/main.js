import '../style/base.css'

const startPage = document.querySelector('.startPage');

/*document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;*/

function printStartpage() {
  const heading = document.createElement('h2');
  heading.innerHTML = 'Welcome to my Star Wars webshop';
  heading.className = 'welcomeHeading';

  startPage.appendChild(heading);
};

printStartpage();
