console.clear();

let id = location.search.split("?")[1];

// UPDATE BADGE WITH THE NUMBER OF PRODUCTS IN THE CART
if (document.cookie.indexOf(",counter=") >= 0) {
  let counter = document.cookie.split(",")[1].split("=")[1];
  document.getElementById("badge").innerHTML = counter;
}

function dynamicContentDetails(ob) {
  // CREATE MAIN CONTAINER
  let mainContainer = document.createElement("div");
  mainContainer.id = "containerD";
  document.getElementById("containerProduct").appendChild(mainContainer);

  // CREATE IMAGE DISPLAY SECTION
  let imageSectionDiv = document.createElement("div");
  imageSectionDiv.id = "imageSection";

  let imgTag = document.createElement("img");
  imgTag.id = "imgDetails";
  imgTag.src = ob.preview;
  imageSectionDiv.appendChild(imgTag);

  // CREATE PRODUCT DETAILS SECTION
  let productDetailsDiv = document.createElement("div");
  productDetailsDiv.id = "productDetails";

  let h1 = document.createElement("h1");
  h1.textContent = ob.name;

  let h4 = document.createElement("h4");
  h4.textContent = ob.brand;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3DetailsDiv = document.createElement("h3");
  h3DetailsDiv.textContent = "USD " + ob.price;

  let h3 = document.createElement("h3");
  h3.textContent = "Mô tả";

  let para = document.createElement("p");
  para.textContent = ob.description;

  // CREATE PRODUCT PREVIEW SECTION
  let productPreviewDiv = document.createElement("div");
  productPreviewDiv.id = "productPreview";

  let h3ProductPreviewDiv = document.createElement("h3");
  h3ProductPreviewDiv.textContent = "Góc nhìn";
  productPreviewDiv.appendChild(h3ProductPreviewDiv);

  ob.photos.forEach((photo, i) => {
    let imgTagPreview = document.createElement("img");
    imgTagPreview.id = "previewImg";
    imgTagPreview.src = photo;
    imgTagPreview.onclick = function () {
      imgTag.src = photo;
    };
    productPreviewDiv.appendChild(imgTagPreview);
  });

  // CREATE ADD TO CART BUTTON
  let buttonDiv = document.createElement("div");
  buttonDiv.id = "button";

  let buttonTag = document.createElement("button");
  buttonTag.textContent = "Thêm vào giỏ hàng";
  buttonTag.onclick = function () {
    let order = id + " ";
    let counter = 1;
    if (document.cookie.indexOf(",counter=") >= 0) {
      order = id + " " + document.cookie.split(",")[0].split("=")[1];
      counter = Number(document.cookie.split(",")[1].split("=")[1]) + 1;
    }
    document.cookie = "orderId=" + order + ",counter=" + counter;
    document.getElementById("badge").innerHTML = counter;
  };
  buttonDiv.appendChild(buttonTag);

  // APPEND ALL ELEMENTS TO MAIN CONTAINER
  mainContainer.appendChild(imageSectionDiv);
  mainContainer.appendChild(productDetailsDiv);
  productDetailsDiv.appendChild(h1);
  productDetailsDiv.appendChild(h4);
  productDetailsDiv.appendChild(detailsDiv);
  detailsDiv.appendChild(h3DetailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(para);
  productDetailsDiv.appendChild(productPreviewDiv);
  productDetailsDiv.appendChild(buttonDiv);
}

// SEND REQUEST TO FETCH PRODUCT DATA FROM BACKEND
let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    let contentDetails = JSON.parse(this.responseText);
    dynamicContentDetails(contentDetails);
  }
};
httpRequest.open(
  "GET",
  "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + id,
  true
);
httpRequest.send();
