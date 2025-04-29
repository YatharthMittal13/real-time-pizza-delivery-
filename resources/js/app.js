//code for client side
//adding event listeners to the add buttons

import axios from "axios";   //axios is used for making HTTP requests from a web browser
import {initAdmin} from './admin'
import moment from 'moment'

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

//logic for singleorder.ejs page
//fetch the current order status and accordingly
let statuses = document.querySelectorAll('.status_line')

let hiddenInput =  document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
//we are getting the order as string we need object therefore
order = JSON.parse(order)
console.log(order)

//display time on order status page
let time = document.createElement('small')

function updateStatus(order){
    let stepCompleted = true;
    statuses.forEach((status) => {
        let dataProp = status.dataset.status   //dataprop is fetching dats-status field from singleOrder.ejs 
        if(stepCompleted) {
            status.classList.add('step-completed')
        }
        if(dataProp == order.status){
            //if above condition satisfies then change then make next step as current
            let stepCompleted = false;

            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)

            if(status.nextElementSibling) {   //checks if nextsibling is present to make sure we are not at last step
            status.nextElementSibling.classList.add('current')
            }
        } 
         
    } )

}

updateStatus(order);