// ========== 全局常量定义 ==========

const AUTH_KEY = '_auth_token';

const EXPIRE_DAYS = 7;

const correctPassword = "010313"; // 修改此处密码



// ========== 密码验证函数 ==========

function checkPassword() {

  const input = document.getElementById('passwordInput').value;

  const errorMsg = document.getElementById('errorMsg');

  

  if (input === correctPassword) {

    // 存储登录状态

    const expireTime = Date.now() + (EXPIRE_DAYS * 86400000);

    localStorage.setItem(AUTH_KEY, expireTime.toString());

    

    // 显示主界面

    document.getElementById('loginOverlay').style.display = 'none';

    document.querySelector('.container').style.display = 'block';

    initializePage();

  } else {

    // 原有错误处理逻辑

    authAttempts++;

    errorMsg.textContent = `密码错误（剩余尝试次数：${3 - authAttempts}）`;

    if (authAttempts >= 3) {

      window.location.href = "about:blank";

    }

  }

}



// ========== 页面初始化函数 ==========

function initializePage() {

  // 动态生成导航按钮

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

      button.addEventListener('click', () => window.open(link.url, '_blank'));

      section.querySelector('.button-group').appendChild(button);

    });

    

    document.getElementById('navContainer').appendChild(section);

  });

  // 搜索功能优化

  document.getElementById('searchInput').addEventListener('keyup', filterLinks);

  function filterLinks() {

    const query = this.value.trim().toUpperCase();

    document.querySelectorAll('.button').forEach(btn => {

      btn.style.display = btn.textContent.toUpperCase().includes(query) ? '' : 'none';

    });

  }

}



// ========== 自动登录检查 ==========

document.addEventListener('DOMContentLoaded', function() {

  // 检查本地存储

  const savedTime = parseInt(localStorage.getItem(AUTH_KEY)) || 0;

  

  if (savedTime > Date.now()) {

    // 自动登录成功

    document.getElementById('loginOverlay').style.display = 'none';

    document.querySelector('.container').style.display = 'block';

    initializePage();

  } else {

    // 清除过期记录

    localStorage.removeItem(AUTH_KEY);

    // 显示登录界面

    document.getElementById('loginOverlay').style.display = 'flex';

    document.getElementById('passwordInput').focus();

  }

});

// 自动聚焦密码输入框

document.getElementById('passwordInput').focus();