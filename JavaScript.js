const AUTH_KEY = '_auth_token';
const EXPIRE_DAYS = 7;
const correctPassword = "010313"; // 修改此处密码

let authAttempts = 0;

function checkPassword() {
  const input = document.getElementById('passwordInput').value;
  const errorMsg = document.getElementById('errorMsg');

  if (input === correctPassword) {
    const expireTime = Date.now() + (EXPIRE_DAYS * 86400000);
    localStorage.setItem(AUTH_KEY, expireTime.toString());
    document.getElementById('loginOverlay').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    initializePage();
  } else {
    authAttempts++;
    errorMsg.textContent = `密码错误（剩余尝试次数：${3 - authAttempts}）`;
    if (authAttempts >= 3) {
      window.location.href = "about:blank";
    }
  }
}

function initializePage() {
  document.getElementById('navContainer').innerHTML = '';
  navData.forEach(category => {
    const section = document.createElement('div');
    section.innerHTML = `
      <div class="category">${category.name}</div>
      <div class="button-group"></div>
    `;
    category.links.forEach(link => {
      const button = document.createElement('button');
      button.className = 'button';
      button.textContent = link.name;
      button.style.width = '100%';
      button.style.maxWidth = '275px';
      button.addEventListener('click', () => window.open(link.url, '_blank'));
      section.querySelector('.button-group').appendChild(button);
    });
    document.getElementById('navContainer').appendChild(section);
  });

  document.getElementById('searchInput').addEventListener('keyup', filterLinks);

  function filterLinks() {
    const query = this.value.trim().toLowerCase();
    document.querySelectorAll('.button').forEach(btn => {
      btn.style.display = btn.textContent.toLowerCase().includes(query) ? 'flex' : 'none';
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const savedTime = parseInt(localStorage.getItem(AUTH_KEY)) || 0;

  if (savedTime > Date.now()) {
    document.getElementById('loginOverlay').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    initializePage();
  } else {
    localStorage.removeItem(AUTH_KEY);
    document.getElementById('passwordInput').focus();
  }
});