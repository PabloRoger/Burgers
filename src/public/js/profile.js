document.addEventListener('DOMContentLoaded', () => {
  // get the user ID from the URL
  const URL = window.location.pathname;
  const USER_ID = URL.split("/").pop();

  fetch(`/api/v1/auth/user/${USER_ID}`)
    .then(response => response.json())
    .then(data => {
      const user = data;

      let uploadOption = document.getElementById("upload-option");

      // if the user has a profile picture, show it
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

  // handle the tabs
  const profileTab = document.getElementById("profile-tab");
  const burgersTab = document.getElementById("burgers-tab");

  profileTab.addEventListener("click", () => {
    showUserProfile();
  });

  burgersTab.addEventListener("click", () => {
    showUserBurgers(USER_ID);
  });
});

// handle the form to show the user's profile
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

// handle the form to show the user's burgers
function showUserBurgers(USER_ID) {
  const profileTab = document.getElementById("profile-tab");
  const burgersTab = document.getElementById("burgers-tab");
  const profileContent = document.getElementById("profile");
  const burgersContent = document.getElementById("burgers");

  profileTab.classList.remove("active");
  burgersTab.classList.add("active");
  profileContent.classList.remove("show", "active");
  burgersContent.classList.add("show", "active");

  // get the user's burgers
  fetch(`/api/v1/burger/user/${USER_ID}`)
  .then(response => response.json())
  .then(data => {
    const burgersList = document.getElementById("burgersList");
    burgersList.innerHTML = ""; // clear the list

    if (data.length > 0) {
      const row = document.createElement("div");
      row.classList.add("row");

      // create a card for each burger
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

        const removeButton = document.createElement("button");
        removeButton.classList.add("btn", "btn-danger", "btn-sm", "float-right");
        removeButton.textContent = "Eliminar";
        removeButton.setAttribute("onclick", `removeButton(${burger.burger_id})`);

        burgerCardBody.appendChild(burgerTitle);

        burgerCard.appendChild(burgerImageWrapper);
        burgerCard.appendChild(burgerCardBody);

        const burgerLink = document.createElement("a");
        burgerLink.href = `/burger/${burger.burger_id}`;
        burgerLink.appendChild(burgerCard);

        column.appendChild(removeButton)
        column.appendChild(burgerLink);
        row.appendChild(column);
      });

      burgersList.appendChild(row);
    } else {
      // display a message if the user has no burgers
      burgersList.textContent = "No se encontraron hamburguesas creadas.";
    }
  })
  .catch(error => console.error("Error al obtener la lista de hamburguesas:", error));

}

function removeButton (id) {
  const URL = window.location.pathname;
  const USER_ID = URL.split("/").pop();

  // ask the user if they are sure they want to delete the burger
  if (confirm("¿Estás seguro de que quieres eliminar esta hamburguesa?")) {
    fetch(`/api/v1/delete/${id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        window.location.href = `/user/${USER_ID}`;
        showUserBurgers(USER_ID);
      }
    })
    .catch(error => console.error("Error al eliminar la hamburguesa:", error));
  }
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

  if (confirm("¿Estás seguro de que quieres actualizar tus datos?")) {
    fetch(`/api/v1/auth/user/update/${USER_ID}`, {
      method: "PATCH",
      body: formData
    })
      .then(response => {
        if(response.status === 200) {
        alert("Datos actualizados correctamente");
        } else {
          alert("Error al actualizar los datos");
        }
      })
      .catch(error => {
        console.error("Error al enviar los datos:", error);
    });
  }
});

