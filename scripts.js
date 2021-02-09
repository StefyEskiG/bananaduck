function Usuario(nombre, apellido, edad, genero) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.edad = edad;
  this.genero = genero;
  this.saludar = function () {
    alert("Hola " + this.nombre + " " + this.apellido + "!");
  };
}
window.onload = function () {
  let nombreUser = prompt("¿Cómo es tu nombre?");
  let apellidoUser = prompt(
    "¿Y tu apellido? Así te decimos por tu nombre completo"
  );
  let edadUser = prompt("¿Cuántos años tenés?");
  let generoUser = prompt("¿Cuál es tu género?");

  let myUser = new Usuario(nombreUser, apellidoUser, edadUser, generoUser);
  console.log(myUser);
  myUser.saludar();

  let hi = document.querySelector(".username");
  hi.value = nombreUser + " " + apellidoUser;
};

function Producto(nombre, talle, modelo, precio) {
  this.nombre = nombre;
  this.talle = talle;
  this.modelo = modelo;
  this.precio = precio;
}

let remeraBasic = new Producto("basica", "L", "2021", 600);
let pantalonBasic = new Producto("jean", "L", "2020", 1500);
let calzadoBasic = new Producto("zapatillas", "39", "2021", 1000);

let productos = [remeraBasic, pantalonBasic, calzadoBasic];
console.log(productos);

let despedida = document.querySelector(".boton-adios");
despedida.addEventListener("click", saludar);

function saludar() {
  alert("Gracias por su compra");
  despedida.removeEventListener("click", saludar);
}
