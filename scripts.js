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

  var myUser = new Usuario(nombreUser, apellidoUser, edadUser, generoUser);
  console.log(myUser);
  myUser.saludar();
};
