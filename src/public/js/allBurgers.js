document.addEventListener("DOMContentLoaded", () => {
  // get all the burgers
  fetch("/api/v1/burgers")
    .then(response => response.json())
    .then(data => {
      const burgersList = document.getElementById("burgersList");
      burgersList.innerHTML = ""; // Clear the list

      if (data.length > 0) {
        // Remove the first 9 burgers (they are from restaurants)
        const filteredData = data.slice(9);

        const row = document.createElement("div");
        row.classList.add("row");

        filteredData.forEach(burger => {
          // get the author of the burger
          fetch(`/api/v1/auth/user/${burger.user_id}`)
            .then(response => response.json())
            .then(author => {
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

              const burgerAuthor = document.createElement("p");
              burgerAuthor.classList.add("card-text");
              burgerAuthor.textContent = `Autor: ${author.username}`;

              burgerCardBody.appendChild(burgerTitle);
              burgerCardBody.appendChild(burgerAuthor);

              burgerCard.appendChild(burgerImageWrapper);
              burgerCard.appendChild(burgerCardBody);

              const burgerLink = document.createElement("a");
              burgerLink.href = `/burger/${burger.burger_id}`;
              burgerLink.appendChild(burgerCard);

              column.appendChild(burgerLink);
              row.appendChild(column);
            })
            .catch(error => console.error("Error al obtener la información del autor:", error));
        });

        burgersList.appendChild(row);
      } else {
        // display a message if there are no burgers
        burgersList.textContent = "No se encontraron hamburguesas disponibles.";
      }
    })
    .catch(error => console.error("Error al obtener la lista de hamburguesas:", error));
});
