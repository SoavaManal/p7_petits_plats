import recipes from "../data/recipes.js";
const main = document.querySelector("#main");

const getDatas = async () => {
  const recipesArray = recipes;
  console.log(recipesArray);
  return recipesArray;
};

const displayDatas = async (recettes) => {
  recettes.forEach((recette) => {
    // article
    const article = document.createElement("article");
    //article.classList.add("card");
    article.classList.add("col");
    article.classList.add("gy-5");
    article.style.height = "20rem";

    const card_img = document.createElement("img");
    card_img.classList.add("card-img-top");

    card_img.classList.add("bg-secondary");
    card_img.classList.add("py-5");

    const card_body = document.createElement("div");
    card_body.classList.add("card-body");
    card_body.classList.add("bg-light");

    // name+time
    const div_card_title = document.createElement("div");
    div_card_title.classList.add("card-title");
    div_card_title.classList.add("row");
    div_card_title.classList.add("align-items-center");

    const name_recipe = document.createElement("h2");
    name_recipe.classList.add("col-8");
    name_recipe.classList.add("text_size_header");
    name_recipe.textContent = recette.name;

    const time_recipe = document.createElement("span");
    time_recipe.classList.add("col-4");
    time_recipe.classList.add("fw-bold");
    time_recipe.classList.add("text_size");
    time_recipe.innerHTML = `<i class="bi bi-clock"></i> ${recette.time} min`;
    div_card_title.appendChild(name_recipe);
    div_card_title.appendChild(time_recipe);

    // div card text
    const div_card_text = document.createElement("div");
    div_card_text.classList.add("row");
    div_card_text.style.fontSize = "0.85rem";

    const div_list = document.createElement("div");
    div_list.classList.add("col");
    div_list.classList.add("p-2");

    const div_desc = document.createElement("div");
    div_desc.classList.add("col-5");
    div_desc.classList.add("p-1");

    // ingrediants
    const ingredients_list = document.createElement("ul");
    ingredients_list.classList.add("list-unstyled");
    recette.ingredients.forEach((igd) => {
      const ingredient_recipe = document.createElement("li");
      ingredient_recipe.classList.add("text_size");
      if (igd.quantity) {
        if (igd.unit === "grammes") {
          ingredient_recipe.textContent = `${igd.ingredient}: ${igd.quantity}g`;
        } else if (igd.unit === "cuillères à soupe") {
          ingredient_recipe.textContent = `${igd.ingredient}: ${igd.quantity} cuillères`;
        } else {
          ingredient_recipe.textContent = igd.unit
            ? `${igd.ingredient}: ${igd.quantity}${igd.unit}`
            : `${igd.ingredient}: ${igd.quantity}`;
        }
      } else {
        ingredient_recipe.textContent = igd.ingredient;
      }
      ingredient_recipe.classList.add("fw-bold");
      ingredients_list.appendChild(ingredient_recipe);
    });
    div_list.appendChild(ingredients_list);
    // description
    const desc_recipe = document.createElement("p");
    desc_recipe.textContent = recette.description;
    desc_recipe.classList.add("text_ellipsis");
    desc_recipe.classList.add("text_size");
    div_desc.appendChild(desc_recipe);
    div_card_text.appendChild(div_list);
    div_card_text.appendChild(div_desc);

    card_body.appendChild(div_card_title);
    card_body.appendChild(div_card_text);

    article.appendChild(card_img);
    article.appendChild(card_body);
    main.appendChild(article);
  });
};

const getIngredients = async (recipes) => {
  const ingredient_list = document.querySelector("#ingredients-list");
  let tab = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((igd) => {
      //console.log(igd.ingredient);
      let uppercase_igd = igd.ingredient.toUpperCase();
      //console.log(uppercase_igd);
      if (!tab.includes(uppercase_igd)) {
        tab.push(uppercase_igd);
      }
    });
  });
  console.log("Ingrediants: ", tab);
  for (let i = 0; i < tab.length; i++) {
    const ingredients_li = document.createElement("li");
    ingredients_li.classList.add("list-inline-item");
    ingredients_li.classList.add("col-2");
    // ingredients_li.classList.add("row-cols-3");
    const ingredient_a = document.createElement("a");
    //ingredient_a.classList.add("col");
    ingredient_a.classList.add("text-light");
    ingredient_a.classList.add("dropdown-item");
    ingredient_a.setAttribute("src", "#");
    for (let j = 1; j < tab[i].length; j++) {
      ingredient_a.textContent =
        tab[i].substr(0, 1).toUpperCase() +
        tab[i].substr(1, tab[i].length).toLowerCase();
    }
    ingredients_li.appendChild(ingredient_a);
    ingredient_list.appendChild(ingredients_li);
  }
};

const getAppareils = async (recipes) => {
  const appareil_list = document.querySelector("#appareils-list");
  let tab = [];
  recipes.forEach((recipe) => {
    if (!tab.includes(recipe.appliance)) {
      tab.push(recipe.appliance);
    }
  });
  console.log("Appareil: ", tab);
  for (let i = 0; i < tab.length; i++) {
    const appareil_li = document.createElement("li");
    const appareil_a = document.createElement("a");
    appareil_a.classList.add("text-light");
    appareil_a.classList.add("dropdown-item");
    appareil_a.setAttribute("src", "#");
    appareil_a.textContent = tab[i];
    appareil_li.appendChild(appareil_a);
    appareil_list.appendChild(appareil_li);
  }
};

const getUstensiles = async (recipes) => {
  const ustensiles_list = document.querySelector("#ustensiles-list");
  let tab = [];
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ust) => {
      let uppercase_ust = ust.toUpperCase();
      if (!tab.includes(uppercase_ust)) {
        tab.push(uppercase_ust);
      }
    });
  });
  console.log("Ustensiles: ", tab);
  for (let i = 0; i < tab.length; i++) {
    const ustensiles_li = document.createElement("li");
    ustensiles_li.classList.add("list-inline-item");
    ustensiles_li.classList.add("col-3");
    const ustensiles_a = document.createElement("a");
    ustensiles_a.classList.add("text-light");
    ustensiles_a.classList.add("dropdown-item");
    ustensiles_a.setAttribute("src", "#");
    ustensiles_a.textContent =
      tab[i].substr(0, 1).toUpperCase() +
      tab[i].substr(1, tab[i].length).toLowerCase();
    ustensiles_li.appendChild(ustensiles_a);
    ustensiles_list.appendChild(ustensiles_li);
  }
};

const init = async () => {
  const recipes = await getDatas();
  await displayDatas(recipes);
  getIngredients(recipes);
  getAppareils(recipes);
  getUstensiles(recipes);
};
init();

const input_igr = document.querySelector("#dropdownMenuButton1");
input_igr.addEventListener("click", () => {
  input_igr.setAttribute("placeholder", "Rechercher un ingredient");
  input_igr.setAttribute("value", "");
  console.log("click");
});

const search = document.querySelector("#rechercher-une-recette");
const tag_search = document.querySelector("#search_barre");

// function search
// Search with method array
const array_mtd = (tag) => {
  let array = recipes.filter((recipe) => {
    if (
      recipe.name.includes(tag) ||
      recipe.description.includes(tag) ||
      recipe.ingredients.some((rcp) =>
        rcp.ingredient.toLowerCase().includes(tag.toLowerCase())
      )
    ) {
      return recipe;
    }
  });
  console.log(array);
  main.innerHTML = "";
  if (array.length > 0) {
    displayData(array);
  } else {
    main.innerHTML = `<div><p class='text-danger'> Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », etc.</div>`;
  }
};

// recherche classique

search.addEventListener("click", () => {
  console.log(tag_search.value.length);
  if (tag_search.value.length > 2) {
    console.log("c'est bon");
    array_mtd(tag_search.value);
  } else {
    alert("Veuillez entrer au moins 3 charactéres");
    tag_search.value = "";
  }
});
