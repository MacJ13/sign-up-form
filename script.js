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

// function compares password and confirm password input
function comparePasswords(){
    // leave the function if the input values are the same
    if(passwordInput.value === confirmInput.value) return;

    // add text about failure 
    // add 'error' class to password inputs 
    passwordInput.nextElementSibling.textContent = 'different passwords!!!'
    passwordInput.className = 'error';
    confirmInput.className = 'error';
}


// event listener for all inputs to check correct validation while typing
inputs.forEach(input => {
    input.addEventListener('input', e => {
        checkError(e.target);       
    })
});

// event listener to submit values
// if some of inputs is wrong then show an 'error' message about 
// this input
formElement.addEventListener('submit', e => {
    // turn off basic behaviour element
    e.preventDefault();
    
    // loop over on each input to check validation
    Array.from(inputs).forEach(input => {
        
        // clear input from 'error' class, also clear error message 
        input.className = '';
        input.nextElementSibling.textContent = '';

        // leave if value has correct validation
        if (input.validity.valid) return;
        
    
        console.log(input.id + ": is valid : ", input.validity);
        
        // if(input.value.length === 0 && !input.required)  return;
        
        // check is input value empty
        if(input.validity.valueMissing){
            input.nextElementSibling.textContent = `${input.previousElementSibling.textContent} is empty!`;
            input.className = 'error';    
        }
        // check is input value too shorst
        else if(input.validity.tooShort){
            input.nextElementSibling.textContent = `${input.id} requires at least ${input.minLength} characters!!!`;
            input.className = 'error';
        }

        // check the input value has correct spelling in typing
        else if(input.validity.customError){
            input.nextElementSibling.textContent = `bad type value `;
            input.className = 'error';
        }
        // else if(!regex[input.type].test(input.value)){
        //     input.nextElementSibling.textContent = `bad type value `;
        //     input.className = 'error';
        //     return;
        // }

    }); 

    if(passwordInput.validity.valid === false || confirmInput.validity.valid === false)  return;
    comparePasswords();
    
});