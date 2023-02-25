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
// const regex = {
//     tel : new RegExp(/\d{3}[\-]\d{3}[\-]\d{4}/),
//     text: new RegExp(/^[a-zA-Z][a-z]{2,}$/),
//     email : new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
//     password : new RegExp(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
// };

// object, with regex properties;
const regex = {
    tel: `\\d{3}[\\-]\\d{3}[\\-]\\d{4}`,
    text: `^[a-zA-Z][a-zA-Z]{2,}$`,
    email: `^\\w+([\\.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,3})+$`,
    password: `(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}`,
}

// Loading pattern attribute to each of inputs
inputs.forEach(input => {
    input.pattern = regex[input.type];
});

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
    // input.className = !regex[input.type].test(input.value) ?
    //     "error-line" :
    //     "success-line";
    // console.log(!regex[input.type].test(input.value));
    console.log(input.validity);
    // checking is there input value
    if(input.validity.valueMissing){
        input.className = 'error-line';
    }
    // checking is input value is too short
    else if(input.validity.tooShort){
        input.className = 'error-line'
    }

   // checking pattern validity to input
    else if(input.validity.patternMismatch){
        input.className = 'error-line';    
    }

    // checking is password and confirm input values are the same 
    else if(input.type === 'password' && !input.validity.patternMismatch){
        passwordInput.className = 'success-line';

        // we check if passwords value are different 
        if(passwordInput.value !== confirmInput.value){
            console.log('password are different');

            // next we set password inputs validation
            confirmInput.setCustomValidity('Different passwords!!!');
            passwordInput.setCustomValidity('Different passwords!!!');

            confirmInput.className = input.validity.customError ? 'error-line' : '' ;
        } else {
            console.log('passwords are the same');
            confirmInput.className = 'success-line';
            // we clear validation from password inputs
            confirmInput.setCustomValidity('');
            passwordInput.setCustomValidity('');
        }
    }

    else {
        input.className = 'success-line'
    }
}

// function compares password and confirm password input
// function comparePasswords(){
//     // leave the function if the input values are the same
//     if(passwordInput.value === confirmInput.value) return;

//     // add text about failure 
//     // add 'error' class to password inputs 
//     passwordInput.nextElementSibling.textContent = 'different passwords!!!'
//     passwordInput.className = 'error';
//     confirmInput.className = 'error';
// }

// function show the result of validation inputs 
function showErrors(){
    // loop over on each input to check validation and show error
    Array.from(inputs).forEach(input => {

        // leave function if form element is not a 'input' element
        // if(input.nodeName !== 'INPUT') return;

        // leave if value has correct validation
        // if (input.validity.valid) {
        //     input.className = 'success';  
        //     input.nextElementSibling.textContent = '';
        //     return;
        // };
        
        // clear input from 'error' or 'success' class attribute
        // clear input from class atribute, also clear error message 
        input.nextElementSibling.textContent = '';
        input.className = '';
        
        
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

        else if(input.validity.patternMismatch){
            input.nextElementSibling.textContent = 'bad type value'
            input.className = 'error';
        }

        // check the input value has correct spelling in typing
        // else if(input.validity.customError){
        //     input.nextElementSibling.textContent = `bad type value `;
        //     input.className = 'error';
        // }

    }); 
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
    
    // call function to show errors
    showErrors();

    // leave event if password values are different
    // if(passwordInput.validity.valid === false || confirmInput.validity.valid === false)  return;
    // comparePasswords();
    
});