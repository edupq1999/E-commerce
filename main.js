// productos de la tienda

import {articles} from "./js/data.js";

const shop = document.querySelector(".shop");
const contentCar=document.querySelector('.car_body');
const navbarNum = document.querySelector('.navbar_num');
const monto = document.querySelector('#total');

let html='';
let cart = {};

articles.forEach(({id, name, description, price, stock, urlImages}) => {
    html += `
        <div class="shop_article" >
            <img src="${urlImages}" alt="${name}" class="shop_article_img">
            <h1 class="shop_article_tittle">${name}</h1>
            <p class="shop_article_info">${description}</p>
            <div class="shop_article_btn">
                <p class="shop_article_price">Precio: $${price}</p>
                <p class="shop_article_price">Stock: ${stock}</p>
                <span class="shop_article_btn" id="${id}">
                <svg class="btn" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle><path d="M13 13h2v-2.99h2.99v-2H15V5.03h-2v2.98h-2.99v2H13V13z"></path><path d="M10 17h8a1 1 0 0 0 .93-.64L21.76 9h-2.14l-2.31 6h-6.64L6.18 4.23A2 2 0 0 0 4.33 3H2v2h2.33l4.75 11.38A1 1 0 0 0 10 17z"></path></svg>
                </span>
            </div>
        </div>
    `
});

shop.innerHTML = html;

//mostrar carrito

const iconCar = document.querySelector('.navbar_carrito');
const car = document.querySelector('.car');

iconCar.addEventListener('click', (e) =>{
    car.classList.toggle('car_show');
});

//agregar a objeto

shop.addEventListener('click', (e) =>{
    if(e.target.classList.contains('btn')){
        const id= +e.target.parentElement.id;
        const find = articles.find((item) => item.id === id);

        if(cart[id]){
            cart[id].amount++;
        }else{
            cart[id] = find;
            cart[id].amount = 1;
        }
        print();
        total();
    }
})

//agregar a carrito html

function print(){
    let html='';
    const arrayCar= Object.values(cart);

    arrayCar.forEach(({id, name, price, amount, urlImages}) => {
        let subtotal = price*amount;
        html += `
            <div class="car_item">
                <div class="car_item_img">
                    <img src="${urlImages}" alt="${name}">
                </div>
                <h4 class="car_item_tittle">${name}</h4>
                <div class="car_item_options" id="${id}">
                    <i class='bx bxs-minus-circle'>-</i>
                    <span id="amount">${amount}</span>
                    <i class='bx bxs-plus-circle'>+</i>
                    <i class='bx bxs-trash-alt'>x</i>
                </div>
                <h5>Subtotal: $${subtotal}</h5>
            </div>
        `
    });
    contentCar.innerHTML=html;
};

// Aumentar, disminuir y borrar cantidad

contentCar.addEventListener('click', (e) => {
    if(e.target.classList.contains('bxs-plus-circle')){
        const id= +e.target.parentElement.id;
        cart[id].amount++;
    }
    if(e.target.classList.contains('bxs-minus-circle')){
        const id= +e.target.parentElement.id;
        cart[id].amount--;
        if (cart[id].amount<1){
            delete cart[id];
            navbarNum.innerHTML= `<p class="navbar_num">0</p>`;
        }
    }
    if(e.target.classList.contains('bxs-trash-alt')){
        const id= +e.target.parentElement.id;
        delete cart[id];
        navbarNum.innerHTML= `<p class="navbar_num">0</p>`;
    }
    print();
    total();
});

function total(){
    let cant= 0;
    let mont= 0;
    const arrayCar= Object.values(cart);
    
    arrayCar.forEach(({amount,price}) => {
        cant += +amount;
        mont += (amount*price);
        navbarNum.innerHTML= `<p class="navbar_num">${cant}</p>`;
        monto.innerHTML= `<span id="total">${mont}</span>`
    });
}