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
      allIngredients.push(...ingredients);
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
    const burgerDifficulty = document.getElementById("burger-difficulty");
    const burgerNumIngredients = document.getElementById("burger-num-ingredients");
    const burgerIngredientsList = document.getElementById("burger-ingredients-list");
    const burgerTimeToPrepare = document.getElementById("burger-time");
    const burgerDescription = document.getElementById("burger-description");

    // GET BURGER DETAILS
    const allIngredients = getAllIngredients(burger);
    const difficulty = setDifficulty(burger.difficulty);

    // DISPLAY BURGER DETAILS
    burgerName.innerText = burger.burger_name;
    burgerImg.setAttribute("src", `/img/${burger.picture}`);
    burgerDifficulty.innerText = difficulty;
    burgerNumIngredients.innerText = allIngredients.length;
    burgerTimeToPrepare.innerText = `${burger.time_to_prepare} minutos`;
    burgerDescription.innerText = burger.description;

    allIngredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.innerText = ingredient.toLowerCase();
      burgerIngredientsList.appendChild(li);
    });


    // FAVORITE HEART
    var heartIcon = document.getElementById("hearth-fav");

    heartIcon.addEventListener("click", function () {
      heartIcon.id === "hearth-fav" ? heartIcon.id = "hearth-fav-active" : heartIcon.id = "hearth-fav";
    });
  }
});