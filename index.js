const PIZZAS = [
    { ID: 1, nombre: 'muzzarella', ingredientes: ['Salsa de Tomate', 'Muzzarella', 'Aceitunas Verdes'], precio: 560, imgUrl: 'https://img.freepik.com/foto-gratis/pizza-mozzarella-aceitunas-tabla-madera_311379-1163.jpg' },
    { ID: 2, nombre: 'huevo', ingredientes: ['Salsa de Tomate', 'Muzzarella', 'Huevo Duro', 'Aceitunas negras'], precio: 590, imgUrl: 'https://www.supermercedes.com.ar/napoles/wp-content/uploads/2020/04/471112-1d01ed49-ac49-4636-bf4b-dbcb1f5eb6e3.jpg' },
    { ID: 3, nombre: 'jamon', ingredientes: ['Salsa de Tomate', 'Muzzarella', 'Jamon cocido', 'Morrones'], precio: 640, imgUrl: 'https://locosxlaparrilla.com/wp-content/uploads/2015/02/Receta-recetas-locos-x-la-parrilla-locosxlaparrilla-Receta-pizza-pizza-receta-pizza-mozzarella-jamon-morrones-pizza-mozzarella-jamon-morrones.jpg' },
    { ID: 4, nombre: 'napolitana', ingredientes: ['Salsa de Tomate', 'Muzzarella', 'Tomate fresco', 'Oregano', 'Aceitunas verdes'], precio: 630, imgUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/07/37/12/pizza-marguerita-mussarela.jpg' },
    { ID: 5, nombre: 'roquefort', ingredientes: ['Salsa de Tomate', 'Muzzarella', 'Roquefort', 'Aceitunas negras '], precio: 680, imgUrl: 'https://margherita.com.ar/wp-content/uploads/2019/05/fugazzeta-al-roquefort.jpg' },
    { ID: 6, nombre: 'fugazzeta', ingredientes: ['Queso Muzzarella', 'Cebolla', 'Oregano', 'Aceitunas verdes'], precio: 650, imgUrl: 'https://www.barilocheya.com.ar/pizzeriabase/wp-content/uploads/sites/6/2020/03/fugazeta.jpg' },
];

document.addEventListener('DOMContentLoaded', () => {
    const pizzaLocal = localStorage.setItem('PIZZAS', JSON.stringify(PIZZAS));
});

const buttonSend = document.getElementById('boton');

const cart = document.getElementById('cart');

const render = document.createElement('div');

const infoPizza = document.createElement('div');

cart.appendChild(render);
cart.appendChild(infoPizza);

const imagen = document.createElement('img');


const nombre = document.createElement('p');
const ingredientes = document.createElement('p');
const precio = document.createElement('p');

render.appendChild(imagen);
infoPizza.appendChild(nombre);
infoPizza.appendChild(ingredientes);
infoPizza.appendChild(precio);

const form = document.getElementById('form');

const vidriera = document.getElementById('vidriera');
const cartVidriera = document.getElementById('cart-vidriera');
const renderVidriera = document.createElement('div');
const infoVidriera = document.createElement('div');

const VidrieraImg = document.createElement('img');

const nombreVidriera = document.createElement('p');
const ingVidriera = document.createElement('p');
const precioVidriera = document.createElement('p');

cartVidriera.appendChild(renderVidriera);
cartVidriera.appendChild(infoVidriera);
renderVidriera.appendChild(VidrieraImg);

infoVidriera.appendChild(nombreVidriera);
infoVidriera.appendChild(ingVidriera);
infoVidriera.appendChild(precioVidriera);

const fragment = document.createDocumentFragment();

const limpiar = () => {
    while (vidriera.firstChild) {
        vidriera.removeChild(vidriera.firstChild);
    }
};

const MostrarPizzas = () => {

    if (cartVidriera.firstChild) {
        renderVidriera.classList.add('renderVidriera');
        infoVidriera.classList.add('infoVidriera');
        nombreVidriera.classList.add('nombreVidriera');
        VidrieraImg.classList.add('VidrieraImg');
        ingVidriera.classList.add('ingVidriera');
        precioVidriera.classList.add('precioVidriera');

        PIZZAS.filter((pizza) => {
            VidrieraImg.setAttribute('src', `${pizza.imgUrl}`);
            nombreVidriera.textContent = `${pizza.nombre}`;
            ingVidriera.innerHTML = `<ul>
            <li> ${pizza.ingredientes}</li>
            </ul>`;
            precioVidriera.textContent = `Valor: $ ${pizza.precio}`;

            const clonar = document.importNode(cartVidriera, true);
            fragment.appendChild(clonar);
            vidriera.appendChild(fragment);
        });
    }
};

document.addEventListener('DOMContentLoaded', MostrarPizzas);
document.addEventListener('reset', limpiar());



const tomarValor = () => {
    const value = document.getElementById('name').value;
    const pizzaName = value.toLowerCase();

    if (cart.firstChild) {
        cart.classList.add(`visible`);
        render.classList.add('render');
        infoPizza.classList.add('info');
        nombre.classList.add('nombrePizza');
    } else {
        cart.classList.remove(`visible`);
    };

    if (!pizzaName) {
        nombre.textContent = "Campo vacio";
        ingredientes.textContent = 'Ingresa un nombre valido';
        precio.textContent = "";
        imagen.removeAttribute('src', pizzaName.imgUrl);
        return;
    }
    const PizzaSelec = PIZZAS.find((pizza) => pizza.nombre == pizzaName);
    if (!PizzaSelec) {
        nombre.textContent = "Nombre no encontrado";
        ingredientes.textContent = 'Ingresa un nombre valido';
        imagen.removeAttribute('src');
        precio.textContent = "";
    } else {
        imagen.setAttribute('src', PizzaSelec.imgUrl);
        imagen.innerHTML = `${PizzaSelec.imgUrl}`;
        nombre.textContent = `${PizzaSelec.nombre}`;
        ingredientes.innerHTML = `Los ingredientes son:<ul><li> ${PizzaSelec.ingredientes} <li></ul>`
        precio.textContent = `El valor es de $ ${PizzaSelec.precio}`
    }
};

const limpiarCart = () => {
    while (cart.firstChild) {
        cart.removeChild(cart.firstChild);
        render.removeChild(render.firstChild);
    }

};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
});

buttonSend.addEventListener('click', tomarValor, limpiarCart);