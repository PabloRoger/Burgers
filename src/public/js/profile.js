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
    });

  // Manejar eventos de clic en las pestañas
  const profileTab = document.getElementById("profile-tab");
  const burgersTab = document.getElementById("burgers-tab");

  profileTab.addEventListener("click", () => {
    showUserProfile();
  });

  burgersTab.addEventListener("click", () => {
    showUserBurgers(USER_ID);
  });
});

function showUserProfile() {
  const profileTab = document.getElementById("profile-tab");
  const burgersTab = document.getElementById("burgers-tab");
  const profileContent = document.getElementById("profile");
  const burgersContent = document.getElementById("burgers");

  profileTab.classList.add("active");
  burgersTab.classList.remove("active");
  profileContent.classList.add("show", "active");
  burgersContent.classList.remove("show", "active");
}

function showUserBurgers(USER_ID) {
  const profileTab = document.getElementById("profile-tab");
  const burgersTab = document.getElementById("burgers-tab");
  const profileContent = document.getElementById("profile");
  const burgersContent = document.getElementById("burgers");

  profileTab.classList.remove("active");
  burgersTab.classList.add("active");
  profileContent.classList.remove("show", "active");
  burgersContent.classList.add("show", "active");

  // Obtener la lista de hamburguesas del usuario y mostrarlas
  fetch(`/api/v1/burger/user/${USER_ID}`)
  .then(response => response.json())
  .then(data => {
    const burgersList = document.getElementById("burgersList");
    burgersList.innerHTML = ""; // Limpiar el contenido existente

    if (data.length > 0) {
      const row = document.createElement("div");
      row.classList.add("row");

      data.forEach(burger => {
        const column = document.createElement("div");
        column.classList.add("col-sm-4", "mb-4");

        const burgerCard = document.createElement("div");
        burgerCard.classList.add("card", "burger-card");

        const burgerImageWrapper = document.createElement("div");
        burgerImageWrapper.classList.add("image-wrapper");

        const burgerImage = document.createElement("img");
        burgerImage.classList.add("card-img-top");
        burgerImage.src = `/img/user_burger/${burger.picture}`;
        burgerImage.alt = burger.burger_name;

        burgerImageWrapper.appendChild(burgerImage);

        const burgerCardBody = document.createElement("div");
        burgerCardBody.classList.add("card-body");

        const burgerTitle = document.createElement("h5");
        burgerTitle.classList.add("card-title");
        burgerTitle.textContent = burger.burger_name;

        burgerCardBody.appendChild(burgerTitle);

        burgerCard.appendChild(burgerImageWrapper);
        burgerCard.appendChild(burgerCardBody);

        const burgerLink = document.createElement("a");
        burgerLink.href = `/burger/${burger.burger_id}`;
        burgerLink.appendChild(burgerCard);

        column.appendChild(burgerLink);
        row.appendChild(column);
      });

      burgersList.appendChild(row);
    } else {
      // Mostrar un mensaje si no hay hamburguesas
      burgersList.textContent = "No se encontraron hamburguesas creadas.";
    }
  })
  .catch(error => console.error("Error al obtener la lista de hamburguesas:", error));

}



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
