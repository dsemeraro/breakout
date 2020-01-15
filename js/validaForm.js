function validaForm(tipo) {

	// Variabili associate ai campi del form
	var username = document.forms["modulo"]["username"].value;
	var password = document.forms["modulo"]["password"].value;

	var reg_exp = /^[a-z0-9_]+$/i;

	if (!reg_exp.test(username) || (username == "") || (username == "undefined") || (username.length > 20)){
		error("Inserire un nome valido composto solo di caratteri alfanumerici o underscore.(max 20 caratteri)");
		document.forms["modulo"]["username"].focus();
		return false;
	}
	
	//controllo PASSWORD
	else if ((password == "") || (password == "undefined")){
		error("Il campo Password è obbligatorio.");
		document.forms["modulo"]["password"].focus();
		return false;
	}
}

function error(text){
	
	var box = document.getElementById("errorBox");
	
	//pulire la casella degli errori
	while(box.firstChild){
		box.removeChild(box.firstChild);
	}
	
	var span = document.createElement("span");
	var textNode = document.createTextNode(text);
	span.appendChild(textNode);
	box.appendChild(span);
}