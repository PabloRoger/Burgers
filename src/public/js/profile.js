 document.addEventListener('DOMContentLoaded', () => {
  const URL = window.location.pathname;
  const USER_ID = URL.split("/").pop();

  fetch(`/api/v1/auth/user/${USER_ID}`)
    .then(response => response.json())
    .then(data => {
      const user = data;

      let uploadOption = document.getElementById("upload-option");

      if (user.picture) {
        uploadOption.innerHTML = `
          <img src="${user.picture}" alt="profile picture" class="profile-picture">
          <div class="form-group">
            <label for="profilePicture">Nueva foto de perfil</label>
            <input type="file" id="profilePicture" class="form-control-file">
          </div>
        `;
      } else {
        uploadOption.innerHTML = `
          <img src="/img/profile.png" alt="profile picture" class="profile-picture">
          <div class="form-group">
            <label for="profilePicture">Foto de perfil</label>
            <input type="file" id="profilePicture" class="form-control-file">
          </div>
        `;
      }

      document.getElementById("user-name").value = user.username;
      document.getElementById("user-email").value = user.email;
    })
});


const form = document.getElementById("profileForm");
form.addEventListener("submit", function(event) {
  const URL = window.location.pathname;
  const USER_ID = URL.split("/").pop();
  event.preventDefault();

  const profilePicture = document.getElementById("profilePicture").value || null;
  const username = document.getElementById("user-name").value;
  const email = document.getElementById("user-email").value;
  const password = document.getElementById("password").value;
  const newPassword = document.getElementById("newPassword").value;

  const userSchema = {
    user_id: USER_ID,
    username: username,
    email: email,
    picture: profilePicture,
    password: password, // Enviar la contraseña actual al servidor
    new_password: newPassword // Enviar la nueva contraseña al servidor
  };

  fetch(`/api/v1/auth/user/update/${USER_ID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userSchema)
  })
    .then(response => {
      console.log("Datos enviados correctamente: ", response);
    })
    .catch(error => {
      console.error("Error al enviar los datos:", error);
    });
});
