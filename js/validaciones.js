/* const birthDate = document.querySelector("#birth");

//blur es un método que nos indica que la acción se hará cuando quitemos el ratón de ese input.

birthDate.addEventListener("blur", (event) => {
  validarNacimiento(event.target); //me permite seleccionar el elemento hijo html que quiero seleccionar (target)
}); */

export function validacion(input) {
    const tipoDeInput = input.dataset.tipo; //el dataset nos permite obtener toda las colecciones de los datasets y el .tipo es para obtener especificamente el que le asignamos a nuestro input.   
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    } 
    
    if (input.validity.valid){
      input.parentElement.classList.remove("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = ""; //innerHTML reemplaza o coloca el contenido de un elemento

    }else {
      input.parentElement.classList.add("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input);
    }
}

// se crea un array con el tipo de los errores
const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
  "tooShort"  
]

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacio"
  },
  
  email: {
    valueMissing: "El campo email no puede estar vacio",
    typeMismatch: "El correo no es válido"
  },

  password: {
    valueMissing: "El campo contraseña no puede estar vacio",
    patternMismatch: "Al menos 6 caracteres, máximo 12 caracteres, debe contener una letra mayúsculas, una minúscula y no debe contener caractéres especiales" //valida si el patrón regex que colocamos coincide con lo que ingreso el usuario
  },

  nacimiento: {
    valueMissing: "El campo de fecha no puede estar vacio",
    customError: "Debes ser mayor de 18 años para registrate" // esta es la validación que hicimos con el setCustomValidity
  },

  telefono: {
    valueMissing: "El campo de teléfono no puede estar vacio",
    tooShort: "El formato requerido son 10 dígitos"

  },

  direccion:{
    valueMissing: "El campo de teléfono no puede estar vacio",
    patternMismatch: "La dirección debe contener de 10 a 40 caracteres"
  },

  ciudad:{
    valueMissing: "El campo de teléfono no puede estar vacio",
    patternMismatch: "La dirección debe contener de 4 a 40 caracteres"
  },

  departamento:{
    valueMissing: "El campo de teléfono no puede estar vacio",
    patternMismatch: "La dirección debe contener de 4 a 40 caracteres"
  },



}



// esta constante es un objeto para que coincidan el nombre del tipo con la llave dentro del sujeto.  La palabra nacimiento es el nombre que le colocamos al dataset (data-birth = "nacimiento")
const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value); //me captura el valor del input que me colocó el cliente
  let mensaje = "";
  if (!mayorEdad(fechaCliente)) {
    mensaje = "Debes ser mayor de 18 años para registrate";
  }
  input.setCustomValidity(mensaje); //El metodo HTMLSelectElement.setCustomValidity() define el mensaje de validación personalizado para el elemento seleccionado con el mensaje especifico. Usa una string vacia para indicar que ese elemento no tiene error de validación customizado.
}

function mayorEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}


// Con esta función lo que necesitamos es acceder a los mensajes de error de la constante mensajesDeEerror
// Los paréntesis marcan una excepción en el código, en este caso un posible error de programa.  Los corchtes marcan el tipo de error dentro del input
function mostrarMensajeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if(input.validity[error]){
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
    
  });
  return mensaje;
  
}