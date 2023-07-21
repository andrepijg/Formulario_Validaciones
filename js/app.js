import { validacion } from "./validaciones.js";

const inputs = document.querySelectorAll("input"); //Este all me da un arreglo, porque me trae todos los inputs, por lo tanto lo tengo que recorrer por medio de un arreglo

inputs.forEach (input => {
    input.addEventListener('blur', (input) => {
        validacion(input.target)
    });
});