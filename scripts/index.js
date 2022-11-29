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
};

// addEventListener

search.addEventListener("click", () => {
  if (tag_search.value.length > 2) {
    searchPrincipale(tag_search.value);
  } else {
    alert("Veuillez entrer au moins 3 charactéres");
    tag_search.value = "";
  }
});
tag_search.addEventListener("input", () => {
  if (tag_search.value.length > 2) {
    searchPrincipale(tag_search.value);
  }
});

select_igr.addEventListener("change", (e) => {
  let array = [];
  let array_igr = [];
  let tag = e.target.value;

  mot_cle.innerHTML += `<button class="btn btn-primary m-1">
  ${tag}<i class="bi bi-x-circle"></i></button>`;

  console.log(tag);
  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ingredients.length; j++)
      if (
        recipes[i].ingredients[j].ingredient
          .toLowerCase()
          .includes(tag.toLowerCase())
      ) {
        array.push(recipes[i]);
      }
  }
  console.log(array);
  for (let k = 0; k < array.length; k++) {
    for (let l = 0; l < array[k].ingredients.length; l++) {
      if (
        array[k].ingredients[l].ingredient !== tag &&
        !array_igr.includes(array[k].ingredients[l].ingredient)
      ) {
        array_igr.push(array[k].ingredients[l].ingredient);
      }
    }
  }
  console.log(array_igr);
  main.innerHTML = "";
  displayData(array);
  select_igr.innerHTML = "";
  displayIngredient(array_igr);
});

select_ust.addEventListener("change", (e) => {
  let array = [];
  let tag = e.target.value;

  mot_cle.innerHTML += `<button class="btn btn-danger m-1">
  ${tag}<i class="bi bi-x-circle"></i></button>`;

  console.log(tag);
  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ustensils.length; j++) {
      if (recipes[i].ustensils[j].toLowerCase().includes(tag.toLowerCase())) {
        array.push(recipes[i]);
      }
    }
  }
  console.log(array);
  main.innerHTML = "";
  displayData(array);
});

select_app.addEventListener("change", (e) => {
  let array = [];
  let tag = e.target.value;

  mot_cle.innerHTML += `<button class="btn btn-success m-1">
  ${tag}<i class="bi bi-x-circle"></i></button>`;

  console.log(tag);
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].appliance.toLowerCase().includes(tag.toLowerCase())) {
      array.push(recipes[i]);
    }
  }
  main.innerHTML = "";
  displayData(array);
  //let array_apl = [];
  // for (let j = 0; j < array.length; j++) {
  //   if (tag !== array[j].appliance) {
  //     array_apl.push(array[j].appliance);
  //   }
  // }
  // console.log(array_apl);
  // select_app.innerHTML = "";
  // displayApp(array_apl);
});

// input
const input_igr = document.querySelector("#menu1");
input_igr.addEventListener("input", (e) => {
  console.log(e.target.value);
});
