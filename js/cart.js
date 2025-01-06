console.clear();

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}

let cartContainer = document.getElementById('cartContainer')

let boxContainerDiv = document.createElement('div')
boxContainerDiv.id = 'boxContainer'

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob,itemCounter)
{
    let boxDiv = document.createElement('div')
    boxDiv.id = 'box'
    boxContainerDiv.appendChild(boxDiv)

    let boxImg = document.createElement('img')
    boxImg.src = ob.preview
    boxDiv.appendChild(boxImg)

    let boxh3 = document.createElement('h3')
    let h3Text = document.createTextNode(ob.name + ' × ' + itemCounter)
    boxh3.appendChild(h3Text)
    boxDiv.appendChild(boxh3)

    let boxh4 = document.createElement('h4')
    let h4Text = document.createTextNode('Giá: USD ' + ob.price)
    boxh4.appendChild(h4Text)
    boxDiv.appendChild(boxh4)


    buttonLink.appendChild(buttonText)
    cartContainer.appendChild(boxContainerDiv)
    cartContainer.appendChild(totalContainerDiv)
    return cartContainer
}

let totalContainerDiv = document.createElement('div')
totalContainerDiv.id = 'totalContainer'

let totalDiv = document.createElement('div')
totalDiv.id = 'total'
totalContainerDiv.appendChild(totalDiv)

let totalh2 = document.createElement('h2')
let h2Text = document.createTextNode('Tổng số tiền')
totalh2.appendChild(h2Text)
totalDiv.appendChild(totalh2)

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount)
{
    let totalh4 = document.createElement('h4')
    let totalh4Text = document.createTextNode(amount + " " + 'USD ')
    totalh4Text.id = 'toth4'
    totalh4.appendChild(totalh4Text)
    totalDiv.appendChild(totalh4)
    totalDiv.appendChild(buttonDiv)
}

let buttonDiv = document.createElement('div')
buttonDiv.id = 'button'
totalDiv.appendChild(buttonDiv)

let buttonTag = document.createElement('button')
buttonDiv.appendChild(buttonTag)

let buttonLink = document.createElement('a')
buttonLink.href = './orderPlaced.html?'
buttonTag.appendChild(buttonLink)

buttonText = document.createTextNode('Đặt hàng')


// BACKEND CALL
let httpRequest = new XMLHttpRequest();
let totalAmount = 0;

httpRequest.onreadystatechange = function() {
    if (this.readyState === 4) {
        if (this.status == 200) {
            // SUCCESS
            contentTitle = JSON.parse(this.responseText);

            let counter = Number(document.cookie.split(',')[1]?.split('=')[1]) || 0;
            document.getElementById("totalItem").innerHTML = ('Tổng số sản phẩm: ' + counter);

            if (counter === 0) {
                cartContainer.innerHTML = "<p>Giỏ hàng trống</p>";
                return;
            }

            let items = document.cookie.split(',')[0]?.split('=')[1]?.split(" ");
            let totalAmount = 0;

            for (let i = 0; i < counter; i++) {
                let itemCounter = 1;
                for (let j = i + 1; j < counter; j++) {
                    if (Number(items[j]) === Number(items[i])) {
                        itemCounter += 1;
                    }
                }
                totalAmount += Number(contentTitle[items[i] - 1].price) * itemCounter;
                dynamicCartSection(contentTitle[items[i] - 1], itemCounter);
                i += (itemCounter - 1);
            }
            amountUpdate(totalAmount);
        } else {
            console.log('Call failed! Status:', this.status);
        }
    }
};

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true)
httpRequest.send()
