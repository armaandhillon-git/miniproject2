

// Funtion to validate username
function validate_username(){
    let username = document.getElementById('username').value;
    document.getElementById('usernameError').innerHTML = '';
    if(username.length < 5){
        document.getElementById('usernameError').innerHTML = 'username must be at least 5 characters';
        return false;
    }
    if(!username.match(/^[a-zA-Z0-9]+$/)){
        document.getElementById('usernameError').innerHTML = 'username can only be alpha numeric characters';
        return false;
    }
    if(username.match(/\d[a-zA-Z]/)){
        document.getElementById('usernameError').innerHTML = 'numbers can only appear at end of username';
        return false;
    }
    return true;
}



// Funtion to validate password
function validate_password(){
    let password = document.getElementById('password').value;
    document.getElementById('passwordError').innerHTML = '';

    if(password.length < 5){
        document.getElementById('passwordError').innerHTML = 'password must be atleast 5 characters';
        return false;
    }
    if(!password.substr(0,1).match(/[a-zA-Z]/)){
        document.getElementById('passwordError').innerHTML = 'password must start with a letter';
        return false;
    }
    if(!(password.match(/[^\w\s_ ]/) && password.match(/[0-9]/) && !password.match(/[\s]/)) ){
        document.getElementById('passwordError').innerHTML = 'password must contain at least one special character, one number and a letter';
        return false;
    }
    return true;
}



function validate_form(event){

    let is_valid_username = validate_username(); // check if username is valid
    let is_valid_password = validate_password();
    let is_valid_size = false;
    let is_valid_age = false;
    let checked_size = document.querySelector('input[name = "size"]:checked');
    if(checked_size != null){  //Test if size was checked
        is_valid_size = true;
        document.getElementById('sizeError').innerHTML = '';
    }
    else{
        document.getElementById('sizeError').innerHTML = 'Please select size';
    }
    let age = document.getElementById('age').value;
    if(age != ""){
        is_valid_age = true;
        document.getElementById('ageError').innerHTML = '';
    }
    else{
        document.getElementById('ageError').innerHTML = 'Select age';
    }

    if([is_valid_username, is_valid_password, is_valid_age, is_valid_size].includes(false)){
        document.getElementById("formError").style.display = 'block';
        event.preventDefault();
        return;
    }



}

