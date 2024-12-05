// // Проверка состояния авторизации
// function displayProfileIcon() {
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   const navEnd = document.getElementById("nav-end");
//   navEnd.innerHTML = ""; // Очистить содержимое перед добавлением

//   if (isLoggedIn) {
//     const profileLink = document.createElement("a");
//     profileLink.href = "/profile";
//     profileLink.innerHTML = `
//       <img
//         src="./img/photo.png"
//         alt="Profile"
//         style="width: 40px; height: 40px; border-radius: 50%; cursor: pointer;"
//       />
//     `;
//     navEnd.appendChild(profileLink);
//   } else {
//     const loginLink = document.createElement("a");
//     loginLink.href = "/login";
//     loginLink.textContent = "Войти";
//     loginLink.style.cssText = "font-size: 16px; text-decoration: none; color: #000;";
//     navEnd.appendChild(loginLink);
//   }
// }

// // Вызываем функцию при загрузке страницы
// window.onload = displayProfileIcon;


function logout() {
  localStorage.setItem("isLoggedIn", "false");
  alert("Вы вышли из системы.");
  window.location.href = "/login"; // Перенаправление на страницу входа
}

document.getElementById("logoutButton")?.addEventListener("click", logout);


// открытие меню
document.getElementById("nav-end").addEventListener("click", (event) => {
  const profileMenu = document.getElementById("profile-menu");
  profileMenu.classList.toggle("hidden");
});


// //Проверка статуса авторизации при загрузке
// function checkAuthStatus() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (!user || !user.email) {
//     alert("Вы не авторизованы. Пожалуйста, войдите в систему.");
//     window.location.href = "loginPage.html";
//   }
// }

// // Вызов при загрузке защищённых страниц
// window.onload = checkAuthStatus;


// скролл курсов для хоум пейдж
function scrollRight() {
  document.querySelector(".slider").scrollBy({ left: 200, behavior: "smooth" });
}

function scrollLeft() {
  document
    .querySelector(".slider")
    .scrollBy({ left: -200, behavior: "smooth" });
}

function toggleText(button) {
  const textField = button.nextElementSibling;
  textField.classList.toggle("open");
}

// переход при нажатии на кнопку
document.querySelectorAll(".btn-login").forEach((button) => {
  button.addEventListener("click", () => {
    const targetUrl = button.getAttribute("data-url");
    if (targetUrl) {
      window.location.href = targetUrl;
    }
  });
});

// серч предложении по курсам, всплывающее окно пока что просто с массивом данных :(
const courses = [
  "Английский язык",
  "Алгебра",
  "Python",
  "Unity",
  "География",
  "Японский язык",
];

function showSuggestions(event) {
  const input = event.target.value.toLowerCase();
  const suggestionsBox = document.getElementById("suggestions");

  if (!input) {
    suggestionsBox.style.display = "none";
    return;
  }

  const filteredCourses = courses.filter((course) =>
    course.toLowerCase().includes(input)
  );

  if (filteredCourses.length > 0) {
    suggestionsBox.style.display = "block";
    suggestionsBox.innerHTML = filteredCourses
      .map(
        (course) => `<p onclick="selectSuggestion('${course}')">${course}</p>`
      )
      .join("");
  } else {
    suggestionsBox.style.display = "none";
  }
}

function selectSuggestion(course) {
  document.getElementById("searchQuery").value = course;
  document.getElementById("suggestions").style.display = "none";
}

function performSearch(event) {
  event.preventDefault();
  const query = document.getElementById("searchQuery").value.trim();
  alert(`Ищем: ${query}`); // Здесь можно заменить на отправку запроса на сервер
}

// навигация назад
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "login-as-Teacher1.html";
  }
}

// навигация след страница
function goNext() {
  const currentUrl = window.location.href;

  let nextPage;
  switch (true) {
    case currentUrl.includes("login-as-Teacher1.html"):
      nextPage = "login-as-Teacher2.html";
      break;
    case currentUrl.includes("login-as-Teacher2.html"):
      nextPage = "login-as-Teacher3.html";
      break;
    case currentUrl.includes("login-as-Teacher3.html"):
      nextPage = "login-as-Teacher4.html";
      break;
    case currentUrl.includes("login-as-Teacher4.html"):
      showModal();
      return;
    default:
      nextPage = "login-as-Teacher1.html";
      break;
  }
  window.location.href = nextPage;
}


// что бы на первой странице не было бэк баттона :)
window.onload = function () {
  const backButton = document.getElementById("backBtn");
  if (window.location.href.includes("login-as-Teacher1.html")) {
    backButton.style.display = "none";
  } else {
    backButton.style.display = "block";
  }
};


function showModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");

  // через 3сек модальный всплывающий экран исчезает сам
  setTimeout(() => {
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
    window.location.href = "home.html";
  }, 3000);
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

document.getElementById("modal-close-btn").addEventListener("click", closeModal);




// рега
document.querySelector("#register-button").addEventListener("click", (event) => {
  event.preventDefault();

  const fullName = document.querySelector("#floatingFullName").value.trim();
  const email = document.querySelector("#floatingEmail").value.trim();
  const password = document.querySelector("#floatingPassword").value.trim();
  const agreement = document.querySelector("#flexCheckDefault").checked;

  if (!fullName || !email || !password || !agreement) {
    alert("Пожалуйста, заполните все поля и согласитесь с условиями.");
    return;
  }

  // Сохраняем данные пользователя
  const user = { fullName, email, password };
  localStorage.setItem("user", JSON.stringify(user));

  alert("Регистрация прошла успешно!");
  window.location.href = "loginPage.html";
});



// вход
document.querySelector("#login-button").addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.querySelector("#floatingEmail").value.trim();
  const password = document.querySelector("#floatingPassword").value.trim();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Нет зарегистрированных пользователей. Сначала зарегистрируйтесь.");
    return;
  }

  if (email === user.email && password === user.password) {
    alert(`Добро пожаловать, ${user.fullName}!`);
    localStorage.setItem("isLoggedIn", "true"); // Устанавливаем статус авторизации
    window.location.href = "home.html";
  } else {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "Неправильный пароль или email.";
    errorMessage.style.display = "block";
  }
});




// функция что бы проверить авторизован ли юзер что бы зайти на страницу тичера
//хз не работает корректно
document.getElementById("teacherLoginLink").addEventListener("click", function (event) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email) {
    window.location.href = "login-as-Teacher1.html";
  } else {
    alert("Пожалуйста, войдите в систему, чтобы продолжить.");
    window.location.href = "loginPage.html";
  }
});



document.querySelectorAll(".btn-google, .btn-appleId").forEach((button) => {
  button.addEventListener("click", () => {
    const targetUrl = button.getAttribute("data-url");
    if (targetUrl) {
      window.location.href = targetUrl;
    }
  });
});




// // авторизация
// const validCredentials = {
//   email: "user",
//   password: "1234"
// };

// document.getElementById("login-button").addEventListener("click", function(event) {
//   event.preventDefault();

//   const email = document.getElementById("floatingInput").value.trim();
//   const password = document.getElementById("floatingPassword").value.trim();

//   if (email !== validCredentials.email || password !== validCredentials.password) {
//     const errorMessage = document.getElementById("error-message");
//     errorMessage.textContent = "Неправильный пароль или email.";
//     errorMessage.style.display = "block";
//   } else {
//     window.location.href = "home.html";
//   }
// });