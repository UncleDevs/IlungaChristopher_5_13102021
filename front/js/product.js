let url = new URLSearchParams(window.location.search);
let id = url.get("id");

console.log(id);

getArticle();

// Récupération des articles de l'API
function getArticle() {
  fetch("http://localhost:3000/api/products/" + id)
    .then((res) => {
      return res.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (resultatAPI) {
      article = await resultatAPI;
      console.log(article);
      if (article) {
        get(article);
      }
    });

  function get(article) {
    // Ajout de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Ajout du titre "h1"
    let productName = document.getElementById("title");
    productName.innerHTML = article.name;

    // Ajout du prix
    let productPrice = document.getElementById("price");
    productPrice.innerHTML = article.price;

    // Ajout de la description
    let productDescription = document.getElementById("description");
    productDescription.innerHTML = article.description;

    // Ajout des couleurs
    for (let colors of article.colors) {
      let productColors = document.createElement("option");
      document.querySelector("#colors").appendChild(productColors);
      productColors.value = colors;
      productColors.innerHTML = colors;
    }
  }
}
