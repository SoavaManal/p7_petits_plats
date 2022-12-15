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

// function get ingredients
const getIngredients = async (recipes) => {
  let tab = [];
  for (let recipe of recipes) {
    for (let igr of recipe.ingredients) {
      if (!tab.includes(igr.ingredient.toUpperCase())) {
        tab.push(igr.ingredient.toUpperCase());
      }
    }
  }
  return tab;
};

// get ustensils
const getUstensiles = async (recipes) => {
  let tab = [];
  for (let recipe of recipes) {
    for (let ust of recipe.ustensils) {
      if (!tab.includes(ust.toUpperCase())) {
        tab.push(ust.toUpperCase());
      }
    }
  }

  return tab;
};

//get appliance
const getAppareil = async (recipes) => {
  let tab = [];
  for (let recipe of recipes) {
    if (!tab.includes(recipe.appliance.toUpperCase())) {
      tab.push(recipe.appliance.toUpperCase());
    }
  }

  return tab;
};

const init = async (recipes) => {
  displayData(recipes);
  const tab1 = await getIngredients(recipes);
  await displayIngredient(tab1);
  const tab2 = await getUstensiles(recipes);
  await displayUst(tab2);
  const tab3 = await getAppareil(recipes);
  await displayApp(tab3);
};
init(recipes);

// Search with "for"
const searchPrincipale = async (tag) => {
  let recipes_try = [];
  if (tag.length > 0) {
    for (let recipe of recipes) {
      for (let igr of recipe.ingredients) {
        if (igr.ingredient.toLocaleLowerCase().includes(tag.toLowerCase())) {
          if (!recipes_try.includes(recipe)) {
            recipes_try.push(recipe);
          }
        }
      }
      if (recipe.name.toLocaleLowerCase().includes(tag.toLowerCase())) {
        if (!recipes_try.includes(recipe)) {
          recipes_try.push(recipe);
        }
      }
      if (recipe.description.toLocaleLowerCase().includes(tag.toLowerCase())) {
        if (!recipes_try.includes(recipe)) {
          recipes_try.push(recipe);
        }
      }
    }
  } else if (tag.length == 0) {
    recipes_try = recipes;
  }
  main.innerHTML = "";
  if (recipes_try.length > 0) {
    ul_igr.innerHTML = "";
    ul_app.innerHTML = "";
    ul_ust.innerHTML = "";
    init(recipes_try);
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
  searchPrincipale(tag_search.value);
});

//input ingredient
const inputIgr = document.querySelector("#input_igr");
const ul_igr = document.querySelector("#list_igr");
inputIgr.addEventListener("input", async (e) => {
  const tab1 = await getIngredients(recipes);
  let tab2 = [];
  if (e.target.value.length > 2) {
    for (let i = 0; i < tab1.length; i++) {
      if (
        tab1[i].includes(e.target.value.toUpperCase()) &&
        !tab2.includes(tab1[i])
      ) {
        tab2.push(tab1[i]);
      }
    }
  } else {
    tab2 = tab1;
  }
  ul_igr.innerHTML = "";
  displayIngredient(tab2);
});

//input appliance
const inputApp = document.querySelector("#input_app");
const ul_app = document.querySelector("#list_app");
inputApp.addEventListener("input", async (e) => {
  const tab1 = await getAppareil(recipes);
  let tab2 = [];
  if (e.target.value.length > 2) {
    for (let i = 0; i < tab1.length; i++) {
      if (
        tab1[i].includes(e.target.value.toUpperCase()) &&
        !tab2.includes(tab1[i])
      ) {
        tab2.push(tab1[i]);
      }
    }
  } else {
    tab2 = tab1;
  }
  ul_app.innerHTML = "";
  displayApp(tab2);
});

//input ustensils
const inputust = document.querySelector("#input_ust");
const ul_ust = document.querySelector("#list_ust");
inputust.addEventListener("input", async (e) => {
  const tab1 = await getUstensiles(recipes);
  let tab2 = [];
  if (e.target.value.length > 2) {
    for (let i = 0; i < tab1.length; i++) {
      if (
        tab1[i].includes(e.target.value.toUpperCase()) &&
        !tab2.includes(tab1[i])
      ) {
        tab2.push(tab1[i]);
      }
    }
  } else {
    tab2 = tab1;
  }
  ul_ust.innerHTML = "";
  displayUst(tab2);
});

//lancer la recherche avancé avec le tag
let tag = [];
let arrayRecipe = [];
let newArrayRecipe = [];
let array = [];
let keyword = document.querySelector("#tag");

// const tagfunction = (recipe, newRecipe) => {
//   if (newRecipe.length > 1) {
//     for (let rec of recipe) {
//       for (let igr of rec.ingredients) {
//         if (igr.ingredient.includes(tag[tag.length - 1])) {
//           newRecipe.push(rec);
//         }
//       }
//     }
//     tagfunction(newRecipe, newRecipe);
//     return newRecipe;
//   }
// };

// Recherche avancé par ingrédients
ul_igr.addEventListener("click", (e) => {
  console.log(e.target.id);
  tag.push(e.target.id);
  keyword.innerHTML += `<div class="btn btn-primary m-1">
       ${e.target.id}<span class="close"><i class="bi bi-x-circle"></i><span></div>`;

  if (newArrayRecipe.length == 0) {
    for (let recipe of recipes) {
      for (let igr of recipe.ingredients) {
        if (igr.ingredient.includes(tag)) {
          newArrayRecipe.push(recipe);
        }
      }
    }
    arrayRecipe = newArrayRecipe;
    console.log(newArrayRecipe);
  } else {
    for (let recipe of newArrayRecipe) {
      for (let igr of recipe.ingredients) {
        if (igr.ingredient.includes(tag[tag.length - 1])) {
          array.push(recipe);
        }
      }
      newArrayRecipe = array;
    }
    arrayRecipe = newArrayRecipe;
    console.log(newArrayRecipe);
  }
  main.innerHTML = "";
  ul_igr.innerHTML = "";
  ul_ust.innerHTML = "";
  ul_app.innerHTML = "";
  init(arrayRecipe);
});

// Recherche avancée par ustensils
ul_ust.addEventListener("click", (e) => {
  console.log(e.target.id);
  tag.push(e.target.id);
  keyword.innerHTML += `<div class="btn m-1" style="background:#ED6454;color:white">
       ${e.target.id}<span class="close"><i class="bi bi-x-circle"></i><span></div>`;

  if (newArrayRecipe.length == 0) {
    for (let recipe of recipes) {
      for (let ust of recipe.ustensils) {
        if (ust.includes(tag[tag.length - 1].toLowerCase())) {
          newArrayRecipe.push(recipe);
        }
      }
    }
    console.log(newArrayRecipe);
    arrayRecipe = newArrayRecipe;
    //   console.log(newArrayRecipe);
  } else {
    for (let recipe of newArrayRecipe) {
      for (let ust of recipe.ustensils) {
        if (ust.includes(tag[tag.length - 1].toLowerCase())) {
          array.push(recipe);
        }
      }
      newArrayRecipe = array;
    }

    console.log(newArrayRecipe);
  }
  arrayRecipe = newArrayRecipe;
  main.innerHTML = "";
  ul_igr.innerHTML = "";
  ul_ust.innerHTML = "";
  ul_app.innerHTML = "";
  init(arrayRecipe);
});

// Recherche avancée par appliance
ul_app.addEventListener("click", (e) => {
  console.log(e.target.id);
  tag.push(e.target.id);
  keyword.innerHTML += `<div class="btn m-1" style="background:#68D9A4;color:white">
       ${e.target.id}<span class="close"><i class="bi bi-x-circle"></i><span></div>`;
  if (newArrayRecipe.length == 0) {
    for (let recipe of recipes) {
      if (recipe.appliance.includes(tag[tag.length - 1])) {
        newArrayRecipe.push(recipe);
      }
    }
    console.log(newArrayRecipe);
    arrayRecipe = newArrayRecipe;
    //   console.log(newArrayRecipe);
  } else {
    for (let recipe of newArrayRecipe) {
      if (recipe.appliance.includes(tag[tag.length - 1])) {
        array.push(recipe);
      }
      newArrayRecipe = array;
    }

    console.log(newArrayRecipe);
  }
  arrayRecipe = newArrayRecipe;
  main.innerHTML = "";
  ul_igr.innerHTML = "";
  ul_ust.innerHTML = "";
  ul_app.innerHTML = "";
  init(arrayRecipe);
});

// Retirer le tag
keyword.addEventListener("click", (e) => {
  if (e.target.classList.contains("bi")) {
    let indexTag = tag.indexOf(e.target.innerText);
    tag.splice(indexTag, 1);
    e.target.parentElement.parentElement.remove();
    if (tag.length == 0) {
      init(recipes);
    }
  }
});
