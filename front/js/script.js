addProduct();

// Récupération des articles de l'API
async function getArticles() {
  let response = await fetch("http://localhost:3000/api/products");
  return await response.json();
}

// Répartition des données de l'API dans le DOM
async function addProduct() {
  let result = await getArticles().then(function (resultAPI) {
    const articles = resultAPI;
    console.log(articles);
    for (let article in articles) {
      // Création de l'élément "a"
      let productLink = document.createElement("a");
      document.querySelector(".items").appendChild(productLink);
      productLink.href = "product.html";

      // Création de l'élément "article"
      let productArticle = document.createElement("article");
      productLink.appendChild(productArticle);

      // Création de l'élément image
      let productImg = document.createElement("img");
      productArticle.appendChild(productImg);
      productImg.src = resultAPI[article].imageUrl;
      productImg.alt = resultAPI[article].altTxt;

      // Création du titre "h3"
      let productName = document.createElement("h3");
      productArticle.appendChild(productName);
      productName.classList.add("productName");
      productName.innerHTML = resultAPI[article].name;

      // Création de la description "p"
      let productDescription = document.createElement("p");
      productArticle.appendChild(productDescription);
      productDescription.classList.add("productName");
      productDescription.innerHTML = resultAPI[article].description;
    }
  });
}
