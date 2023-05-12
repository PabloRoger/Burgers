document.addEventListener('DOMContentLoaded', () => {
  const selectAmount = document.getElementById("filter-amount");
  const selectDifficulty = document.getElementById("filter-difficulty");
  const selectNumIngredients = document.getElementById("filter-num-ingredients");
  const selectIngredients = document.getElementById("filter-ingredients");

  selectAmount.addEventListener("change", () => {
    const amountForShow = parseInt(selectAmount.value);
    applyFilters(amountForShow);
  });

  selectDifficulty.addEventListener("change", () => {
    applyFilters();
  });

  selectNumIngredients.addEventListener("change", () => {
    applyFilters();
  });

  selectIngredients.addEventListener("change", () => {
    applyFilters();
  });

  function applyFilters(amountForShow) {
    let numBurgers = amountForShow || 10;
    const difficulty = parseInt(selectDifficulty.value) || "";
    const numIngredients = selectNumIngredients.value;
    let selectedIngredients = selectIngredients.value;

    selectedIngredients = selectedIngredients.charAt(0).toUpperCase() + selectedIngredients.slice(1);
    console.log(selectedIngredients);

    fetch('/api/v1/ranking')
      .then((response) => response.json())
      .then((data) => {
        Promise.all(
          data.slice(0, numBurgers).map((burger) =>
            fetch(`/api/v1/burger/${burger.burger_id}`)
              .then((response) => response.json())
          )
        )
          .then((burgerDetails) => {
            let filteredBurgers = burgerDetails;

            if (difficulty !== "") { filteredBurgers = filterByDifficulty(filteredBurgers, difficulty); }

            if (numIngredients !== "") { filteredBurgers = filterByNumIngredients(filteredBurgers, numIngredients); }

            if (selectedIngredients.length > 0) { filteredBurgers = filterByIngredients(filteredBurgers, selectedIngredients); }

            renderTable(filteredBurgers);
          })
          .catch((error) => {
            console.error('Error al obtener los detalles de las hamburguesas: ', error);
          });
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del ranking: ', error);
      });
  }

  function filterByDifficulty(burgers, difficulty) {
    return burgers.filter((burger) => burger.difficulty === difficulty);
  }

  function filterByNumIngredients(burgers, numIngredients) {
    return burgers.filter((burger) => {
      const allIngredients = getAllIngredients(burger);
      const ingredientCount = allIngredients.length;

      if (numIngredients === "under-five") {
        return ingredientCount < 5;
      } else if (numIngredients === "between-five-ten") {
        return ingredientCount >= 5 && ingredientCount <= 10;
      } else if (numIngredients === "more-ten") {
        return ingredientCount > 10;
      }
      return true;
    });
  }

  function filterByIngredients(burgers, selectedIngredients) {
    return burgers.filter((burger) => {
      const ingredients = getAllIngredients(burger);
      return ingredients.includes(selectedIngredients);
    });
  }

  function getAllIngredients(burger) {
    const allIngredients = [];
    const ingredientTypes = ['bread', 'sauce', 'meat', 'cheese', 'toppings', 'vegetable'];

    ingredientTypes.forEach((ingredientType) => {
      const ingredients = burger[`${ingredientType}_type`].split(',');
      allIngredients.push(...ingredients);
    });

    return allIngredients;
  }

  // DISPLAY TABLE
  function renderTable(burgers) {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    burgers.forEach((burger, index) => {
      const allIngredients = getAllIngredients(burger);
      const ingredientCount = allIngredients.length;

      const difficulties = {
        1: 'Fácil',
        2: 'Media',
        3: 'Difícil'
      };

      const difficulty = difficulties[burger.difficulty] || 'Fácil';


      var row = document.createElement("tr");
      row.innerHTML = `
          <td>${index + 1}</td>
          <td>${burger.burger_name}</td>
          <td>${difficulty}</td>
          <td>${ingredientCount}</td>
          <td>${allIngredients.join(", ")}</td>
        `;

      tbody.appendChild(row);
    });
  }

  applyFilters();
});