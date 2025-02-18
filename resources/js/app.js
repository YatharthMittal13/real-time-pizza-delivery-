//code for client side
//adding event listeners to the add buttons

import axios from "axios";   //axios is used for making HTTP requests from a web browser
import {initAdmin} from './admin'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')


function updateCart(pizza){
    axios.post('/update-cart',pizza).then(resp =>{
        console.log(resp);
        cartCounter.innerText = resp.data.totalQty;
        window.alert("item added to cart!");
    })
} 

//function whenever you click on add button this will return that object details
addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) =>{
       console.log(e) 

       //let pizza = btn.dataset.pizza   //ths will return string    //this come from home.ejs inside button tag
        let pizza = JSON.parse(btn.dataset.pizza)      //this will return object
       console.log(pizza);             //through this we get all information related to pizza in console tab
       updateCart(pizza);
    })
});

//remove ORDER PLACED SUCESSFULLY message from all order i.e order.ejs
const alertMsg  = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(() =>{
        alertMsg.remove()
    },2000 )
}

//this will call admin.js file in resourse folder
initAdmin()
