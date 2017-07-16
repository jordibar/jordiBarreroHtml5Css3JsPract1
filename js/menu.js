/*____________________SMOOTH SCROLL_________________*/

/* Lista con todos los items del nav */
var navbarItems = document.getElementsByClassName('navbar-list-item');

for (var i = 0; i < navbarItems.length; i++) {
	navbarItems[i].addEventListener('click', function(event) {
		//queremos saber el href de cada navbarItem
		var sectionToGo = this.getElementsByTagName('a')[0].href.split("#");

		//Asignar la clase active
		deleteActiveClass();
		this.classList.add('active');

		//Hacemos control de errores para la operación anterior
		if (sectionToGo.length === 2) {
			//Quitamos el comportamiento por defecto
			event.preventDefault();

			var goTo = sectionToGo[sectionToGo.length - 1];
			getElementByIdAndScroll(goTo);

		}

	});
}


function getElementByIdAndScroll(id) {
	var elem;
	if(id === '') {
		elem = document.getElementById('nav-header');
	}else{
		elem = document.getElementById(id);
	}

	scrollToElement(elem);

}







function scrollToElement(element) {



	//Para saber cuantos px tenemos que saltar para llegar a la sección deseada
	var jump = element.getBoundingClientRect().top * 0.3 -14;


	var getScrollVar = function (){
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

	}


	//Cambiamos la propiedad scrollTop
	window.pageYOffset += jump;
	document.documentElement.scrollTop  += jump;
	document.body.scrollTop += jump;




	if(!element.lastJump || element.lastJump > Math.abs(jump)) {
		element.lastJump = Math.abs(jump);

		//función recursiva
		setTimeout(function() {
			scrollToElement(element);
		}, 60);

	}else{
		element.lastJump = null;
	}
}


function deleteActiveClass() {
	for(var i = 0; i < navbarItems.length; i++) {
		navbarItems[i].classList.remove('active');
	}
}
