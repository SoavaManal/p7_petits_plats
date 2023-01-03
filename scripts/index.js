import recipes from "../data/recipes.js";
import {
  displayData,
  displayIngredient,
  displayApp,
  displayUst,
} from "./display.js";

const main = document.querySelector("#main");
const ul_igr = document.querySelector("#list_igr");
const ul_ust = document.querySelector("#list_ust");
const ul_app = document.querySelector("#list_app");

const getIngredients = async (recipes) => {
  let tab = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((igd) => {
      if (
        !tab.includes(igd.ingredient.toUpperCase()) &&
        !tab.includes(
          igd.ingredient.toUpperCase().substring(0, igd.ingredient.length - 1)
        )
      ) {
        tab.push(igd.ingredient.toUpperCase());
      }
    });
  });
  return tab;
};

const getUstensiles = async (recipes) => {
  let tab = [];
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ust) => {
      if (!tab.includes(ust.toUpperCase())) {
        tab.push(ust.toUpperCase());
      }
    });
  });
  return tab;
};

const getAppareil = async (recipes) => {
  let tab = [];
  recipes.forEach((recipe) => {
    if (!tab.includes(recipe.appliance.toUpperCase())) {
      tab.push(recipe.appliance.toUpperCase());
    }
  });
  return tab;
};

const init = async (recipes) => {
  // affichage des recettes
  displayData(recipes);
  let tab1 = await getIngredients(recipes);
  let tab2 = await getUstensiles(recipes);
  let tab3 = await getAppareil(recipes);
  // Retirer le tag de la liste des recherche avancée
  if (tag.length > 0) {
    for (let t of tag) {
      let tagIndex = tab1.indexOf(t.toUpperCase());
      tab1.splice(tagIndex, 1);
    }
  }
  if (tag.length > 0) {
    for (let t of tag) {
      let tagIndex = tab2.indexOf(t.toUpperCase());
      tab2.splice(tagIndex, 1);
    }
  }
  if (tag.length > 0) {
    for (let t of tag) {
      let tagIndex = tab3.indexOf(t.toUpperCase());
      tab3.splice(tagIndex, 1);
    }
  }
  if (newArrayRecipe.length == 1) {
    tab1 = [];
    tab2 = [];
    tab3 = [];
  }
  ul_igr.innerHTML = "";
  ul_app.innerHTML = "";
  ul_ust.innerHTML = "";
  await displayIngredient(tab1);
  await displayUst(tab2);
  await displayApp(tab3);
};
init(recipes);

const search_method = (tag) => {
  let recipes_try = [];
  if (tag.length > 2) {
    recipes.filter((recipe) => {
      if (
        recipe.name.toLocaleLowerCase().includes(tag.toLowerCase()) ||
        recipe.description
          .toLocaleLowerCase()
          .includes(tag.toLowerCase() + " ") ||
        recipe.ingredients.some((rcp) =>
          rcp.ingredient.toLowerCase().includes(tag.toLowerCase())
        )
      ) {
        recipes_try.push(recipe);
      }
    });
  } else if (tag.length <= 2) {
    recipes_try = recipes;
  }
  main.innerHTML = "";
  if (recipes_try.length > 0) {
    ul_igr.innerHTML = "";
    ul_app.innerHTML = "";
    ul_ust.innerHTML = "";
    init(recipes_try);
  } else if (recipes_try.length == 0) {
    main.innerHTML = `<div><p class='text-danger'> Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », etc.</div>`;
  }
  return recipes_try;
};

// lancer la recherche principale
const search = document.querySelector("#rechercher-une-recette");
const tag_search = document.querySelector("#search_barre");
// actualisation à chaque nouveau caractére
tag_search.addEventListener("input", () => {
  // console.time();
  search_method(tag_search.value);
  // console.timeEnd();
  newArrayRecipe = search_method(tag_search.value);
});
search.addEventListener("click", () => {
  if (tag_search.value.length > 2) {
    console.time();
    search_method(tag_search.value);
    console.timeEnd();
  } else {
    alert("veuillez entrer au moins 3 charachtéres");
    tag_search.value = "";
  }
});

// input recherche avancée
//input ingredient
const inputIgr = document.querySelector("#input_igr");
inputIgr.addEventListener("input", async (e) => {
  let tab1 = [];
  if (newArrayRecipe.length == 0) {
    tab1 = await getIngredients(recipes);
  } else {
    tab1 = await getIngredients(newArrayRecipe);
  }
  let tab2 = [];
  if (e.target.value.length > 0) {
    tab1.filter((tab) => {
      if (tab.includes(e.target.value.toUpperCase()) && !tab2.includes(tab)) {
        tab2.push(tab);
      }
    });
  } else {
    tab2 = tab1;
  }
  ul_igr.innerHTML = "";
  displayIngredient(tab2);
});

//input appliance
const inputApp = document.querySelector("#input_app");
inputApp.addEventListener("input", async (e) => {
  let tab1 = [];
  if (newArrayRecipe.length == 0) {
    tab1 = await getAppareil(recipes);
  } else {
    tab1 = await getAppareil(newArrayRecipe);
  }
  let tab2 = [];
  if (e.target.value.length > 0) {
    tab1.filter((tab) => {
      if (tab.includes(e.target.value.toUpperCase()) && !tab2.includes(tab)) {
        tab2.push(tab);
      }
    });
  } else {
    tab2 = tab1;
  }
  ul_app.innerHTML = "";
  displayApp(tab2);
});

//input ustensils
const inputust = document.querySelector("#input_ust");
inputust.addEventListener("input", async (e) => {
  let tab1 = [];
  if (newArrayRecipe.length == 0) {
    tab1 = await getUstensiles(recipes);
  } else {
    tab1 = await getUstensiles(newArrayRecipe);
  }
  let tab2 = [];
  if (e.target.value.length > 0) {
    tab1.filter((tab) => {
      if (tab.includes(e.target.value.toUpperCase()) && !tab2.includes(tab)) {
        tab2.push(tab);
      }
    });
    console.log(tab1);
  } else {
    tab2 = tab1;
  }
  ul_ust.innerHTML = "";
  displayUst(tab2);
});

// Recherche avancée
let tag = [];
let arrayRecipe = [];
let newArrayRecipe = [];
let keyword = document.querySelector("#tag");
// Recherche avancée par ingrédients
ul_igr.addEventListener("click", (e) => {
  const listIng = document.querySelector("#igr");
  const btnIng = document.querySelector("#btn_igr");
  const btnAppliance = document.querySelector("#btn_app");
  const btnUstensils = document.querySelector("#btn_ust");
  btnAppliance.style.marginLeft = "0px";
  btnUstensils.style.marginLeft = "0px";
  listIng.style.display = "none";
  btnIng.style.display = "block";
  console.log(e.target.id);
  tag.push(e.target.id);
  keyword.innerHTML += `<div class="btn btn-primary m-1">
       ${e.target.id}<span class="close"><i class="bi bi-x-circle"></i><span></div>`;

  if (newArrayRecipe.length == 0) {
    newArrayRecipe = recipes.filter((recipe) =>
      recipe.ingredients.some((rcp) =>
        rcp.ingredient.toLowerCase().includes(tag[tag.length - 1].toLowerCase())
      )
    );
    arrayRecipe = newArrayRecipe;
    console.log(newArrayRecipe);
  } else if (newArrayRecipe.length > 0) {
    let array = [];
    array = newArrayRecipe.filter((recipe) =>
      recipe.ingredients.some((rcp) =>
        rcp.ingredient.toLowerCase().includes(tag[tag.length - 1].toLowerCase())
      )
    );
    newArrayRecipe = array;
  }
  arrayRecipe = newArrayRecipe;
  console.log(newArrayRecipe);

  main.innerHTML = "";
  ul_igr.innerHTML = "";
  ul_ust.innerHTML = "";
  ul_app.innerHTML = "";
  init(arrayRecipe);
});
// Recherche avancée par ustensils
ul_ust.addEventListener("click", (e) => {
  const listUst = document.querySelector("#ust");
  const btnUst = document.querySelector("#btn_ust");
  listUst.style.display = "none";
  btnUst.style.display = "block";
  console.log(e.target.id);
  tag.push(e.target.id);
  keyword.innerHTML += `<div class="btn m-1" style="background:#ED6454;color:white">
       ${e.target.id}<span class="close"><i class="bi bi-x-circle"></i><span></div>`;

  if (newArrayRecipe.length == 0) {
    newArrayRecipe = recipes.filter((recipe) =>
      recipe.ustensils.some((ust) =>
        ust.toLowerCase().includes(tag[tag.length - 1].toLowerCase())
      )
    );
    console.log(newArrayRecipe);
    arrayRecipe = newArrayRecipe;
  } else if (newArrayRecipe.length > 0) {
    let array = [];
    array = newArrayRecipe.filter((recipe) =>
      recipe.ustensils.some((ust) =>
        ust.toLowerCase().includes(tag[tag.length - 1].toLowerCase())
      )
    );
    newArrayRecipe = array;
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
  const listApp = document.querySelector("#app");
  const btnApp = document.querySelector("#btn_app");
  listApp.style.display = "none";
  btnApp.style.display = "block";
  console.log(e.target.id);
  tag.push(e.target.id);
  keyword.innerHTML += `<div class="btn m-1" style="background:#68D9A4;color:white">
       ${e.target.id}<span class="close"><i class="bi bi-x-circle"></i><span></div>`;
  if (newArrayRecipe.length == 0) {
    newArrayRecipe = recipes.filter((recipe) =>
      recipe.appliance.toLowerCase().includes(tag[tag.length - 1].toLowerCase())
    );
    console.log(newArrayRecipe);
  } else if (newArrayRecipe.length > 0) {
    let array = [];
    array = newArrayRecipe.filter((recipe) =>
      recipe.appliance.toLowerCase().includes(tag[tag.length - 1].toLowerCase())
    );
    newArrayRecipe = array;
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
    init(recipes);
    e.target.parentElement.parentElement.remove();
    if (tag.length == 0) {
      newArrayRecipe = [];
      // init(recipes);
    }
  }
});
