"use strict";

const formElement = document.querySelector('.form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmpass');
const firstNameInput = document.getElementById('firstname');
const phoneInput = document.getElementById('phone');

// all input element in signup form
const inputs = document.querySelectorAll('input');

// object, with regex properties;
const regex = {
    tel: `\\d{3}[\\-]\\d{3}[\\-]\\d{4}`,
    text: `^[a-zA-Z][a-zA-Z]{2,}$`,
    email: `^\\w+([\\.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,3})+$`,
    password: `(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}`,
}

// function to loading up all initial values for form elements
function initForm(){
    // set noValidate property to true, then data aren'te be validated in html
    formElement.noValidate = true;

    // Loading pattern attribute to each of inputs
    inputs.forEach(input => {
        input.pattern = regex[input.type];
    });
}


// function to check  whether the typing is correct or not
function checkError(input){

    // if input is not required we leave the function
    if(input.value.length === 0 && !input.required){
        input.className = '';
        return;
    } 

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
        comparePasswords(); // we check if password values are the same or different 
    }

    else {
        input.className = 'success-line'
    }
}

// function compare 
function comparePasswords(){
    if(passwordInput.value !== confirmInput.value){

        // next we set password inputs validation
        confirmInput.setCustomValidity('Different passwords!!!');
        passwordInput.setCustomValidity('Different passwords!!!');

        // add 'error-line' if passwords are different and confirm password has some values 
        confirmInput.className = passwordInput.validity.customError && confirmInput.value.length !== 0 ? 'error-line' : '' ;

    } else {
        confirmInput.className = 'success-line';
        // we clear validation from password inputs
        confirmInput.setCustomValidity('');
        passwordInput.setCustomValidity('');
    }
}

function clearInputMessage(input){
    input.nextElementSibling.textContent = '';
    input.className = '';
}

// function assign text to prompt class element  
function showInputMessage(input, msg){
    input.nextElementSibling.textContent = msg || '';
    input.className = msg ? 'error' : 'success';    //style input field element 
}

// function show the result of validation inputs 
function showErrors(){
    // loop over on each input to check validation and show error
    Array.from(inputs).forEach(input => {

        // leave looping input if input is valid 
        if(input.validity.valid){
            showInputMessage(input);
            return;
        }

        // clear input field with message and input class
        clearInputMessage(input);

        // check is input value empty
        if(input.validity.valueMissing){
            showInputMessage(input, 'Input field is empty!');
        }
        // check is input value too shorst
        else if(input.validity.tooShort){
            showInputMessage(input, `Input field requires at least ${input.minLength} characters!`);
        }
        // checking input correct pattern value
        else if(input.validity.patternMismatch){
            showInputMessage(input, 'Input field is bad typing!');
        }
        
        // Checking  custom validity of comparision password inputs
        else if(input.validity.customError && input.type === 'password'){
            
            passwordInput.nextElementSibling.textContent = `different passwords`;
            passwordInput.className = 'error';
            confirmInput.className = 'error';  
        }

    }); 
}

function validInputs(){
    // we check whether or not all inputs are valid
    return Array.from(inputs).every(input => input.validity.valid); 
}


// event listener for all inputs to check correct validation while typing
inputs.forEach(input => {
    input.addEventListener('input', e => {
        checkError(e.target);       
    })
});

// event listener to submit values
formElement.addEventListener('submit', e => {
    // turn off basic behaviour element
    e.preventDefault();
    
    // call function to show errors
    showErrors();

    // leave callback form event function if one of inputs is invalid;
    if(!validInputs()) return;

    console.log('valid inputs');
});


initForm();