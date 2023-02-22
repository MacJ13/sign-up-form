"use strict";

const formElement = document.querySelector('.form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmpass');
const firstNameInput = document.getElementById('firstname');
const phoneInput = document.getElementById('phone');


const inputs = document.querySelectorAll('input');
console.log(formElement);

formElement.noValidate = true;
formElement.addEventListener('submit', (e) => {
    // formElement.noValidate = false;
    
    e.preventDefault();
    Array.from(inputs).forEach( input => {
        console.log(input.id + " : is valid = ",input.validity);
        showError(input);
    })
    
    // console.log('submit form');
})

function showError(input){
    if(!input.required && input.value.length === 0) return;
    
    if(input.validity.tooShort){
        input.value = "too short!";
    }

    else if(input.validity.valueMissing){
        input.value = "value is required!!!"
    }

    else if(input.validity.typeMismatch){
        input.value = "bad typing "
    }
 
    // console.log('is required ', !input.required && input.value.length === 0);

    // console.log(input.getAttribute('type'));

}

const regex = {
    tel : "\d{3}[\-]\d{3}[\-]\d{4}/",
    text: "^[a-zA-Z][a-z]{2,}$",
    email : "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$",
    password : "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
};

const regexPhone = new RegExp(/\d{3}[\-]\d{3}[\-]\d{4}/); 
const regexName = new RegExp(/^[a-zA-Z][a-z]{2,}$/);
const regexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const regexPassword =  new RegExp(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);



emailInput.addEventListener('input', (e) => {
    e.preventDefault();
    if(!regexEmail.test(emailInput.value)){
        emailInput.className = "error-line";
    }
    else {
        emailInput.className = "success-line";
    }
    
    if(emailInput.validity.typeMismatch) {

        emailInput.setCustomValidity("I am expecting an email address! (example: example@sth.com)")
    } else {
        emailInput.setCustomValidity("");
    }

    
});

passwordInput.addEventListener('input', (e) => {
    e.preventDefault();

    
    if(passwordInput.value.length < 8 || !regexPassword.test(passwordInput.value)){
        passwordInput.className = 'error-line';
    }
    else {
        passwordInput.className = 'success-line';
        
    }

    if(passwordInput.validity.tooShort){
        passwordInput.setCustomValidity('password is too short!!');
    }
    else{
        passwordInput.setCustomValidity('');
    }
});


confirmInput.addEventListener('input', e => {
    if(confirmInput.value.length < 8 || !regexPassword.test(confirmInput.value)){
        confirmInput.className = 'error-line';
    }
    else {
        confirmInput.className = 'success-line';
        
    }

    if(confirmInput.validity.tooShort){
        confirmInput.setCustomValidity('password is too short!!');
    }
    else{
        confirmInput.setCustomValidity('');
    }
    
})

firstNameInput.addEventListener('input', e => {

    if(firstNameInput.value.length === 0){
        firstNameInput.className = '';
    }

    else if(firstNameInput.value.length < 2 || !regexName.test(firstNameInput.value)){
        firstNameInput.className = 'error-line';
    }
    else {
        firstNameInput.className = 'success-line';
    }
});

phoneInput.addEventListener('input', e => {
    console.log(regexPhone.test(phoneInput.value));
    
    if(phoneInput.value.length === 0){
        phoneInput.className = '';
    }
    

    else if(!regexPhone.test(phoneInput.value)){
        phoneInput.className = 'error';
    }
    else {
        phoneInput.className = 'success';
    }
})

