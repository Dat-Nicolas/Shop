let contentTitle;

function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  boxLink.href = "contentDetails.html?" + ob.id;

  let imgTag = document.createElement("img");
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  h3.appendChild(document.createTextNode(ob.name));

  let h4 = document.createElement("h4");
  h4.appendChild(document.createTextNode(ob.brand));

  let h2 = document.createElement("h2");
  h2.appendChild(document.createTextNode("USD " + ob.price));

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");

// BACKEND CALLING
let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    contentTitle = JSON.parse(this.responseText);
   // UPDATE A QUANTITY OF PRODUCT ON BADGE
    if (document.cookie.indexOf(",counter=") >= 0) {
      var counter = document.cookie.split(",")[1].split("=")[1];
      document.getElementById("badge").innerHTML = counter;
    }
    // LOOP FOR PRODUCTS AND ADD THEM TO CONTAINER
    contentTitle.forEach(item => {
      if (item.isAccessory) {
        containerAccessories.appendChild(dynamicClothingSection(item));
      } else {
        containerClothing.appendChild(dynamicClothingSection(item));
      }
    });
  }
};
httpRequest.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
httpRequest.send();
