//TP FINAL 

const divEmp = document.getElementById("raiz");
const divCart = document.getElementById("pedido");
const botCart = document.getElementById("carrito");

botCart.addEventListener("click", () => verCart());

class Empanada{
    constructor(nombre, codigo, precio, foto, cantidad){
        this.nombre = nombre,
        this.codigo = codigo,
        this.precio = precio,
        this.foto = foto,
        this.cantidad = cantidad
    }
}

class CartOb{
    constructor(codigo, cantidad){
        this.codProd =  codigo,
        this.cantidad = cantidad;
    }
    cant(){
        this.cantidad = this.cantidad +1;
        Toastify({
        text: "Se agregó correctamente a tu pedido!",
        className: "info",
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
        }).showToast();
                          
    }
}

const emp1 = new Empanada ("jamon y queso", 0, 200, 'jyq.jpg');
const emp2 = new Empanada ("carne", 1, 220, 'carne.jpg');
const emp3 = new Empanada ("pollo", 2, 190, 'pollo.jpg' );
const emp4 = new Empanada ("humita", 3, 200, 'humita.jpg');
const emp5 = new Empanada ("verdura", 4, 180, 'verdura.jpg');
const emp6 = new Empanada ("roquefort", 5, 240, 'roquefort.jpg');

const arrayCart = [];
const empanadas = [emp1, emp2, emp3, emp4, emp5, emp6];

function lasEmpanadas(empanadasVer){
    for (elem of empanadasVer){
        let tarjeta = document.createElement("section");
        tarjeta.innerHTML =
        `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="./img/${elem.foto}" alt="Imagen de la empanada que seleccionaron">
        <div class="card-body">
        <h5 class="card-title">${elem.nombre}</h5>
        <h6 class="card-text">Precio: $ ${elem.precio} </h6>
        <input type="button" class="btn btn-primary" value="Pedido" onclick="verPedido(${elem.codigo})">
        </div>
        </div>`   
        divEmp.append(tarjeta);
    }
}

function verPedido(empa){
let loDelCart = arrayCart.find(elem => elem.codProd == empa )

if (loDelCart != undefined){
    let posi = arrayCart.findIndex(elem => elem.codProd == loDelCart.codProd)
    arrayCart[posi].cant()
}else{
    const vaAlCart = new CartOb(empa, 1)
    arrayCart.push(vaAlCart)

}
console.table(loDelCart)
localStorage.setItem("pedido", JSON.stringify(loDelCart))

}

document.addEventListener("DOMContentLoaded", ()=>{
    lasEmpanadas(empanadas)
})

function verCart(){
    let cartLS = JSON.parse(localStorage.getItem("pedido"));

    console.log(cartLS);

     if (cartLS !== null){

       
        for (item of cartLS){
            let dProd = empanadas.find(e => e.codigo == item.codProd)
            let tarjeta = document.createElement("div");
            tarjeta.innerHTML =
            `<div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${dProd.codigo}</h5>
            <h6 class="card-text">El total de tu pedido es de ${item.cantidad} empanadas</h6>    
            </div>
            </div>`   
            divCart.append(tarjeta);
           
        }
        botCart.style.display = "none";

        let finalPaga = cartLS.reduce((acum, item) => {
            let emp = empanadas.find(elem => elem.codigo === item.codProd)
            return acum  += emp.precio * item.cantidad
        })

        divCart.innerHTML += `<h3>Tenes que pagar ${finalPaga} para disfrutar de las empanadas mas ricas </h3>
        <input type=button value="Terminar con tu pedido" onClick="finPEdido()>`
        }
        

    else{
        
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos!',
            text: 'Debes agregar productos a tu pedido para continuar',
          })
                          
    }
}

//function finPEdido() {
//localStorage.removeItem("carrito")
//alert("finalizaste tu pedido con éxito");
//}



