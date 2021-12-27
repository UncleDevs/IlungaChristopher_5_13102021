let url = new URLSearchParams(window.location.search);
let id = url.get("id");

console.log(id);

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

// Récupération des articles de l'API
function getArticle() {
  fetch("http://localhost:3000/api/products/" + id)
    .then((response) => {
      return response.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (resultatAPI) {
      article = await resultatAPI;
      console.log(article);
      if (article) {
        get(article);
      }
    });
}
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
    productColors.innerHTML = colors;
  }
  addToCart(article);
}


//Ajout au panier
function addToCart(article) {
  const btn_envoyerPanier = document.querySelector("#addToCart");

  //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
  btn_envoyerPanier.addEventListener("click", () => {
    if (
      quantityPicked.value > 0 &&
      quantityPicked.value <= 100 &&
      quantityPicked.value != 0
    ) {
      //Recupération du choix de la couleur
      let colorChoice = colorPicked.value;

      //Recupération du choix de la quantité
      let quantityChoice = quantityPicked.value;

      //Récupération des options de l'article à ajouter au panier
      let optionsProduct = {
        idProduct: id,
        colorProduct: colorChoice,
        quantityProduct: Number(quantityChoice),
        productName: article.name,
        productPrice: article.price,
        productDescription: article.description,
        productImg: article.imageUrl,
        altProductImg: article.altTxt,
      };

      //Définir local storage
      let productLocalStorage = JSON.parse(localStorage.getItem("product"));

      //fenêtre pop-up
      const popupConfirmation = () => {
        if (
          window.confirm(`Votre commande de ${quantityChoice} ${article.name} ${colorChoice} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)
        ) {
          window.location.href = "cart.html";
        }
      };

      //Importation dans le local storage
      //Si le panier comporte déjà au moins 1 article
      if (productLocalStorage) {
        const resultFind = productLocalStorage.find(
          (el) => el.idProduct === id && el.colorProduct === colorChoice
        );
        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
          let newQuantity =
            parseInt(optionsProduct.quantityProduct) +
            parseInt(resultFind.quantityProduct);
          resultFind.quantityProduct = newQuantity;
          localStorage.setItem("product", JSON.stringify(productLocalStorage));
          console.table(productLocalStorage);
          popupConfirmation();
          //Si le produit commandé n'est pas dans le panier
        } else {
          productLocalStorage.push(optionsProduct);
          localStorage.setItem("product", JSON.stringify(productLocalStorage));
          console.table(productLocalStorage);
          popupConfirmation();
        }
        //Si le panier est vide
      } else {
        productLocalStorage = [];
        productLocalStorage.push(optionsProduct);
        localStorage.setItem("product", JSON.stringify(productLocalStorage));
        console.table(productLocalStorage);
        popupConfirmation();
      }
    }
  });
}
