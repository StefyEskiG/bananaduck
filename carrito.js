function traerProductos() {
  $.ajax({
    type: "GET",
    url: "productos.json",
    dataType: "json",
  }).done(function (productos) {
    console.log("Productos traidos", productos);
    dibujarCatalogoDeProductos(productos);
  });
}

function guardarCarritoEnMemoria(carrito) {
  const carritoString = JSON.stringify(carrito);
  localStorage.setItem("carritoGuardar", carritoString);
}

function vaciarCarrito() {
  carrito = {};
  dibujarTablaDelCarrito();
}

const $contendorProductos = $("#container-prods");
const dibujarCatalogoDeProductos = (productos) => {
  const template = document.querySelector("#template-prods").content;
  const fragment = document.createDocumentFragment();

  productos.forEach((producto) => {
    template.querySelector("img").setAttribute("src", producto.imagen);
    template.querySelector("h5").textContent = producto.title;
    template.querySelector("p span").textContent = producto.precio;
    template.querySelector("button").dataset.id = producto.id;
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });
  $contendorProductos.append(fragment);
  botonAgregarAlCarrito(productos);
};

let carrito = {};
const carritoGuardado = localStorage.getItem("carritoGuardar");
if (carritoGuardado) {
  carrito = JSON.parse(carritoGuardado);
}

const botonAgregarAlCarrito = (data) => {
  const $botones = $(".card button");
  $botones.each((index, btn) => {
    $(btn).on("click", () => {
      const producto = data.find(
        (item) => item.id === parseInt(btn.dataset.id)
      );
      producto.cantidad = 1;
      if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
      }
      carrito[producto.id] = { ...producto };
      dibujarTablaDelCarrito();
    });
  });
};

const botonesCarrito = () => {
  const $botonesAgregar = $("#items .btn-info");
  const $botonesEliminar = $("#items .btn-danger");

  $botonesAgregar.each((index, btn) => {
    $(btn).on("click", () => {
      console.log("agregando...");
      const producto = carrito[btn.dataset.id];
      producto.cantidad++;
      carrito[btn.dataset.id] = { ...producto };
      dibujarTablaDelCarrito();
    });
  });

  $botonesEliminar.each((index, btn) => {
    $(btn).on("click", () => {
      console.log("eliminando...");
      const producto = carrito[btn.dataset.id];
      producto.cantidad--;
      if (producto.cantidad === 0) {
        delete carrito[btn.dataset.id];
      } else {
        carrito[btn.dataset.id] = { ...producto };
      }
      dibujarTablaDelCarrito();
    });
  });
};

const tablaDeCarrito = document.querySelector("#items");
const dibujarTablaDelCarrito = () => {
  tablaDeCarrito.innerHTML = "";
  const template = document.querySelector("#template-carrito").content;
  const fragment = document.createDocumentFragment();
  Object.values(carrito).forEach((producto) => {
    //console.log(producto);
    template.querySelector("th").textContent = producto.id;
    template.querySelectorAll("td")[0].textContent = producto.title;
    template.querySelectorAll("td")[1].textContent = producto.cantidad;
    template.querySelector("span").textContent =
      producto.precio * producto.cantidad;

    template.querySelector(".btn-info").dataset.id = producto.id;
    template.querySelector(".btn-danger").dataset.id = producto.id;

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });
  tablaDeCarrito.appendChild(fragment);

  dibujarFooterDeCarrito();
  botonesCarrito();
  guardarCarritoEnMemoria(carrito);
};

const tablaFooter = document.querySelector("#footer-carrito");
const dibujarFooterDeCarrito = () => {
  tablaFooter.innerHTML = "";
  const template = document.querySelector("#template-footer").content;
  const fragment = document.createDocumentFragment();

  const totalCantidad = Object.values(carrito).reduce(
    (a, { cantidad }) => a + cantidad,
    0
  );
  const totalPrecio = Object.values(carrito).reduce(
    (a, { cantidad, precio }) => a + cantidad * precio,
    0
  );
  //console.log(totalCantidad);

  template.querySelectorAll("td")[0].textContent = totalCantidad;
  template.querySelector("span").textContent = totalPrecio;

  const clone = template.cloneNode(true);
  fragment.appendChild(clone);
  tablaFooter.appendChild(fragment);

  const $botonVaciar = $("#vaciar-carrito");
  $botonVaciar.on("click", vaciarCarrito);
};

// Iniciar aplicacion
$(document).ready(function () {
  traerProductos();
  dibujarTablaDelCarrito();
  dibujarFooterDeCarrito();
});
