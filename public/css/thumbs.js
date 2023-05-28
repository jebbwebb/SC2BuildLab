const thumbsUpButton = document.getElementById('thumbsUpButton');

thumbsUpButton.addEventListener('click', (event) => {
  event.preventDefault();
  const form = document.getElementById('ratingForm');
  form.submit();
  thumbsUpButton.classList.toggle('rated');
});
