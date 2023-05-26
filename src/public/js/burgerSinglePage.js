document.addEventListener('DOMContentLoaded', () => {
  const url = window.location.pathname;
  var burgerId = url.split("/").pop();

  fetch(`/api/v1/burger/${burgerId}`)
    .then((response) => response.json())
    .then((data) => {
      const burger = data;
      renderBurger(burger);
    })
    .catch((error) => {
      console.error('Error al obtener los detalles de la hamburguesa: ', error);
    });

  // GET ALL INGREDIENTS
  const getAllIngredients = (burger) => {
    const allIngredients = [];
    const ingredientTypes = ['bread', 'sauce', 'meat', 'cheese', 'toppings', 'vegetable'];

    ingredientTypes.forEach((ingredientType) => {
      const ingredients = burger[`${ingredientType}_type`].split(',');

      // If the first element is not empty, push all the ingredients
      if (ingredients[0] !== '') allIngredients.push(...ingredients);
    });

    return allIngredients;
  }

  // SET DIFFICULTY
  const setDifficulty = (difficulty) => {
    const difficulties = {
      1: 'Fácil',
      2: 'Media',
      3: 'Difícil'
    };

    return difficultyToReturn = difficulties[difficulty] || 'Fácil';
  }


  function renderBurger(burger) {
    // GET ELEMENTS
    const burgerName = document.getElementById("burger-name");
    const burgerImg = document.getElementById("burger-img");
    const burgerAuthor = document.getElementById("burger-author");
    const burgerDifficulty = document.getElementById("burger-difficulty");
    const burgerNumIngredients = document.getElementById("burger-num-ingredients");
    const burgerIngredientsList = document.getElementById("burger-ingredients-list");
    const burgerTimeToPrepare = document.getElementById("burger-time");
    const burgerDescription = document.getElementById("burger-description");

    // GET BURGER DETAILS
    const allIngredients = getAllIngredients(burger);
    const difficulty = setDifficulty(burger.difficulty);

    fetch(`/api/v1/auth/user/${burger.user_id}`)
      .then((response) => response.json())
      .then((data) => {
        const user = data;
        const username = user.username;
        // First letter to uppercase
        const usernameCapitalized = username.charAt(0).toUpperCase() + username.slice(1);
        burgerAuthor.innerText = usernameCapitalized;
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del usuario: ', error);
      });

    // DISPLAY BURGER DETAILS
    burgerName.innerText = burger.burger_name;
    burgerImg.setAttribute("src", `/img/user_burger/${burger.picture}`);
    burgerDifficulty.innerText = difficulty;
    burgerNumIngredients.innerText = allIngredients.length;
    burgerTimeToPrepare.innerText = `${burger.time_to_prepare} minutos`;
    burgerDescription.innerText = burger.description;

    allIngredients.forEach((ingredient, index) => {
      // LIST ITEM
      const li = document.createElement("li");
      li.className = "list-group-item";

      // CHECKBOX
      const input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("id", ingredient.concat(index));
      input.setAttribute("value", "");
      input.className = "form-check-input";
      input.classList.add("me-2");

      // LABEL
      const label = document.createElement("label");
      label.setAttribute("for", ingredient.concat(index));
      label.className = "form-check-label";
      label.innerText = ingredient.toLowerCase();

      // APPEND ELEMENTS
      burgerIngredientsList.appendChild(li);
      li.appendChild(input);
      li.appendChild(label);
    });


    // FAVORITE HEART
    var heartIcon = document.getElementById("hearth-fav");

    heartIcon.addEventListener("click", function () {
      heartIcon.id === "hearth-fav" ? heartIcon.id = "hearth-fav-active" : heartIcon.id = "hearth-fav";
    });
  }
});