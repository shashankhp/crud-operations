
let globalTaskData = [];
let add_to_cart_btns = document.getElementsByClassName('btn-primary');
let mainContainer = document.getElementsByTagName('tbody')[0]
let quantity = document.getElementsByClassName('num');
console.log(add_to_cart_btns);
let removeImage = document.getElementsByClassName('button-danger')



for(let i=0; i<add_to_cart_btns.length; i++){
    add_to_cart_btns[i].addEventListener('click', addToCart);
}


function addToCart(event){
    let btn = event.target
    let btn_parent = btn.parentElement
    let btn_grandparent = btn.parentElement.parentElement;
    let itemName= btn_parent.children[0].innerText
    let itemPrice= btn_parent.children[1].innerText
    let itemImage=btn_grandparent.children[0].src
    // console.log(btn_parent)
    // console.log(btn_grandparent)
    let itemContainer = document.createElement('tr')
    itemContainer.innerHTML = `
    <td><input class="checkbox" type="checkbox"></td>
    <td><img class="preserve-width border-circle" src="${itemImage}" width="40" alt=""></td>
    <td class="table-link">
        <h3 class = "item-name">${itemName}</h3>
    </td>
    <td class="text-truncate item-price"><h3>${itemPrice}</h3></td>
    <td><input type = 'number' class = 'num' value = '1'></td>
    <td class="text-truncate total-price"><h3>${itemPrice}</h3></td>
    <td><button class="button button-danger" type="button" style="background-color:red;color: white; border: none;">Remove</button></td>`
    
    mainContainer.append(itemContainer)
    for(let i=0; i<quantity.length; i++){
        quantity[i].addEventListener('change', updateTotal)
    }
   globalTaskData.push(itemContainer);
    saveToLocalStorage();

    for(let i=0; i<removeImage.length; i++){
        removeImage[i].addEventListener('click', removeItem);
    }
    grandTotal();
    
}

function updateTotal(event){
    no_of_items = event.target;
    no_of_items_parent = no_of_items.parentElement.parentElement
    updated_price = no_of_items_parent.getElementsByClassName('item-price')[0]
    total_price = no_of_items_parent.getElementsByClassName('total-price')[0]
    updated_price_c = updated_price.children[0].innerText.replace('Rs.', '')
    total_price.children[0].innerText= no_of_items.value * updated_price_c
    grandTotal()
   if(isNaN(no_of_items.value)|| Number(no_of_items)<0){
       no_of_items.value=1;
   }
}

function grandTotal(){
    let total = 0
    let grand_total = document.getElementsByClassName('grand-total')[0]
    all_total_fields = document.getElementsByClassName('total-price')
    for(let i = 0; i < all_total_fields.length; i++){
        all_prices = Number(all_total_fields[i].innerText.replace('Rs.', ''))
        total+=all_prices
    }
    grand_total.children[0].innerText = "Rs."+total
     grand_total.children[0].style.fontWeight = 'bold'
    console.log(total)
}

function removeItem(event){
    del_btn = event.target
    del_btn_parent = del_btn.parentElement.parentElement
    del_btn_parent.remove()
    console.log(del_btn)
    grandTotal()
    
}

const saveToLocalStorage =()=> {
    localStorage.setItem("tasky",JSON.stringify({tasks: globalTaskData})); 
    
}
const reloadTaskCard =()=> {
    const localStorageCopy = JSON.parse(localStorage.getItem("tasky")); 
    if(localStorageCopy){
        globalTaskData = localStorageCopy["tasks"]; 
    }
    
    globalTaskData.map((cardData) =>{
        taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
    })
}

