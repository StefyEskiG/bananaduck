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
  $(".carrito-producto").fadeOut("slow", dibujarTablaDelCarrito);
}

const $contendorProductos = $("#container-prods");
const dibujarCatalogoDeProductos = (productos) => {
  const $template = $("#template-prods").contents();

  productos.forEach((producto) => {
    $template.find("img").attr("src", producto.imagen);
    $template.find("h5").text(producto.title);
    $template.find("p span").text(producto.precio);
    $template.find("button").get(0).dataset.id = producto.id;
    const $clone = $template.clone(true);

    $contendorProductos.append($clone);
    $clone.fadeIn(1500);
  });

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

const $tablaDeCarrito = $("#items");
const dibujarTablaDelCarrito = () => {
  $tablaDeCarrito.empty();
  const $template = $("#template-carrito").contents();

  Object.values(carrito).forEach((producto) => {
    //console.log(producto);
    $template.find("th").text(producto.id);
    $template.find("td").eq(0).text(producto.title);
    $template.find("td").eq(1).text(producto.cantidad);
    $template.find("span").text(producto.precio * producto.cantidad);

    $template.find(".btn-info").get(0).dataset.id = producto.id;
    $template.find(".btn-danger").get(0).dataset.id = producto.id;
    const $clone = $template.clone(true);
    $tablaDeCarrito.append($clone);
  });

  dibujarFooterDeCarrito();
  botonesCarrito();
  guardarCarritoEnMemoria(carrito);
};

const $tablaFooter = $("#footer-carrito");
const dibujarFooterDeCarrito = () => {
  $tablaFooter.empty();
  const $template = $("#template-footer").contents();

  const totalCantidad = Object.values(carrito).reduce(
    (a, { cantidad }) => a + cantidad,
    0
  );
  const totalPrecio = Object.values(carrito).reduce(
    (a, { cantidad, precio }) => a + cantidad * precio,
    0
  );
  $template.filter(".cantidad").text(totalCantidad);
  $template.find("span").text(totalPrecio);

  const $clone = $template.clone(true);

  $tablaFooter.append($clone);

  const $botonVaciar = $("#vaciar-carrito");
  $botonVaciar.on("click", vaciarCarrito);
};

// Iniciar aplicacion
$(document).ready(function () {
  traerProductos();
  dibujarTablaDelCarrito();
  dibujarFooterDeCarrito();
});
