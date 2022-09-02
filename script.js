const loadMeals = (searchText, dataLimit) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showMeals(data.meals, dataLimit));
}
const showMeals = (meals, dataLimit) => {
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';

    const warningMessage = document.getElementById('warning-message');
    console.log(meals)
    if (meals === null) {
        warningMessage.classList.remove('d-none');
        // loader end
        toggleSpinner(false);
        return;
    }
    else {
        warningMessage.classList.add('d-none');
    }
    const btnShowAll = document.getElementById('show-all');
    if (dataLimit && meals !== null) {
        meals = meals.slice(0, dataLimit);
        btnShowAll.classList.remove('d-none');
    }
    else {
        btnShowAll.classList.add('d-none');
    }
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                    <button onclick="loadMeal(${meal.idMeal})" class="btn btn-warning"  data-bs-toggle="modal" data-bs-target="#mealDetailsModal">Show Details</button>
                </div>
            </div>
            `;
        mealsContainer.appendChild(div);
    });
    // loader end
    toggleSpinner(false);
}
loadMeals('fish');

const processSearch = (dataLimit) => {
    // loader start
    toggleSpinner(true);
    const searchInputField = document.getElementById('search-input-field');
    const searchValue = searchInputField.value;
    loadMeals(searchValue, dataLimit);
}

// show all button 
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})
// search by meal [button]
document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(3);
});

// search by meal [enter key]
document.getElementById('search-input-field').addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        processSearch(3);
    }
});

const loadMeal = id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showMeal(data.meals));
}
const showMeal = meal => {
    meal.forEach(meal => {
        const mealTitle = document.getElementById('mealDetailsModalLabel');
        mealTitle.innerText = meal.strMeal;

        const mealBody = document.getElementById('meal-details-body-modal');
        mealBody.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="">
        <h4>Category: ${meal.strCategory}</h4>
        <h4>Country: ${meal.strArea}</h4>
        <p>${meal.strInstructions}</p>
        `;
    });
}

// loader
const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}