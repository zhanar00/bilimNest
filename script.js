// Проверка состояния авторизации
function displayProfileIcon() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navEnd = document.getElementById("nav-end");
  if (!navEnd) return; // Если элемента нет, выходим.

  navEnd.innerHTML = ""; // Очистить содержимое перед добавлением

  if (isLoggedIn) {
    const profileLink = document.createElement("a");
    profileLink.href = "profile.html";
    profileLink.innerHTML = `
      <img
        src="./img/photo.png"
        alt="Profile"
        style="width: 40px; height: 40px; border-radius: 50%; cursor: pointer;"
      />
    `;
    navEnd.appendChild(profileLink);
  } else {
    const loginLink = document.createElement("a");
    loginLink.href = "loginPage.html";
    loginLink.textContent = "Войти";
    loginLink.style.cssText = "font-size: 16px; text-decoration: none; color: #000;";
    navEnd.appendChild(loginLink);
  }
}

// Проверка авторизации для защищённых страниц
function checkAuthStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    alert("Вы не авторизованы. Пожалуйста, войдите в систему.");
    window.location.href = "loginPage.html";
  }
};

// Выход из системы
function logout() {
  localStorage.setItem("isLoggedIn", "false");
  alert("Вы вышли из системы.");
  window.location.href = "loginPage.html";
}

// Навигация назад
function goBack(defaultUrl = "login-as-Teacher1.html") {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = defaultUrl;
  }
}

// Навигация на следующую страницу
function goNext() {
  const currentUrl = window.location.href;
  let nextPage

  if (currentUrl.includes("login-as-Teacher1.html")) {
    nextPage = "login-as-Teacher2.html";
  } else if (currentUrl.includes("login-as-Teacher2.html")) {
    nextPage = "login-as-Teacher3.html";
  } else if (currentUrl.includes("login-as-Teacher3.html")) {
    nextPage = "login-as-Teacher4.html";
  } else if (currentUrl.includes("login-as-Teacher4.html")) {
    showModal();
    return
  } else {
    nextPage = "login-as-Teacher1.html"
  }

  window.location.href = nextPage;
}

// Регистрация
document.querySelector("#register-button")?.addEventListener("click", (event) => {
  event.preventDefault();

  const fullName = document.querySelector("#floatingFullName").value.trim();
  const email = document.querySelector("#floatingEmail").value.trim();
  const password = document.querySelector("#floatingPassword").value.trim();
  const agreement = document.querySelector("#flexCheckDefault").checked;

  if (!fullName || !email || !password || !agreement) {
    alert("Пожалуйста, заполните все поля и согласитесь с условиями.");
    return;
  }

  const user = { fullName, email, password }
  localStorage.setItem("user", JSON.stringify(user));

  alert("Регистрация прошла успешно!");
  window.location.href = "loginPage.html";
});

// Вход
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector("#login-button");

  if (loginButton) {
    loginButton.addEventListener("click", (event) => {
      event.preventDefault(); // Предотвращаем стандартное поведение кнопки

      // Получаем значения из полей email и password
      const email = document.querySelector("#floatingInput").value.trim();
      const password = document.querySelector("#floatingPassword").value.trim();

      // Проверяем наличие данных пользователя в localStorage
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Нет зарегистрированных пользователей. Сначала зарегистрируйтесь.");
        return;
      }

      // Сравниваем введённые данные с сохранёнными
      if (email === user.email && password === user.password) {
        alert('Добро пожаловать, ${user.fullName}!');
        localStorage.setItem("isLoggedIn", "true"); // Устанавливаем статус авторизации
        window.location.href = loginButton.getAttribute("data-url"); // Переход на домашнюю страницу
      } else {
        // Отображаем сообщение об ошибке
        const errorMessage = document.getElementById("error-message");
        if (errorMessage) {
          errorMessage.textContent = "Неправильный email или пароль.";
          errorMessage.style.display = "block";
        }
      }
    });
  } else {
    console.error("Кнопка входа с ID #login-button не найдена.");
  }
});
// Подсказки для поиска курсов
const courses = ["Английский язык", "Алгебра", "Python", "Unity", "География", "Японский язык"];

function showSuggestions(event) {
  const input = event.target.value.toLowerCase();
  const suggestionsBox = document.getElementById("suggestions");
  if (!suggestionsBox) return;

  if (!input) {
    suggestionsBox.style.display = "none";
    return;
  };

  const filteredCourses = courses.filter((course) => course.toLowerCase().includes(input));

  if (filteredCourses.length > 0) {
    suggestionsBox.style.display = "block";
    suggestionsBox.innerHTML = filteredCourses
      .map((course) => `<p onclick="selectSuggestion('${course}')">${course}</p>`)
      .join("");
  } else {
    suggestionsBox.style.display = "none";
  }
};

function selectSuggestion(course) {
  document.getElementById("searchQuery").value = course;
  document.getElementById("suggestions").style.display = "none";
};