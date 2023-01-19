
let express = require('express');
let bodyParser = require('body-parser');
let mfunc = require('./functions'); // custome functions

let app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');  // We are using ejs as the rendering engine

let port = process.env.PORT || 8080;

app.use(express.static('public'));  // folder to serve our static files


app.get('/', function(req, res){
	
	let username = "";
	let password = "";
	let age = "";
	let size = "";
	let errors = {};
	res.render("index", {errors, age, password, size, username});   // render the views/index.ejs file (Login page)
	
});

app.get('/welcome', function(req, res){
	
	res.render("welcome"); 
	
});


app.post('/', function(req, res){
	
	let username = "";
	let password = "";
	let age = "";
	let size = "";

	// Store successful user login submission
	let user_submission = [];

	// array of stired users
	let stored_users = [["john123", "john@123"], ["mike123", "mike@123"], ["kate123", "kate@123"]];

	let allowed_ages = ["<10", "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80", "80-90", "90-100", ">100"];
	let allowed_sizes =  ["Small", "Medium", "Large"];
	
	let errors = {};


	let form = req.body;

	if('username' in form){
		username = form.username;
		let username_status = mfunc.validate_username(username);
		if(username_status != ""){
			errors['username'] = username_status;
		}
	}
	else{
		errors['username'] = "Username is required";
	}

	if('password' in form){
		password = form.password;
		let password_status = mfunc.validate_password(password);
		if(password_status != ""){
			errors['password'] = password_status;
		}
	}
	else{
		errors['password'] = "Paasword is required";
	}

	if('age' in form){
		age = form.age;
		if(!allowed_ages.includes(age)){
			errors['age'] = "Please select a valid age range";
		}
	}
	else{
		errors['age'] = "Age is required";
	}

	if('size' in form){
		size = form.size;
		if(!allowed_sizes.includes(size)){
			errors['size'] = "Please select a valid size";
		}
	}
	else{
		errors['size'] = "Size is required";
	}

	// If there is eror, we re render the page with the errors
	if(Object.keys(errors).length  > 0){
		res.render("index", {errors, age, password, size, username});
	}
	else{

		// Check the login users;
		let has_login = false;
		stored_users.forEach(function(user){
			if(username.toLocaleLowerCase() == user[0].toLocaleLowerCase() && password == user[1]){
				// Matched, login successfull
				user_submission.push({username, password, age, size});
				console.log(user_submission);
				has_login  = true;
				res.redirect("welcome");
			}
		});
		if(!has_login){
			errors['form'] = "Login details incorrect. Please try again.<br> You can try this list of stored users<br>"+JSON.stringify(stored_users);
			res.render("index", {errors, age, password, size, username});
		}		 
				
	}	
});



app.listen(port, function () {
    console.log("Running  on port " + port);
});

