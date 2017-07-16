var form = document.getElementsByTagName('form')[0];

var inputName = document.getElementById('nombre');
var inputApellidos = document.getElementById('apellidos');
var inputEmail = document.getElementById('email');
var inputConocido = {
	conocido_1 : document.getElementById('conocido_1'),
	conocido_2 : document.getElementById('conocido_2'),
	conocido_3 : document.getElementById('conocido_3'),
	hiddenInput : document.getElementById('hiddenInput')
};
var inputTelefono = document.getElementById('telefono');
var inputTextarea = document.getElementById('textarea');



//Sección Otros, campo dinámico
function showHiddenInput() {
	if(inputConocido['conocido_3'].checked) {
		inputConocido['hiddenInput'].style.visibility = 'visible';
	}else{
		inputConocido['hiddenInput'].style.visibility = 'hidden';
	}
}

inputConocido['conocido_1'].addEventListener('click', showHiddenInput);
inputConocido['conocido_2'].addEventListener('click', showHiddenInput);
inputConocido['conocido_3'].addEventListener('click', showHiddenInput);




// Limitar el textarea a 150 palabras
var wordsLimit = 150;
var wordCount = {};

function checkWordLimit() {
	textareaContent = document.getElementById('textarea').value;
	wordCount = textareaContent.split(" ").length;

	if(wordCount > wordsLimit){
		alert("Has sobrepasado el número de palabras, el límite es de " + wordsLimit + " palabras y has introducido " + wordCount);
		inputTextarea.focus();
		event.preventDefault();
		return false;
	}
}






//Preparamos los mensajes de error
//inputName.setCustomValidity("Escribe tu nombre");

//Validación de los diferentes campos del formulario
form.addEventListener('submit', function(event) {
	
	if(inputName.checkValidity() === false) {
		alert("Escribe tu nombre");
		inputName.focus();
		event.preventDefault();  //Para evitar el envio
		return false;
	}

	if(inputEmail.checkValidity() === false) {
		alert("Escribe un email correcto");
		inputEmail.focus();
		event.preventDefault();
		return false;
	}

	if(inputTelefono.checkValidity() === false) {
		alert("Escribe un número de teléfono correcto");
		inputTelefono.focus();
		event.preventDefault();
		return false;
	}


	checkWordLimit();



});
