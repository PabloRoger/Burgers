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
            document.querySelector(`#nombre-ranking-${index + 1}`).textContent = burger.burger_name;
            document.querySelector(`#valoraciones-ranking-${index + 1}`).textContent = `${data[index].rating} valoraciones`;
            document.querySelector(`#ingredientes-${index + 1}`).textContent = `${ingredientCount} ingredientes`;
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