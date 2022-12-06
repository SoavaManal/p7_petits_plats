import recipes from "../data/recipes.js";
import {
  displayData,
  displayIngredient,
  displayApp,
  displayUst,
} from "./display.js";

// varriables
const main = document.querySelector("#main");
const search = document.querySelector("#rechercher-une-recette");
const tag_search = document.querySelector("#search_barre");
const mot_cle = document.querySelector("#tag");
const select_igr = document.querySelector("#select_igr");
const select_ust = document.querySelector("#select_ust");
const select_app = document.querySelector("#select_apr");

// function
const getIngredients = async () => {
  let tab = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((igd) => {
      let uppercase_igd = igd.ingredient.toUpperCase();

      if (!tab.includes(uppercase_igd)) {
        tab.push(uppercase_igd);
      }
    });
  });
  return tab;
};

const getUstensiles = async () => {
  let tab = [];
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ust) => {
      let uppercase_ust = ust.toUpperCase();
      if (!tab.includes(uppercase_ust)) {
        tab.push(uppercase_ust);
      }
    });
  });
  return tab;
};

const getAppareil = async () => {
  let tab = [];
  recipes.forEach((recipe) => {
    let uppercase_app = recipe.appliance.toUpperCase();
    if (!tab.includes(uppercase_app)) {
      tab.push(uppercase_app);
    }
  });
  return tab;
};

const init = async () => {
  displayData(recipes);
  const tab1 = await getIngredients();
  await displayIngredient(tab1);
  const tab2 = await getUstensiles();
  await displayUst(tab2);
  const tab3 = await getAppareil();
  await displayApp(tab3);
};
init();

// Search with "for"
const searchPrincipale = (tag) => {
  let recipes_try = [];
  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ingredients.length; j++) {
      if (
        recipes[i].ingredients[j].ingredient
          .toLocaleLowerCase()
          .includes(tag.toLowerCase())
      ) {
        if (!recipes_try.includes(recipes[i])) {
          recipes_try.push(recipes[i]);
        }
      }
    }
    if (recipes[i].name.toLocaleLowerCase().includes(tag.toLowerCase())) {
      if (!recipes_try.includes(recipes[i])) {
        recipes_try.push(recipes[i]);
      }
    }
    if (
      recipes[i].description.toLocaleLowerCase().includes(tag.toLowerCase())
    ) {
      if (!recipes_try.includes(recipes[i])) {
        recipes_try.push(recipes[i]);
      }
    }
  }
  console.log(recipes_try);
  main.innerHTML = "";
  if (recipes_try.length > 0) {
    displayData(recipes_try);
  } else {
    main.innerHTML = `<div><p class='text-danger'> Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », etc.</div>`;
  }
  return recipes_try;
};

// addEventListener

// lancer la recherche en click sur la loop
search.addEventListener("click", () => {
  if (tag_search.value.length > 2) {
    searchPrincipale(tag_search.value);
  } else {
    alert("Veuillez entrer au moins 3 charactéres");
    tag_search.value = "";
  }
});
// lancer la recherche pour chaque nouveau caractéres
tag_search.addEventListener("input", () => {
  if (tag_search.value.length > 2) {
    searchPrincipale(tag_search.value);
  }
});

let array = [];
let tag = [];
let array_igr = [];
let array_ust = [];
let array_app = [];

select_igr.addEventListener("change", (e) => {
  tag.push(e.target.value);

  mot_cle.innerHTML += `<div class="btn btn-primary m-1">
      ${e.target.value}<span class="close"><i class="bi bi-x-circle"></i><span></div>`;

  const btnClose = document.querySelector(".close");
  for (let t of tag) {
    btnClose.addEventListener("click", () => {
      tag.splice(t);
    });
  }
  console.log(tag);

  for (let recipe of recipes) {
    for (let igr of recipe.ingredients) {
      for (let t = 0; t < tag.length; t++) {
        if (igr.ingredient == tag[t]) {
          array.push(recipe);
        }
      }
    }
  }
  console.log(array);
  for (let l = 0; l < array.length; l++) {
    if (array[l].appliance !== tag && !array_app.includes(array[l].appliance)) {
      array_app.push(array[l].appliance);
    }
    for (let m = 0; m < array[l].ingredients.length; m++) {
      if (!array_igr.includes(array[l].ingredients[m].ingredient)) {
        array_igr.push(array[l].ingredients[m].ingredient);
      }
    }
    for (let n = 0; n < array[l].ustensils.length; n++) {
      if (!array_ust.includes(array[l].ustensils[n])) {
        array_ust.push(array[l].ustensils[n]);
      }
    }
  }
  console.log(array_app);
  main.innerHTML = "";
  displayData(array);
  select_igr.innerHTML = "";
  select_ust.innerHTML = "";
  select_app.innerHTML = "";
  displayIngredient(array_igr);
  displayUst(array_ust);
  displayApp(array_app);
});

select_ust.addEventListener("change", (e) => {
  tag.push(e.target.value);

  mot_cle.innerHTML += `<dicv class="btn btn-danger m-1">
  ${e.target.value}<i class="bi bi-x-circle"></i></div>`;

  console.log(tag);
  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ustensils.length; j++) {
      for (let t of tag) {
        if (recipes[i].ustensils[j].toLowerCase().includes(t.toLowerCase())) {
          array.push(recipes[i]);
        }
      }
    }
  }
  for (let l = 0; l < array.length; l++) {
    if (array[l].appliance !== tag && !array_app.includes(array[l].appliance)) {
      array_app.push(array[l].appliance);
    }
    for (let m = 0; m < array[l].ingredients.length; m++) {
      if (!array_igr.includes(array[l].ingredients[m].ingredient)) {
        array_igr.push(array[l].ingredients[m].ingredient);
      }
    }
    for (let n = 0; n < array[l].ustensils.length; n++) {
      if (!array_ust.includes(array[l].ustensils[n])) {
        array_ust.push(array[l].ustensils[n]);
      }
    }
  }
  console.log(array_app);
  main.innerHTML = "";
  displayData(array);
  select_igr.innerHTML = "";
  select_ust.innerHTML = "";
  select_app.innerHTML = "";
  displayIngredient(array_igr);
  displayUst(array_ust);
  displayApp(array_app);
});

select_app.addEventListener("change", (e) => {
  let tag = e.target.value;

  mot_cle.innerHTML += `<button class="btn btn-success m-1">
  ${tag}<i class="bi bi-x-circle"></i></button>`;

  console.log(tag);
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].appliance.toLowerCase().includes(tag.toLowerCase())) {
      array.push(recipes[i]);
    }
  }
  for (let l = 0; l < array.length; l++) {
    if (array[l].appliance !== tag && !array_app.includes(array[l].appliance)) {
      array_app.push(array[l].appliance);
    }
    for (let m = 0; m < array[l].ingredients.length; m++) {
      if (!array_igr.includes(array[l].ingredients[m].ingredient)) {
        array_igr.push(array[l].ingredients[m].ingredient);
      }
    }
    for (let n = 0; n < array[l].ustensils.length; n++) {
      if (!array_ust.includes(array[l].ustensils[n])) {
        array_ust.push(array[l].ustensils[n]);
      }
    }
  }
  console.log(array_app);
  main.innerHTML = "";
  displayData(array);
  select_igr.innerHTML = "";
  select_ust.innerHTML = "";
  select_app.innerHTML = "";
  displayIngredient(array_igr);
  displayUst(array_ust);
  displayApp(array_app);
});

// input
const input_igr = document.querySelector("#menu1");
input_igr.addEventListener("input", (e) => {
  console.log(e.target.value);
});
