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
const keyword = document.querySelector("#tag");
const select_igr = document.querySelector("#list_igr");
const select_ust = document.querySelector("#select_ust");
const select_app = document.querySelector("#select_apr");

// function get ingredients
const getIngredients = async (recipes) => {
  let tab = [];
  for (let recipe of recipes) {
    for (let igr of recipe.ingredients) {
      let uppercase_igd = igr.ingredient.toUpperCase();
      if (!tab.includes(uppercase_igd)) {
        tab.push(uppercase_igd);
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
      let uppercase_ust = ust.toUpperCase();
      if (!tab.includes(uppercase_ust)) {
        tab.push(uppercase_ust);
      }
    }
  }

  return tab;
};

//get appliance
const getAppareil = async (recipes) => {
  let tab = [];
  for (let recipe of recipes) {
    let uppercase_app = recipe.appliance.toUpperCase();
    if (!tab.includes(uppercase_app)) {
      tab.push(uppercase_app);
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
  console.log(recipes_try);
  main.innerHTML = "";
  if (recipes_try.length > 0) {
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
  if (tag_search.value.length > 2) {
    searchPrincipale(tag_search.value);
  }
});

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
// let tag = [];
// let array = [];
// let array1 = [];
// let newTab = [];
// let array_igr = [];
// let array_ust = [];
// let array_app = [];

// select_igr.addEventListener("change", async (e) => {
//   tag.push(e.target.value);

//   keyword.innerHTML += `<div class="btn btn-primary m-1">
//       ${e.target.value}<span class="close"><i class="bi bi-x-circle"></i><span></div>`;

//   console.log(tag);

//   // let recipeTry = await searchPrincipale(e.target.value);
//   // console.log(recipeTry);
//   if (array.length == 0) {
//     newTab = recipes;
//   } else {
//     newTab = array1;
//   }

//   console.log(newTab);
//   let tableau = [];
//   for (let i = 0; i < newTab.length; i++) {
//     let tab = [];
//     console.log(newTab[i].ingredients.length);
//     for (let j = 0; j < newTab[i].ingredients.length; j++) {
//       tab.push(newTab[i].ingredients[j].ingredient);
//     }
//     tableau.push(tab);
//     if (tableau[i].includes(tag[tag.length - 1])) {
//       array.push(newTab[newTab[i].id - 1]);
//     }
//     array1 = array;
//   }
//   console.log(array);

//   for (let l = 0; l < array.length; l++) {
//     if (array[l].appliance !== tag && !array_app.includes(array[l].appliance)) {
//       array_app.push(array[l].appliance);
//     }
//     for (let m = 0; m < array[l].ingredients.length; m++) {
//       if (
//         array[l].ingredients[m] !== tag &&
//         !array_igr.includes(array[l].ingredients[m].ingredient)
//       ) {
//         array_igr.push(array[l].ingredients[m].ingredient);
//       }
//     }
//     for (let n = 0; n < array[l].ustensils.length; n++) {
//       if (
//         array[l].appliance !== tag &&
//         !array_ust.includes(array[l].ustensils[n])
//       ) {
//         array_ust.push(array[l].ustensils[n]);
//       }
//     }
//   }

//   //console.log(array_app);
//   main.innerHTML = "";
//   displayData(array);
//   select_igr.innerHTML = "";
//   select_ust.innerHTML = "";
//   select_app.innerHTML = "";
//   displayIngredient(array_igr);
//   displayUst(array_ust);
//   displayApp(array_app);
// });

// select_ust.addEventListener("change", (e) => {
//   tag.push(e.target.value);

//   keyword.innerHTML += `<dicv class="btn btn-danger m-1">
//   ${e.target.value}<i class="bi bi-x-circle"></i></div>`;

//   console.log(tag);
//   for (let i = 0; i < recipes.length; i++) {
//     for (let j = 0; j < recipes[i].ustensils.length; j++) {
//       for (let t of tag) {
//         if (recipes[i].ustensils[j].toLowerCase().includes(t.toLowerCase())) {
//           array.push(recipes[i]);
//         }
//       }
//     }
//   }
//   for (let l = 0; l < array.length; l++) {
//     if (array[l].appliance !== tag && !array_app.includes(array[l].appliance)) {
//       array_app.push(array[l].appliance);
//     }
//     for (let m = 0; m < array[l].ingredients.length; m++) {
//       if (!array_igr.includes(array[l].ingredients[m].ingredient)) {
//         array_igr.push(array[l].ingredients[m].ingredient);
//       }
//     }
//     for (let n = 0; n < array[l].ustensils.length; n++) {
//       if (!array_ust.includes(array[l].ustensils[n])) {
//         array_ust.push(array[l].ustensils[n]);
//       }
//     }
//   }
//   console.log(array_app);
//   main.innerHTML = "";
//   displayData(array);
//   select_igr.innerHTML = "";
//   select_ust.innerHTML = "";
//   select_app.innerHTML = "";
//   displayIngredient(array_igr);
//   displayUst(array_ust);
//   displayApp(array_app);
// });

// select_app.addEventListener("change", (e) => {
//   let tag = e.target.value;

//   keyword.innerHTML += `<button class="btn btn-success m-1">
//   ${tag}<i class="bi bi-x-circle"></i></button>`;

//   console.log(tag);
//   for (let i = 0; i < recipes.length; i++) {
//     if (recipes[i].appliance.toLowerCase().includes(tag.toLowerCase())) {
//       array.push(recipes[i]);
//     }
//   }
//   for (let l = 0; l < array.length; l++) {
//     if (array[l].appliance !== tag && !array_app.includes(array[l].appliance)) {
//       array_app.push(array[l].appliance);
//     }
//     for (let m = 0; m < array[l].ingredients.length; m++) {
//       if (!array_igr.includes(array[l].ingredients[m].ingredient)) {
//         array_igr.push(array[l].ingredients[m].ingredient);
//       }
//     }
//     for (let n = 0; n < array[l].ustensils.length; n++) {
//       if (!array_ust.includes(array[l].ustensils[n])) {
//         array_ust.push(array[l].ustensils[n]);
//       }
//     }
//   }
//   console.log(array_app);
//   main.innerHTML = "";
//   displayData(array);
//   select_igr.innerHTML = "";
//   select_ust.innerHTML = "";
//   select_app.innerHTML = "";
//   displayIngredient(array_igr);
//   displayUst(array_ust);
//   displayApp(array_app);
// });

// // // input
// // const input_igr = document.querySelector("#menu1");
// // input_igr.addEventListener("input", (e) => {
// //   console.log(e.target.value);
// // });
