//Array para almacenar las tareas
var tasks = [];

//Para pintar las tareas
var drawTasks = function() {
	$('#taskContainer').empty();

	if (tasks.length == 0) {
		$('#taskContainer').append("<li>No hay tareas pendientes</li>");
	} else {
		var contentToAdd = '';
		for (var i = 0; i < tasks.length; i++) {
			contentToAdd += '<li class="task-item tareas-pendientes">' + tasks[i].name + '<button class="deleteTask" data-task-id="' + tasks[i].id + '">Eliminar</button></li>'
		}
		$('#taskContainer').append(contentToAdd);
	}
}

//Creación de tareas
var createTask = function(name) {
	//Creamos el archivo xhr
	var XHR = new XMLHttpRequest;

	//Abrimos la petición para crear una tarea con POST
	XHR.open("POST", "http://localhost:8000/api/tasks", true);

	//Cabecera que necesitamos, donde decimos que nuestro contenido va a ser de tipo JSON
	XHR.setRequestHeader("Content-Type", "application/json");



	//Listener
	XHR.onreadystatechange = function () {
		//Como el estado que nos interesa es el 4 hacemos:
		if(XHR.readyState === 4) {
			tasks.push(JSON.parse(XHR.responseText));
			drawTasks(); //Pintar las tareas
		}else if (XHR.readyState === 4 && XHR.status === 404) {
			console.log("Página no encontrada");
		}
	}
	XHR.send(JSON.stringify({'name': name}));
}






//Recuperación de tareas
var getTasks = function() {
	//Creamos el archivo xhr
	var XHR = new XMLHttpRequest;

		//Abrimos la petición para recuperar una tarea con GET
	XHR.open("GET", "http://localhost:8000/api/tasks", true);

	//Cabecera que necesitamos, donde decimos que nuestro contenido va a ser de tipo JSON
	XHR.setRequestHeader("Content-Type", "application/json");

	
	//Listener
	XHR.onreadystatechange = function () {
		//Como el estado que nos interesa es el 4 hacemos:
		if(XHR.readyState === 4) {
			//Recibimos todas las tareas
			tasks = JSON.parse(XHR.responseText);
			drawTasks(); //Pintar las tareas
		}else if (XHR.readyState === 4 && XHR.status === 404) {
			console.log("Página no encontrada");
		}
	}

	XHR.send();
}




//Eliminar tarea
var deleteTask = function(id) {
	//Creamos el archivo xhr
	var XHR = new XMLHttpRequest();

	XHR.open("DELETE", "http://localhost:8000/api/tasks/" + id, true);

	//Cabecera que necesitamos, donde decimos que nuestro contenido va a ser de tipo JSON
	XHR.setRequestHeader("Content-Type", "application/json");

	//Listener
	XHR.onreadystatechange = function () {
		//Como el estado que nos interesa es el 4 hacemos:
		if(XHR.readyState === 4) {
			console.log("Tarea eliminada");
			getTasks();
		} else if (XHR.readyState === 4 && XHR.status === 404) {
			console.log("Página no encontrada");
		}
	}
	XHR.send();
}




//Botón de cración de tareas
document.getElementById("sendNewTask").addEventListener('click', function(event) {
	event.preventDefault;
	createTask(document.getElementById('newTaskName').value);
})



getTasks();





$(document).on('click', '.deleteTask', function(){
	var id = $(this).data('taskId');
	deleteTask(id);
});












