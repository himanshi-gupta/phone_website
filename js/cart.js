//to get all the products on home page
let cart=document.getElementsByClassName('product__btn');
//collection of all the products
let products=[
    {
        name:'Apple iPhone 11',
        tag:'iphone6',
        price:750,
        incart:0
    },
    {
        name:'Samsung Galaxy',
        tag:'samsung5',
        price:900,
        incart:0
    },
    {
        name:'Sony WH-CH510',
        tag:'headphone4',
        price:600,
        incart:0
    },
    {
        name:'Samsung Galaxy 1',
        tag:'samsung3',
        price:850,
        incart:0
    },
    {
        name:'Apple iPhone 12',
        tag:'iphone2',
        price:450,
        incart:0
    },
    {
        name:'Sony WH-CH511',
        tag:'headphone2',
        price:300,
        incart:0
    },
    {
        name:'Samsung Galaxy 3',
        tag:'samsung1',
        price:300,
        incart:0
    },
    {
        name:'Sony WH-CH512',
        tag:'headphone1',
        price:250,
        incart:0
    },
    {
        name:'Apple iPhone XR',
        tag:'iphone1',
        price:550,
        incart:0
    }
];
//to add click event with each product 
for(let i=0;i<cart.length;i++){
    cart[i].addEventListener('click',()=>{
        cartnumber(products[i]);
        totalcost(products[i]);
    })
}
//to display cartnumber on reloading every-time on cart icon
function onloadcartnumber(){
    let productnumbers=localStorage.getItem('cartnumber');
    if(productnumbers){
        document.querySelector('#cart__total').textContent=productnumbers;
    }
}
//to increse cartnumber  in localstorage everytime product is added
function cartnumber(product){
    let productnumbers=localStorage.getItem('cartnumber');
    productnumbers=parseInt(productnumbers);
    if(productnumbers){
    localStorage.setItem('cartnumber',productnumbers+1);
    document.querySelector('#cart__total').textContent=productnumbers+1;}
    else{
        localStorage.setItem('cartnumber',1);
        document.querySelector('#cart__total').textContent=1;

    }
    setitems(product);
}
//to add items selected in localstorage
function setitems(product){
    let cartitems=localStorage.getItem('productsInCart');
    cartitems=JSON.parse(cartitems);
    if(cartitems!=null){
        if(cartitems[product.tag]==undefined){
             cartitems={
                 ...cartitems,
                 [product.tag]:product
             }
        }
        cartitems[product.tag].incart+=1;
    }
    else{
    product.incart=1;
    cartitems={
        [product.tag]:product
       }
    }
    localStorage.setItem('productsInCart',JSON.stringify(cartitems));
}
//function to add totalcost in localstorage
function totalcost(product){
    let cartcost=localStorage.getItem('totalcost');
    if(cartcost!=null){
        cartcost=parseInt(cartcost);
        localStorage.setItem('totalcost',cartcost+product.price);
    }
    else{
        localStorage.setItem('totalcost',product.price);}
}
//function to display all the items selcted on cart page
function displaycart(){
    let cartitems=localStorage.getItem('productsInCart');
    cartitems=JSON.parse(cartitems);
    let cartcost=localStorage.getItem('totalcost');
    let product_container=document.querySelector('.products');
    if(cartitems && product_container){
        product_container.innerHTML='';
        Object.values(cartitems).map(item=>{
            product_container.innerHTML+=`
            <div class="mainproduct">
            <div class="product">
            <img src="./images/trash.png" class="icon" id="${item.tag}">
            <img src="./images/${item.tag}.jpeg">
            <span>${item.name}</span></div>
            <div class="price1">$${item.price}</div>
            <div class="quantity1"><img class="plus" id="${item.tag}"  src="./images/plus.png">
            ${item.incart}<img class="minus" src="./images/minus.png" id="${item.tag}"></div>
            <div class="total1">$${item.price*item.incart}</div>
            </div>
            
            `;})
            product_container.innerHTML+=`
            <div class="total_cart"> 
                 <span class="clear">CLEAR CART</span>
                 <h4 class ="totaltitle">TOTAL COST
                 </h4>
                 <h4 class="totalprice">
                  $${cartcost}
                 </h4></div>
            `;
    }
}

onloadcartnumber();
displaycart();
//to execute certain actions on cart page
//to get all the items in cart
let cart_items=localStorage.getItem('productsInCart');
cart_items=JSON.parse(cart_items);
let cart_count=0;
//to get the total item in cart
for(let key in cart_items){
    cart_count++;
}
//to add click event with bin icon(on selecting delete the item)
for(let i=0;i<cart_count;i++){
    let trash_id=document.querySelectorAll('.icon');
    trash_id[i].addEventListener('click',deleteitem);
}
//to add click event with clear button to clear the cart
document.querySelector('.clear').addEventListener('click',clear_all);

//to add click event with plus sign to increment the quantity
for(let i=0;i<cart_count;i++){
    let items=document.querySelectorAll('.plus');
    items[i].addEventListener('click',increment_item);
}
//to add click event with minus sign to decrement the quantity
for(let i=0;i<cart_count;i++){
    let items=document.querySelectorAll('.minus');
    items[i].addEventListener('click',decrement_item);
}
//function to delete item
function deleteitem(e){
    let id_cart=e.target.id;
    let cartitems=localStorage.getItem('productsInCart');
    cartitems=JSON.parse(cartitems);
    let element_in_cart=localStorage.getItem('cartnumber');
    element_in_cart=parseInt(element_in_cart);
    localStorage.setItem('cartnumber',element_in_cart-cartitems[id_cart].incart)
    let total_cost=localStorage.getItem('totalcost');
    total_cost=parseInt(total_cost);
    localStorage.setItem('totalcost',total_cost-cartitems[id_cart].incart*cartitems[id_cart].price);
    
    let state=Reflect.deleteProperty(cartitems,id_cart);
    localStorage.setItem('productsInCart',JSON.stringify(cartitems));
    onloadcartnumber();
    displaycart();
    location.reload();  
}
//function to clear cart
function clear_all(){
    localStorage.setItem('cartnumber',0);
    localStorage.setItem('totalcost',0);
    localStorage.setItem('productsInCart',JSON.stringify({}));
    onloadcartnumber();
    displaycart();
    location.reload();  
}
//function to increment the quantity
function increment_item(e){
    let id_cart=e.target.id;
    let cartitems=localStorage.getItem('productsInCart');
    cartitems=JSON.parse(cartitems);
    let element_in_cart=localStorage.getItem('cartnumber');
    element_in_cart=parseInt(element_in_cart);
    localStorage.setItem('cartnumber',element_in_cart+1)
    let total_cost=localStorage.getItem('totalcost');
    total_cost=parseInt(total_cost);
    localStorage.setItem('totalcost',total_cost+cartitems[id_cart].price);
    cartitems[id_cart].incart+=1;
    localStorage.setItem('productsInCart',JSON.stringify(cartitems));
    onloadcartnumber();
    displaycart();
    location.reload(); 
}
//function to decrement the quantity
function decrement_item(e){
    let id_cart=e.target.id;
    let cartitems=localStorage.getItem('productsInCart');
    cartitems=JSON.parse(cartitems);
    if(cartitems[id_cart].incart>0){
    let element_in_cart=localStorage.getItem('cartnumber');
    element_in_cart=parseInt(element_in_cart);
    localStorage.setItem('cartnumber',element_in_cart-1)
    let total_cost=localStorage.getItem('totalcost');
    total_cost=parseInt(total_cost);
    localStorage.setItem('totalcost',total_cost-cartitems[id_cart].price);
    cartitems[id_cart].incart-=1;
    localStorage.setItem('productsInCart',JSON.stringify(cartitems));
    onloadcartnumber();
    displaycart();
    location.reload(); }
}




