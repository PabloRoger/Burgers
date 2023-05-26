// Obtener el mensaje de error de la URL de redirección
const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get('error');

if (error) {
  // Mostrar el mensaje de error en la página
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = error;
}
