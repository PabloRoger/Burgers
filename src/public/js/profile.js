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
          <img src="/img/user_profile/${user.picture}" alt="profile picture" class="profile-picture">
          <div class="form-group">
            <label for="profilePicture">Nueva foto de perfil</label>
            <input type="file" id="profilePicture" class="form-control-file" accept=".jpg,.jpeg">
          </div>
        `;
      } else {
        uploadOption.innerHTML = `
          <img src="/img/user_profile/user.png" alt="profile picture" class="profile-picture">
          <div class="form-group">
            <label for="profilePicture">Foto de perfil</label>
            <input type="file" id="profilePicture" class="form-control-file" accept=".jpg,.jpeg">
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

  const profilePicture = document.getElementById("profilePicture").files[0];
  const username = document.getElementById("user-name").value;
  const email = document.getElementById("user-email").value;
  const password = document.getElementById("password").value;
  const newPassword = document.getElementById("newPassword").value;


  const formData = new FormData();
  formData.append("user_id", USER_ID);
  formData.append("username", username);
  formData.append("email", email);
  formData.append("picture", profilePicture);
  formData.append("password", password);
  formData.append("new_password", newPassword);

  fetch(`/api/v1/auth/user/update/${USER_ID}`, {
    method: "PATCH",
    body: formData
  })
    .then(response => {
      console.log("Datos enviados correctamente: ", response);
    })
    .catch(error => {
      console.error("Error al enviar los datos:", error);
    });
});
