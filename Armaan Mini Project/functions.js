let mfunc = {};

// Funtion to validate username
mfunc.validate_username = function(username){
    if(username.length < 5){
        return 'username must be at least 5 characters';
    }
    if(!username.match(/^[a-zA-Z0-9]+$/)){
        return 'username can only be alpha numeric characters';
    }
    if(username.match(/\d[a-zA-Z]/)){
        return 'numbers can only appear at end of username';
    }
    return '';
}



// Funtion to validate password
mfunc.validate_password = function(password){
    if(password.length < 5){
        return 'password must be atleast 5 characters';
    }
    if(!password.substr(0,1).match(/[a-zA-Z]/)){
        return 'password must start with a letter';
    }
    if(!(password.match(/[^\w\s_ ]/) && password.match(/[0-9]/) && !password.match(/[\s]/)) ){
        return 'password must contain at least one special character, one number and a letter';
    }
    return '';
}


module.exports = mfunc;


