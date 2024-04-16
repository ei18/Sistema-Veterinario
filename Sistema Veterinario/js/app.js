//Selectores
const mascota = document.querySelector("#name_pet");
const propietario = document.querySelector("#name_person");
const telefono = document.querySelector("#phone_number");
const fecha = document.querySelector("#date_cite");
const hora = document.querySelector("#time_cite");
const sintomas = document.querySelector("#description");
const tarjeta = document.querySelector("#card");

let mascotas = document.querySelector("form");
let eliminar;
let revisado = false;
let usuarios = [];

//Eventos
document.addEventListener("DOMContentLoaded", () => {
  informacion()
});

mascotas.addEventListener("submit", (event) => {
    event.preventDefault()
    const usuario = { 
        nombreMascota: mascota.value,
        nombrePropietario: propietario.value,
        telefonoPropietario: telefono.value,
        fechaCita: fecha.value,
        horaCita: hora.value,
        sintomasUsuario: sintomas.value,
      };

    const limpiar = Object.keys(usuario).some(key => usuario[key] == "")
    
    if (limpiar) return

      if (revisado) {
        usuarios = usuarios.filter(paciente => paciente.nombreMascota != eliminar)
      }

    usuarios.push(usuario)
    
    informacion();
    revisado = false;
    mascota.disabled = false;
    mascotas.reset();
    mascotas.classList.remove('was-validated');
});

//Funciones
function informacion() {

    tarjeta.innerHTML= "";

    usuarios.forEach((usuario) => {
      tarjeta.innerHTML += `
        <div class="card" id="child" style="width: 30rem;">
        <img src="./logo.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h4 class="card-title">Nombre de la mascota:</h4>${usuario.nombreMascota}          
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"> <strong>Propietario</strong>: ${usuario.nombrePropietario}</li>
          <li class="list-group-item"> <strong>Teléfono</strong>: ${usuario.telefonoPropietario}</li>
          <li class="list-group-item"> <strong>Fecha de la cita</strong>: ${usuario.fechaCita}</li>
          <li class="list-group-item"> <strong>Hora</strong>: ${usuario.horaCita}</li>
          <li class="list-group-item"> <strong>Síntomas</strong>: ${usuario.sintomasUsuario}</li>    
        </ul>
        <div class="card-body">
          <button type="submit" class="btn btn-outline-info btn-editar" nombre-paciente="${usuario.nombreMascota}">Editar Datos</button>
          <button type="submit" class="btn btn-outline-info btn-eliminar" nombre-paciente="${usuario.nombreMascota}">Eliminar</button>
        </div>
        </div>`
  });

  botonEliminar();
  botonEditar();
};

function botonEditar() {
  const botonEdit = document.querySelectorAll(".btn-editar");
  botonEdit.forEach(boton => {

    boton.addEventListener("click", (evento) => {

      const editar = boton.getAttribute("nombre-paciente")
      const editarInfo = usuarios.find(paciente => paciente.nombreMascota == editar)

      console.log(mascota.disabled);
      mascota.disabled = true
      mascota.value = editarInfo.nombreMascota
      propietario.value = editarInfo.nombrePropietario
      telefono.value = editarInfo.telefonoPropietario
      fecha.value = editarInfo.fechaCita
      hora.value = editarInfo.horaCita
      sintomas.value = editarInfo.sintomasUsuario
      console.log(editarInfo);
      revisado = true;

      eliminar = editar
    });
  });
};

function botonEliminar(params) {
  const botonElim = document.querySelectorAll(".btn-eliminar");
  botonElim.forEach(boton => {

    boton.addEventListener("click", (evento) => {
      const eliminar = boton.getAttribute("nombre-paciente")
      usuarios = usuarios.filter(paciente => paciente.nombreMascota != eliminar)

      informacion()

    });
  });
};


