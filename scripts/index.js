import recipes from "../data/recipes.js";
const main = document.querySelector("#main");

const displayData = (recettes) => {
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

const displayIngredient = async (tab) => {
  const ingredient_list = document.querySelector("#select_igr");
  ingredient_list.classList.add("text-light");
  for (let i = 0; i < tab.length; i++) {
    const ingredients_opt = document.createElement("option");
    for (let j = 1; j < tab[i].length; j++) {
      ingredients_opt.textContent =
        tab[i].substr(0, 1).toUpperCase() +
        tab[i].substr(1, tab[i].length).toLowerCase();
    }
    ingredient_list.appendChild(ingredients_opt);
  }
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

const displayUst = async (tab) => {
  const ustensiles_list = document.querySelector("#select_ust");
  ustensiles_list.classList.add("text-light");
  for (let i = 0; i < tab.length; i++) {
    const ustensiles_opt = document.createElement("option");

    ustensiles_opt.textContent =
      tab[i].substr(0, 1).toUpperCase() +
      tab[i].substr(1, tab[i].length).toLowerCase();
    ustensiles_list.appendChild(ustensiles_opt);
  }
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

const displayApp = async (tab) => {
  const appareil_list = document.querySelector("#select_apr");
  appareil_list.classList.add("text-light");
  for (let i = 0; i < tab.length; i++) {
    const appareil_opt = document.createElement("option");

    appareil_opt.textContent =
      tab[i].substr(0, 1).toUpperCase() +
      tab[i].substr(1, tab[i].length).toLowerCase();
    appareil_list.appendChild(appareil_opt);
  }
};

const init = async () => {
  displayData(recipes);
  const tab1 = await getIngredients();
  await displayIngredient(tab1);
  const tab2 = await getUstensiles();
  await displayUst(tab2);
  const tab3 = await getAppareil();
  //console.log("tab3:" + tab3);
  await displayApp(tab3);
};
init();

const search_method = (tag) => {
  let array = [];
  array = recipes.filter((recipe) => {
    if (
      recipe.name.toLocaleLowerCase().includes(tag.toLowerCase()) ||
      recipe.description.toLocaleLowerCase().includes(tag.toLowerCase()) ||
      recipe.ingredients.some((rcp) =>
        rcp.ingredient.toLowerCase().includes(tag.toLowerCase())
      )
    ) {
      array.push(recipe);
    }
    main.innerHTML = "";
    if (array.length > 0) {
      displayData(array);
    } else {
      main.innerHTML = `<div><p class='text-danger'> Aucune recette ne correspond à votre critère… vous pouvez
      chercher « tarte aux pommes », « poisson », etc.</div>`;
    }
  });
};

const search = document.querySelector("#rechercher-une-recette");
const tag_search = document.querySelector("#search_barre");
// actualisation à chaque nouveau caractére
tag_search.addEventListener("input", () => {
  if (tag_search.value.length > 2) {
    search_method(tag_search.value);
  }
});
search.addEventListener("click", () => {
  if (tag_search.value.length > 2) {
    search_method(tag_search.value);
  } else {
    alert("veuillez entrer au moins 3 charachtéres");
    tag_search.value = "";
  }
});

// search par 3 tag

const mot_cle = document.querySelector("#tag");
// ingredients
const select_igr = document.querySelector("#select_igr");
select_igr.addEventListener("click", (e) => {
  let tag = e.target.value;

  if (tag !== "") {
    mot_cle.innerHTML += `<button class="btn btn-primary">
    ${tag}<i class="bi bi-x-circle"></i></button>`;
  }

  let array = [];
  array = recipes.filter((recipe) =>
    recipe.ingredients.some((rcp) =>
      rcp.ingredient.toLowerCase().includes(tag.toLowerCase())
    )
  );
  main.innerHTML = "";
  displayData(array);
});

// ustensils
const select_ust = document.querySelector("#select_ust");
select_ust.addEventListener("click", (e) => {
  let tag = e.target.value;

  if (tag !== "") {
    mot_cle.innerHTML += `<button class="btn btn-danger">
    ${tag}<i class="bi bi-x-circle"></i></button>`;
  }

  let array = [];
  array = recipes.filter((recipe) =>
    recipe.ustensils.some((ust) =>
      ust.toLowerCase().includes(tag.toLowerCase())
    )
  );
  main.innerHTML = "";
  displayData(array);
});

// appareils
const select_apr = document.querySelector("#select_apr");
select_apr.addEventListener("click", (e) => {
  let tag = e.target.value;
  if (tag !== "") {
    mot_cle.innerHTML += `<button class="btn btn-success">
    ${tag}<i class="bi bi-x-circle"></i></button>`;
  }

  let array = [];
  array = recipes.filter((recipe) =>
    recipe.appliance.toLowerCase().includes(tag.toLowerCase())
  );
  main.innerHTML = "";
  displayData(array);
});
