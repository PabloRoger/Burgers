document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/v1/ranking')
    .then((response) => response.json())
    .then((data) => {
      // Promise.all to wait for all the fetches to finish
      Promise.all(
        data.slice(0, 3).map((burger) =>
          fetch(`/api/v1/burger/${burger.burger_id}`)
            .then((response) => response.json())
        )
      )
        .then((burgerDetails) => {
          // Process burger details here
          burgerDetails.forEach((burger, index) => {

            // Count the ingredient
            const ingredientTypes = ['meat', 'cheese', 'sauce', 'vegetable', 'toppings'];
            let ingredientCount = 0;

            ingredientTypes.forEach((ingredientType) => {
              const ingredients = burger[`${ingredientType}_type`].split(',');
              ingredientCount += ingredients.length;
            });

            // Update the DOM
            document.querySelector(`#burger-${index + 1}`).href = `/burger/${burger.burger_id}`;

            document.querySelector(`#foto-ranking-${index + 1}`).src = `/img/user_burger/${burger.picture}`;
            document.querySelector(`#nombre-ranking-${index + 1}`).textContent = burger.burger_name;
            document.querySelector(`#valoraciones-ranking-${index + 1}`).textContent = `${data[index].rating} valoraciones`;

            document.querySelector(`#tiempo-${index + 1}`).textContent = `${burger.time_to_prepare} min`;
            document.querySelector(`#ingredientes-${index + 1}`).textContent = `${ingredientCount} ingredientes`;

            const difficulties = {
              1: 'Fácil',
              2: 'Media',
              3: 'Difícil'
            };

            // If the difficulty is not in the object, it will be 'Fácil'
            const difficulty = difficulties[burger.difficulty] || 'Fácil';
            document.querySelector(`#dificultad-${index + 1}`).textContent = difficulty;

          });
        })
        .catch((error) => {
          console.error('Error to get burger details: ', error);
        });
    })
    .catch((error) => {
      console.error('Error to get ranking details: ', error);
    }
    );
});