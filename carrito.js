document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    const res = await fetch("prods.json");
    const data = await res.json();
    // console.log(data)
    selectProductos(data);
    paraBotones(data);
  } catch (error) {
    console.log(error);
  }
};
const contendorProductos = document.querySelector("#container-prods");
const selectProductos = (data) => {
  const template = document.querySelector("#template-prods").content;
  const fragment = document.createDocumentFragment();
  //console.log(template);
  data.forEach((producto) => {
    //console.log(producto);
    template.querySelector("img").setAttribute("src", producto.imagen);
    template.querySelector("h5").textContent = producto.title;
    template.querySelector("p span").textContent = producto.precio;
    template.querySelector("button").dataset.id = producto.id;
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });
  contendorProductos.appendChild(fragment);
};

let carrito = {};

const paraBotones = (data) => {
  const botones = document.querySelectorAll(".card button");
  //console.log(botones);
  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      //console.log("clickeado uwu");
      //console.log(btn.dataset.id);
      const producto = data.find(
        (item) => item.id === parseInt(btn.dataset.id)
      );
      //console.log(producto);
      producto.cantidad = 1;
      if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
      }
      carrito[producto.id] = { ...producto };
      //console.log(carrito);
      selectCarrito();
    });
  });
};

const items = document.querySelector("#items");
const selectCarrito = () => {
  items.innerHTML = "";
  const template = document.querySelector("#template-carrito").content;
  const fragment = document.createDocumentFragment();
  Object.values(carrito).forEach((producto) => {
    //console.log(producto);
    template.querySelector("th").textContent = producto.id;
    template.querySelectorAll("td")[0].textContent = producto.title;
    template.querySelectorAll("td")[1].textContent = producto.cantidad;
    template.querySelector("span").textContent =
      producto.precio * producto.cantidad;

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
  items.removeChild;

  selectFooter();
  botonesCarrito();
};

const tablaFooter = document.querySelector("#footer-carrito");
const selectFooter = () => {
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
  console.log(totalCantidad);

  template.querySelectorAll("td")[0].textContent = totalCantidad;
  template.querySelector("span").textContent = totalPrecio;

  const clone = template.cloneNode(true);
  fragment.appendChild(clone);
  tablaFooter.appendChild(fragment);

  const botonVaciar = document.querySelector("#vaciar-carrito");
  botonVaciar.addEventListener("click", () => {
    carrito = {};
    selectCarrito();
  });
};

const botonesCarrito = () => {};
