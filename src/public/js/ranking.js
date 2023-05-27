document.addEventListener('DOMContentLoaded', () => {
  const selectAmount = document.getElementById('filter-amount');
  const selectDifficulty = document.getElementById('filter-difficulty');
  const selectNumIngredients = document.getElementById('filter-num-ingredients');
  const selectIngredients = document.getElementById('filter-ingredients');

  // Apply filters when the selects change
  selectAmount.addEventListener('change', () => {
    const amountForShow = parseInt(selectAmount.value);
    applyFilters(amountForShow);
  });

  selectDifficulty.addEventListener('change', () => {
    applyFilters();
  });

  selectNumIngredients.addEventListener('change', () => {
    applyFilters();
  });

  selectIngredients.addEventListener('change', () => {
    applyFilters();
  });


  // Get the text from selected option
  const selectIngredient = (ingredient) => {
    const select = document.getElementById(ingredient);
    const selectedOption = select.options[select.selectedIndex];
    const ingredient_type = selectedOption.textContent;
    return ingredient_type;
  }

  // Function to apply filters
  function applyFilters(amountForShow) {
    let numBurgers = amountForShow || 10;
    const difficulty = parseInt(selectDifficulty.value) || '';
    const numIngredients = selectNumIngredients.value;
    let selectedIngredients = selectIngredient('filter-ingredients');

    // Filter if the default option is selected (Ingredientes) set to empty string
    if (selectedIngredients === 'Ingredientes') selectedIngredients = '';

    // Capitalize the first letter of the selected ingredient
    selectedIngredients = selectedIngredients.charAt(0).toUpperCase() + selectedIngredients.slice(1);

    // Get the burgers from the API
    fetch('/api/v1/ranking')
      .then((response) => response.json())
      .then((data) => {
        /**
         * Promise.all() takes an array of promises and returns a single promise
         * that resolves to an array of the results of the input promises.
         */
        Promise.all(
          data.slice(0, numBurgers).map((burger) =>
            fetch(`/api/v1/burger/${burger.burger_id}`)
              .then((response) => response.json())
          )
        )
          .then((burgerDetails) => {
            let filteredBurgers = burgerDetails;

            // if difficulty is not empty, filter by difficulty
            if (difficulty !== '')  filteredBurgers = filterByDifficulty(filteredBurgers, difficulty);
            // if numIngredients is not empty, filter by numIngredients
            if (numIngredients !== '') filteredBurgers = filterByNumIngredients(filteredBurgers, numIngredients);
            // if selectedIngredients is not empty, filter by selectedIngredients
            if (selectedIngredients.length > 0) filteredBurgers = filterByIngredients(filteredBurgers, selectedIngredients);

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
    // This filter is not necessary if the difficulty is not selected
    return burgers.filter((burger) => burger.difficulty === difficulty);
  }

  // Filter by number of ingredients
  function filterByNumIngredients(burgers, numIngredients) {
    return burgers.filter((burger) => {
      const allIngredients = getAllIngredients(burger);
      const ingredientCount = allIngredients.length;

      if (numIngredients === 'under-five') {
        return ingredientCount < 5;
      } else if (numIngredients === 'between-five-ten') {
        return ingredientCount >= 5 && ingredientCount <= 10;
      } else if (numIngredients === 'more-ten') {
        return ingredientCount > 10;
      }
      return true;
    });
  }

  function filterByIngredients(burgers, selectedIngredients) {
    // This filter is not necessary if the selectedIngredients is not selected
    return burgers.filter((burger) => {
      // Get all ingredients from the burger
      const ingredients = getAllIngredients(burger);
      // Return true if the selectedIngredients is included in the ingredients array
      return ingredients.includes(selectedIngredients);
    });
  }

  function getAllIngredients(burger) {
    const allIngredients = [];
    const ingredientTypes = ['bread', 'sauce', 'meat', 'cheese', 'toppings', 'vegetable'];

    // Get all ingredients from the burger filtering by ingredient type
    ingredientTypes.forEach((ingredientType) => {
      const ingredients = burger[`${ingredientType}_type`].split(',');

      // If the burger has ingredients, add them to the array
      if(ingredients[0] !== '') {
        ingredients.forEach((ingredient) => {
          let ingredientName = removeSpaces(ingredient);
          allIngredients.push(ingredientName);
        });

      }
    });

    return allIngredients;
  }

  function removeSpaces(string) {
    const exceptions = {
      'Pan normal': 'Pan normal',
      'Pan brioche': 'Pan brioche',
      'Pan integral': 'Pan integral',
      'Cebolla crujiente': 'Cebolla crujiente',
      'Queso azul': 'Queso azul',
    };

    // Return exception if exists
    if (exceptions[string]) { return exceptions[string]; }

    // Remove spaces and return if no exception exists
    return string.trim().replace(/\s+/g, '');
  }

  // DISPLAY TABLE
  function renderTable(burgers) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    burgers.forEach((burger, index) => {
      const allIngredients = getAllIngredients(burger);
      const ingredientCount = allIngredients.length;

      const difficulties = {
        1: 'Fácil',
        2: 'Media',
        3: 'Difícil'
      };

      const difficulty = difficulties[burger.difficulty] || 'Fácil';


      var row = document.createElement('tr');
      row.innerHTML = `
          <td>${index + 1}</td>
          <td><a href='/burger/${burger.burger_id}'>${burger.burger_name}</a></td>
          <td>${difficulty}</td>
          <td>${ingredientCount}</td>
          <td>${allIngredients.join(', ')}</td>
        `;

      tbody.appendChild(row);
    });
  }

  applyFilters();
});