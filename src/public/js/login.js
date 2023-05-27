// get the error message from the URL
const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get('error');

if (error) {
  // display the error message
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = error;
}
