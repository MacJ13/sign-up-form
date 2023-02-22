"use strict";

const formElement = document.querySelector('.form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmpass');
const firstNameInput = document.getElementById('firstname');
const phoneInput = document.getElementById('phone');

const regex = {
    tel : "\d{3}[\-]\d{3}[\-]\d{4}/",
    text: "^[a-zA-Z][a-z]{2,}$",
    email : "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$",
    password : "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
};