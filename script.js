"use strict";

const formElement = document.querySelector('.form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmpass');
const firstNameInput = document.getElementById('firstname');
const phoneInput = document.getElementById('phone');

// all input element in signup form
const inputs = document.querySelectorAll('input');

// object, with regex properties
const regex = {
    tel : new RegExp(/\d{3}[\-]\d{3}[\-]\d{4}/),
    text: new RegExp(/^[a-zA-Z][a-z]{2,}$/),
    email : new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    password : new RegExp(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
};

// set noValidate property to true, then data aren'te be validated in html
formElement.noValidate = true;


// function to check  whether the typing is correct or not
function checkError(input){

    // if input is not required we leave the function
    if(input.value.length === 0 && !input.required){
        input.className = '';
        return;
    } 

    // we add class to element according to regex rule
    input.className = !regex[input.type].test(input.value) ?
        "error-line" :
        "success-line";
    console.log(!regex[input.type].test(input.value));

    // we set customValidaty depending on regex
    if(!regex[input.type].test(input.value)){

        input.setCustomValidity("bad input typing");
    }
    else {
        input.setCustomValidity("");
    }
}

