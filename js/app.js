// Toggle icon for navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let footer = document.querySelector('footer');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('fa-circle-xmark');
  navbar.classList.toggle('active');
};

// Handle scrolling
window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove('active');
      });
      document
        .querySelector('header nav a[href*=' + id + ']')
        .classList.add('active');
      sec.classList.add('show-animate');
    } else {
      sec.classList.remove('show-animate');
    }
  });

  // Remove toggle icon and navbar upon clicking and scrolling nav links
  menuIcon.classList.remove('fa-circle-xmark');
  navbar.classList.remove('active');

  // Animation for footer on scroll
  footer.classList.toggle(
    'show-animate',
    this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight
  );
};

// Handle form submission
const scriptURL =
  'https://script.google.com/macros/s/AKfycbxFWFWbyKBydDOdTDVYJiXpgNmNUgfvylaIIH9y88563_eTKWQEGI9GEm3xLoJkdmZEyA/exec';
const form = document.forms['submit-to-google-sheet'];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then((response) => {
      console.log('Success!', response);
    })
    .catch((error) => console.error('Error!', error.message));
});

// Send email function
function emailSend() {
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let message = document.getElementById('message').value;

  Email.send({
    Host: 'smtp.elasticemail.com',
    Username: 'ianprincedumanhug@gmail.com',
    Password: '8046FDC6DB86D08327C557CDDC1E878A0BE7',
    To: 'ianprincedumanhug@gmail.com',
    From: 'ianprincedumanhug@gmail.com',
    Subject: 'Appointment',
    Body: `Name: ${name} <br>
           Email: ${email} <br>
           Message: ${message}`,
  }).then((message) => {
    if (message === 'OK') {
      Swal.fire({
        title: 'Successful!',
        text: 'Message sent successfully!',
        icon: 'success',
      });
      form.reset();
    } else {
      console.error('Error sending email:', message);
    }
  });
}
