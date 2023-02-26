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

            // add 'error-line' if passwords are different and confirm password has some values 
            confirmInput.className = passwordInput.validity.customError && confirmInput.value.length !== 0 ? 'error-line' : '' ;
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
// if some of inputs is wrong then show an 'error' message about 
// this input
formElement.addEventListener('submit', e => {
    // turn off basic behaviour element
    e.preventDefault();
    
    // call function to show errors
    showErrors();

    // leave callback function if validInputs returns false;
    if(!validInputs()) return;
    // leave event if password values are different
    // if(passwordInput.validity.valid === false || confirmInput.validity.valid === false)  return;
    // comparePasswords();
    console.log('valid inputs');
});