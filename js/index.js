//html form element to display cars
const result = document.getElementById("result"); 

//shows active car listings  
function showResults(carData){
    result.innerHTML = "";
    if(carData.length === 0) {
    result.innerHTML = "<p> No results found. Search again. </p>";
    return;
  }
  //creates card for display of each avaliable car 
  carData.forEach((car) => {
 const createCard = document.createElement("div");
 createCard.innerHTML = `<div class="car-card">
 <img src="./images/${car.img}" alt="${car.make}${car.model}" />
 <div class="card-header">
 <h2> ${car.year} ${car.make} ${car.model}  </h2>
 </div>
 <div class ="features">
 <span> Color: ${car.color} </span>
 <span> Price: $${car.price} </span>
 <span> Mileage: ${car.mileage} </span>
 <span> Mileage: ${car.gasMileage} </span> 
 </div>
 </div>
 `;
 result.appendChild(createCard);
});
}

//select options 
function updateSelectOptions(filteredCars) {
    // Color and make select variables 
    const colorSelect = document.getElementById("color");
    const makeSelect = document.getElementById("make");

    const uniqueColors = [...new Set(filteredCars.map(car => car.color))];
    const uniqueMakes = [...new Set(filteredCars.map(car => car.make))];

    // create option elements for color and make selection
    const createOptions = (selectElement, optionsArray) => {
        selectElement.innerHTML = '<option value="">Select...</option>';
        optionsArray.forEach(optionValue => {
            const option = document.createElement("option");
            option.value = optionValue;
            option.textContent = optionValue;
            selectElement.appendChild(option);
        });
    };
     createOptions(colorSelect, uniqueColors);
     createOptions(makeSelect, uniqueMakes);
}

//filters car listing data 
function filterData(){
    //stores selection of make and color in an array
     const colors = Array.from(
       document.getElementById("color").selectedOptions
     ).map(option => option.value);
     const make = Array.from(
       document.getElementById("make").selectedOptions
     ).map(option => option.value);

     const minYear = parseInt(document.getElementById("min-year").value, 10);
     const maxYear = parseInt(document.getElementById("max-year").value, 10);
     const minPrice = parseFloat(document.getElementById("min-price").value);
     const maxPrice = parseFloat(document.getElementById("max-price").value);
     const minMiles = parseInt(document.getElementById("min-range").value, 10);
     const maxMiles = parseInt(document.getElementById("max-range").value, 10); 
    
    const filteredCars= usedCars.filter((car) => {
      return (
        (colors.length === 0 || colors.includes(car.color)) &&
        (make.length === 0 || make.includes(car.make)) &&
        (isNaN(minYear) || car.year >= minYear) &&
        (isNaN(maxYear) || car.year <= maxYear) &&
        (isNaN(minPrice) || car.price >= minPrice) &&
        (isNaN(maxPrice) || car.price <= maxPrice) &&
        (isNaN(minMiles) || car.mileage >= minMiles) &&
        (isNaN(maxMiles) || car.mileage <= maxMiles)
      );
    });
     updateSelectOptions(filteredCars);
  return filteredCars;
}

//event handler for filter button 
document.getElementById("filter-results").addEventListener("click", (e) => {
    e.preventDefault();
  const filterCars = filterData();
  showResults(filterCars);
});
  
//clear filter results 
function clearResults(){
document.getElementById("filter-items").reset();
showResults(usedCars);
updateSelectOptions(usedCars);
}

//event handler for clear button 
document.getElementById("clear-results").addEventListener("click", (e) => {
e.preventDefault();
clearResults();
});

//unfiltered list of cars 
showResults(usedCars);
   




