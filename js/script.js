function scrollRight() {
    document.querySelector('.slider').scrollBy({ left: 200, behavior: 'smooth' });
  }
  
  function scrollLeft() {
    document.querySelector('.slider').scrollBy({ left: -200, behavior: 'smooth' });
  }
  
  function toggleText(button) {
    const textField = button.nextElementSibling;
    textField.classList.toggle("open");
  }

  //zhanarr