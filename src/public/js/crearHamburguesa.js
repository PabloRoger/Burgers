document.addEventListener('DOMContentLoaded', () => {
  const ingredientTypes = [
    { type: 'Topping', id: 'topping-list', imageId: 'topping-image' },
    { type: 'Cheese', id: 'cheese-list', imageId: 'cheese-image' },
    { type: 'Meat', id: 'meat-list', imageId: 'meat-image' },
    { type: 'Vegetable', id: 'vegetable-list', imageId: 'vegetable-image' },
    { type: 'Sauce', id: 'sauce-list', imageId: 'sauce-image' }
  ];

  let imageOffset = 220; // Variable for the vertical offset of the images

  ingredientTypes.forEach(ingredientType => {
    const addButton = document.getElementById(`add-${ingredientType.type.toLowerCase()}`);
    let counter = 0;

    addButton.addEventListener('click', (event) => {
      event.preventDefault();

      if (event.target.classList.contains('remove-ingredient')) {
        // Remove the select
        const selectToRemove = event.target.parentElement.querySelector('select');
        selectToRemove.parentElement.remove();
        counter--;
        addButton.style.display = 'block';
      } else {
        if (counter < 1) {
          /**
           * Add the select and the remove button
           */
          const ingredientList = document.getElementById(ingredientType.id);
          const newSelect = document.createElement('select');
          newSelect.classList.add('form-control');
          newSelect.setAttribute('id', ingredientType.type.toLowerCase());

          const defaultOption = document.createElement('option');
          defaultOption.innerHTML = `Seleccione ingrediente`;

          /**
           * Fetch the ingredients from the API
           * and add them to the select
           */
          fetch('/api/v1/ingredients')
            .then(response => response.json())
            .then(data => {
              const ingredients = data.filter(ingredient => ingredient.ingredient_type === ingredientType.type);

              ingredients.forEach(ingredient => {
                const option = document.createElement('option');
                option.innerHTML = ingredient.ingredient_name;
                option.setAttribute('value', `${ingredient.ingredient_type.toLowerCase()}-${ingredient.ingredient_name.toLowerCase()}`);
                newSelect.appendChild(option);
              });
              newSelect.insertBefore(defaultOption, newSelect.firstChild);
            });

          // Add div to wrap the select and the remove button
          const newFormGroup = document.createElement('div');
          newFormGroup.classList.add('newOption');

          // Add the remove button
          const removeButton = document.createElement('button');
          removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'remove-ingredient');
          removeButton.textContent = '-';

          // Add the event listener to the remove button
          removeButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.target.parentElement.remove();
            counter--;
            addButton.style.display = 'block';
          });

          // Add the select and the remove button to the div
          newFormGroup.appendChild(removeButton);
          newFormGroup.appendChild(document.createTextNode(' '));
          newFormGroup.appendChild(newSelect);
          newFormGroup.appendChild(defaultOption);

          ingredientList.insertBefore(newFormGroup, addButton);
          newSelect.appendChild(defaultOption);

          counter++;
        }

        if (counter === 1) {
          addButton.style.display = 'none';
        }
      }
    });

    const ingredientSelect = document.getElementById(ingredientType.type.toLowerCase());
    const ingredientImage = document.getElementById(`${ingredientType.imageId}`);
    const prevImageOffset = imageOffset - 100;
    ingredientImage.style.transform = `translateY(${prevImageOffset}px)`;

    // Incrementar el desplazamiento vertical
    imageOffset += 90;

    ingredientSelect.addEventListener('change', (event) => {
      const ingredientValue = event.target.value;
      ingredientImage.src = `/img/create_burger/${ingredientValue}.png`;
    });
  });
});

window.addEventListener('submit', (event) => {
  event.preventDefault();

  const selectIngredient = (ingredient) => {
    const select = document.getElementById(ingredient);
    const selectedOption = select.options[select.selectedIndex];
    const ingredient_type = selectedOption.textContent;
    return ingredient_type;
  }

  const burger_name = document.getElementById('burger-name').value;

  const bread_type = selectIngredient('bread');
  const meat_type = selectIngredient('meat');
  const cheese_type = selectIngredient('cheese');
  const sauce_type = selectIngredient('sauce');
  const vegetable_type = selectIngredient('vegetable');
  const toppings_type = selectIngredient('topping');

  const description = document.getElementById('description').value;
  const picture = document.getElementById('picture').files[0];
  const time_to_prepare = document.getElementById('time-to-prepare').value;
  const difficulty = document.querySelector('input[name="difficulty"]:checked').value;

  let burger = {
    burger_name : burger_name,
    bread_type : bread_type,
    meat_type : meat_type,
    cheese_type : cheese_type,
    sauce_type : sauce_type,
    vegetable_type : vegetable_type,
    toppings_type : toppings_type,
    description : description,
    picture : picture, // AÑADIR
    time_to_prepare : time_to_prepare,
    difficulty : difficulty,
  }

  console.log(burger);

});