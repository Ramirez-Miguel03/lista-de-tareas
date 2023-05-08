let arregloTareas = new Array();
let elementosGuardados = 0;
let done = new Audio('./src/clic.mp3')
let undone = new Audio('./src/messenger.mp3')

function init() {
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('sw.js').them(function(
            registration){
                //si es exitoso
                console.log('SW registrado correctamente');
            }, function(err){
                //si falla
                console.log('SW fallo', err);
            });
            
    }else{
        console.log('ERROR');
    }


    let fecha = new Date();
    console.log(fecha);
    let mesNumero = fecha.getMonth();
    let mes = "";

    switch(mesNumero) {
        case 0:
            mes="Enero";
            break;
        case 1:
            mes="Febrero";
            break;
        case 2:
            mes="Marzo";
            break;
        case 3:
            mes="Abril";
            break;
        case 4:
            mes="Mayo";
            break;
        case 5:
            mes="Junio";
            break;
        case 6:
            mes="Julio";
            break;
        case 7:
            mes="Agosto";
            break;
        case 8:
            mes="Septiembre";
            break;
        case 9:
            mes="Octubre";
            break;
        case 10:
            mes="Noviembre";
            break;
        case 11:
            mes="Diciembre";
            break;
    }

    elemento=document.getElementById('fecha').innerHTML=fecha.getDate() + 
    " de " + mes;

    if(localStorage.getItem('tareas')){
        alert("Si hay tareas");
        tareas = JSON.parse(localStorage.getItem('tareas'));
        for(i=0; i<tareas.lenght; i++) {
            arregloTareas.push(tareas[i]);
        }
        loadTareas();
    } else {
        alert("No hay tareas");

        //Crea objeto vacío
        jsonTarea = {};

        //Creamos la variables tareas en el LS y guardamos un objeto vacio.
        localStorage.setItem('tareas', JSON.stringify(jsonTarea));
    }

}

//Funcion para agregar pendientes
function agregar() {
    //Capturar elemento de entrada de texto
    tareaTexto = document.getElementById('nuevaTarea');

    //Objeto Js
    jsonTarea = {
        'valor': tareaTexto.value,
        'status': 'pendiente'
    };

    //Crear el elemento nuevo en la interfaz
    elemento= " <div class='tarea'>" +
            "<input type='checkbox' id='"+ elementosGuardados +"'>" +
            "<label>" + jsonTarea.valor + "</label>" +
            "</div>";


document.querySelector('.porhacer').innerHTML += elemento;

arregloTareas.push(jsonTarea);

localStorage.setItem('tareas', JSON.stringify(arregloTareas));

tareaTexto.value="";

elementosGuardados++;
}
function loadTareas() {
    console.log("Hola");
    for(i=0; i<tareas.length; i++) {
        elemento= " <div class='tarea'>" +
        "<input type='checkbox' id='"+ i +"'>" +
        "<label>" + tareas[i].valor + "</label>" +
        "</div>";

        if(tareas[i].status == "pendiente") {
            document.querySelector('.porhacer').innerHTML += elemento;
        } else if (tareas[i].status == "terminado") {
            document.querySelector('.terminado').innerHTML += elemento;
        }
    }

    elementosGuardados = tareas.length;
}

function cambiarEstado() {
        tareas=JSON.parse(localStorage.getItem('tareas'));

        if(tareas[i].status == "terminado") {
            tareas[i].status == "pendiente";
            undone.play();
        } else if (tareas[i].status == "pendiente") {
            tareas[i].status == "terminado";
        }


        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
