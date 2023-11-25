// toggle icon for navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('fa-circle-xmark');
  navbar.classList.toggle('active');
};

// for scrolling
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        // active navbar links
        navLinks.forEach((links) => {
          links.classList.remove('active');
          document
            .querySelector('header nav a[href*=' + id + ']')
            .classList.add('active');
        });
        // active sections for animation on scroll
        sec.classList.add('show-animate');
      });
    } else {
      sec.classList.remove('show-animate');
    }
  });

  /* // sticky header upon scroll
 let header = document.querySelector('header');

 header.classList.toggle('sticky', window.scrollY > 100);*/

  // remove toggle icon and navbar upon clicking and scrolling nav links
  menuIcon.classList.remove('fa-circle-xmark');
  navbar.classList.remove('active');

  // animation footer on scroll
  let footer = document.querySelector('footer');

  footer.classList.toggle(
    'show-animate',
    this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight
  );
};

const scriptURL =
  'https://script.google.com/macros/s/AKfycbxFWFWbyKBydDOdTDVYJiXpgNmNUgfvylaIIH9y88563_eTKWQEGI9GEm3xLoJkdmZEyA/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = 'Successfully Sent!';
      setTimeout(function () {
        msg.innerHTML = '';
      }, 5000);
      form.reset();
      console.log('Success!', response);
    })
    .catch((error) => console.error('Error!', error.message));
});
