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
  // Check if there is a previous history entry to go back to
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'login-as-Teacher1.html'; // Navigate to the first page if no history
  }
}

// навигация след страница
function goNext() {
  const currentUrl = window.location.pathname;

  if (currentUrl === '/login-as-Teacher4.html') {
    // Show modal when navigating to the fifth page
    showModal();
    return; // Stop further navigation
  }

  let nextPage;
  switch (currentUrl) {
    case '/login-as-Teacher1.html':
      nextPage = 'login-as-Teacher2.html';
      break;
    case '/login-as-Teacher2.html':
      nextPage = 'login-as-Teacher3.html';
      break;
    case '/login-as-Teacher3.html':
      nextPage = 'login-as-Teacher4.html';
      break;
    case '/login-as-Teacher4.html':
      nextPage = 'login-as-Teacher5.html';
      break;
    default:
      nextPage = 'login-as-Teacher1.html'; 
      break;
  }
  window.location.href = nextPage;
}

// что бы на первой странице не было бэк баттона :) 
window.onload = function() {
  const currentUrl = window.location.pathname;
  const backButton = document.getElementById("backBtn");

  if (currentUrl === '/login-as-Teacher1.html') {
    backButton.style.display = "none"; 
  } else {
    backButton.style.display = "block"; 
  }
};

function showModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Automatically hide the modal after 5 seconds
  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    window.location.href = 'home.html'; // Redirect back to the first page
  }, 5000);
}

