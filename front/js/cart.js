//Initialisation du local storage
let productLocalStorage = JSON.parse(localStorage.getItem("product"));
console.table(productLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");

// Si le panier est vide
function getCart() {
  if (productLocalStorage === null || productLocalStorage == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    positionEmptyCart.innerHTML = emptyCart;
  } else {
    for (let product in productLocalStorage) {
      // Insertion de l'élément "article"
      let productArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.setAttribute(
        "data-id",
        productLocalStorage[product].idProduct
      );

      // Insertion de l'élément "div"
      let productDivImg = document.createElement("div");
      productArticle.appendChild(productDivImg);
      productDivImg.className = "cart__item__img";

      // Insertion de l'image
      let productImg = document.createElement("img");
      productDivImg.appendChild(productImg);
      productImg.src = productLocalStorage[product].productImg;
      productImg.alt = productLocalStorage[product].altProductImg;

      // Insertion de l'élément "div"
      let productItemContent = document.createElement("div");
      productArticle.appendChild(productItemContent);
      productItemContent.className = "cart__item__content";

      // Insertion de l'élément "div"
      let productItemContentTitlePrice = document.createElement("div");
      productItemContent.appendChild(productItemContentTitlePrice);
      productItemContentTitlePrice.className =
        "cart__item__content__titlePrice";

      // Insertion du titre h3
      let productTitle = document.createElement("h2");
      productItemContentTitlePrice.appendChild(productTitle);
      productTitle.innerHTML = productLocalStorage[product].productName;

      // Insertion de la couleur
      let productColor = document.createElement("p");
      productTitle.appendChild(productColor);
      productColor.innerHTML = productLocalStorage[product].colorProduct;
      productColor.style.fontSize = "20px";

      // Insertion du prix
      let productPrice = document.createElement("p");
      productItemContentTitlePrice.appendChild(productPrice);
      productPrice.innerHTML = productLocalStorage[product].productPrice + " €";

      // Insertion de l'élément "div"
      let productItemContentSettings = document.createElement("div");
      productItemContent.appendChild(productItemContentSettings);
      productItemContentSettings.className = "cart__item__content__settings";

      // Insertion de l'élément "div"
      let productItemContentSettingsQuantity = document.createElement("div");
      productItemContentSettings.appendChild(
        productItemContentSettingsQuantity
      );
      productItemContentSettingsQuantity.className =
        "cart__item__content__settings__quantity";

      // Insertion de "Qté : "
      let productQte = document.createElement("p");
      productItemContentSettingsQuantity.appendChild(productQte);
      productQte.innerHTML = "Qté : ";

      // Insertion de la quantité
      let productQuantity = document.createElement("input");
      productItemContentSettingsQuantity.appendChild(productQuantity);
      productQuantity.value = productLocalStorage[product].quantityProduct;
      productQuantity.className = "itemQuantity";
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");

      // Insertion de l'élément "div"
      let productItemContentSettingsDelete = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsDelete);
      productItemContentSettingsDelete.className =
        "cart__item__content__settings__delete";

      // Insertion de "p" supprimer
      let productSupprimer = document.createElement("p");
      productItemContentSettingsDelete.appendChild(productSupprimer);
      productSupprimer.className = "deleteItem";
      productSupprimer.innerHTML = "Supprimer";
    }
  }
}
getCart();

function getTotals() {
  // Récupération de la quantité totale
  let elemsQtt = document.getElementsByClassName("itemQuantity");
  let myLength = elemsQtt.length,
    totalQtt = 0;

  for (let i = 0; i < myLength; ++i) {
    totalQtt += elemsQtt[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQtt;
  console.log(totalQtt);

  // Récupération du prix total
  totalPrice = 0;

  for (let i = 0; i < myLength; ++i) {
    totalPrice +=
      elemsQtt[i].valueAsNumber * productLocalStorage[i].productPrice;
  }

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
  console.log(totalPrice);
}
getTotals();

// Modification d'une quantité de produit
function modifyQtt() {
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let q = 0; q < qttModif.length; q++) {
    qttModif[q].addEventListener("change", (event) => {
      event.preventDefault();

      //Selection de l'element à modifier en fonction de son id ET sa couleur
      let quantityModif = productLocalStorage[q].quantityProduct;
      let qttModifValue = qttModif[q].valueAsNumber;

      const resultFind = productLocalStorage.find(
        (el) => el.qttModifValue !== quantityModif
      );

      resultFind.quantityproduct = qttModifValue;
      productLocalStorage[q].quantityProduct = resultFind.quantityProduct;

      localStorage.setItem("product", JSON.stringify(productLocalStorage));

      // refresh rapide
      location.reload();
    });
  }
}
modifyQtt();

// Suppression d'un produit
function deleteProduct() {
  let btn_supprimer = document.querySelectorAll(".deleteItem");

  for (let j = 0; j < btn_supprimer.length; j++) {
    btn_supprimer[j].addEventListener("click", (event) => {
      event.preventDefault();

      //Selection de l'element à supprimer en fonction de son id ET sa couleur
      let idDelete = productLocalStorage[j].idProduct;
      let colorDelete = productLocalStorage[j].colorProduct;

      productLocalStorage = productLocalStorage.filter(
        (el) => el.idProduct !== idDelete || el.colorProduct !== colorDelete
      );

      localStorage.setItem("product", JSON.stringify(productLocalStorage));

      //Alerte produit supprimé et refresh
      alert("Ce produit a bien été supprimé du panier");
      location.reload();
    });
  }
}
deleteProduct();

//Instauration formulaire avec regex
function getForm() {
  // Ajout des Regex
  let form = document.querySelector(".cart__order__form");

  //Création des expressions régulières
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  // Ecoute de la modification du prénom
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  // Ecoute de la modification du prénom
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  // Ecoute de la modification du prénom
  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  // Ecoute de la modification du prénom
  form.city.addEventListener("change", function () {
    validCity(this);
  });

  // Ecoute de la modification du prénom
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  //validation du prénom
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner votre prénom.";
    }
  };

  //validation du nom
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner votre nom.";
    }
  };

  //validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner votre adresse.";
    }
  };

  //validation de la ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner votre ville.";
    }
  };

  //validation de l'email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    }
  };
}
getForm();

//Envoi des informations client au localstorage
function postForm() {
  const btn_commander = document.getElementById("order");

  //Ecouter le panier
  btn_commander.addEventListener("click", (event) => {
    //Récupération des coordonnées du formulaire client
    let inputName = document.getElementById("firstName");
    let inputLastName = document.getElementById("lastName");
    let inputAdress = document.getElementById("address");
    let inputCity = document.getElementById("city");
    let inputMail = document.getElementById("email");

    //Construction d'un array depuis le local storage
    let idProducts = [];
    for (let i = 0; i < productLocalStorage.length; i++) {
      idProducts.push(productLocalStorage[i].idProduct);
    }
    console.log(idProducts);

    const order = {
      contact: {
        firstName: inputName.value,
        lastName: inputLastName.value,
        address: inputAdress.value,
        city: inputCity.value,
        email: inputMail.value,
      },
      products: idProducts,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);

        document.location.href = "confirmation.html";
      })
      .catch((err) => {
        alert("Problème avec fetch : " + err.message);
      });
  });
}
postForm();
