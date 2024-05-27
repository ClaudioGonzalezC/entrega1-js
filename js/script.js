let presupuesto = {};

function esSimboloMonedaValido(simbolo) {
    const simbolosValidos = ['฿', '₵', '₡', 'Bs', 'B/.', '₫', '€', 'ƒ', '₲', 'Kč', '₭', '£', '₤', '₥', '₦', '₱', 'P', 'R', '₨', 'Sk', '৲', 'S/', '৳', 'R$', '$', '₸', '₮', '₩', '¥', 'zł', '₴', '₪', '₽'];
    return simbolosValidos.includes(simbolo);
}

function mostrarSugerenciasSimbolos() {
    return 'Puedes utilizar, por ejemplo: ฿, ₵, ₡, Bs, B/., ₫, €, ƒ, ₲, Kč, ₭, £, ₤, ₥, ₦, ₱, P, R, ₨, Sk, ৲, S/, ৳, R$, $, ₸, ₮, ₩, ¥, zł, ₴, ₪, ₽';
}

do {
    presupuesto.nombre = prompt('Comencemos por darle un nombre a tu proyecto de presupuesto. Debe contar con al menos 3 caracteres.');
} while (presupuesto.nombre === null || presupuesto.nombre.trim() === '' || presupuesto.nombre.length < 3);

presupuesto.simboloMoneda = prompt('¡' + presupuesto.nombre + ' es un muy buen nombre! Ahora, cuéntanos el símbolo monetario que quieres usar.');

while (!esSimboloMonedaValido(presupuesto.simboloMoneda) || presupuesto.simboloMoneda === null || presupuesto.simboloMoneda === '') {
    if (presupuesto.simboloMoneda === null || presupuesto.simboloMoneda === '') {
        alert('Ingresa un símbolo monetario válido. ' + mostrarSugerenciasSimbolos());
    } else {
        alert('El símbolo ingresado no es válido. ' + mostrarSugerenciasSimbolos());
    }
    presupuesto.simboloMoneda = prompt('Ingresa el símbolo de la moneda que quieres usar:');
}

presupuesto.montoTotal = prompt('Perfecto. Ahora ingresa el monto de tu presupuesto inicial');

while (presupuesto.montoTotal === null || presupuesto.montoTotal === '' || isNaN(presupuesto.montoTotal) || !Number.isInteger(parseFloat(presupuesto.montoTotal)) || parseInt(presupuesto.montoTotal) <= 0) {
    if (presupuesto.montoTotal === null || presupuesto.montoTotal === '') {
        alert('El monto ingresado no es válido. Debes ingresar un número mayor a 0.');
    } else {
        alert('El monto ingresado no es válido. Debe ser un número entero positivo.');
    }
    presupuesto.montoTotal = prompt('Ingresa tu presupuesto inicial');
}

alert('¡Monto ingresado en ' + presupuesto.nombre + '! Tu presupuesto inicial es de: ' + presupuesto.simboloMoneda + presupuesto.montoTotal);
console.log(presupuesto);

let compras = [];
let contadorCompras = 0;
let continuarIngresando = true;

while (continuarIngresando) {
    let compra = {};
    compra.alertaCompra = prompt('Hemos identificado una compra. ¿Deseas ingresarla? (Si/No)');

    if (compra.alertaCompra === null || compra.alertaCompra.trim() === '') {
        alert('Por favor, responde con "Si" o "No"');
    } else if (compra.alertaCompra.trim().toLowerCase() === 'si') {
        compra.nombreCompra = prompt('Ingresa el nombre de la compra');
        if (compra.nombreCompra === null || compra.nombreCompra.trim() === '') {
            alert('El nombre de la compra no puede estar vacío.');
            continue;
        }
        compra.montoCompra = prompt('Ingresa el monto de la compra ' + '(' + presupuesto.simboloMoneda + ')');
        if (compra.montoCompra === null || compra.montoCompra.trim() === '' || isNaN(compra.montoCompra) || parseFloat(compra.montoCompra) <= 0) {
            alert('El monto ingresado no es válido. Debe ser un número positivo.');
            continue;
        }
        if (parseFloat(compra.montoCompra) > parseFloat(presupuesto.montoTotal)) {
            alert('El monto de la compra no puede ser mayor que el presupuesto disponible.');
            continue;
        }
        presupuesto.montoTotal -= parseFloat(compra.montoCompra);
        compra.id = ++contadorCompras; // Asignar un ID único a cada compra
        compras.push(compra); // Agregar la compra a la lista de compras
        alert('Has ingresado: ' + compra.nombreCompra + ' por un monto de: ' + presupuesto.simboloMoneda + compra.montoCompra);
    } else if (compra.alertaCompra.trim().toLowerCase() === 'no') {
        alert('Compra no registrada');
        break;
    } else {
        alert('Por favor, responde con "Si" o "No"');
    }

    // Preguntar si desea ingresar otra compra
    let respuestaContinuar = prompt('¿Deseas ingresar otra compra? (Si/No)');
    if (respuestaContinuar === null || respuestaContinuar.trim().toLowerCase() === 'no') {
        continuarIngresando = false;
    }
}

if (compras.length > 0) {
    compras.forEach(compra => {
        alert('Compra ' + compra.id + ': ' + compra.nombreCompra + ' por un monto de ' + presupuesto.simboloMoneda + compra.montoCompra);
    });
}

console.log(compras);
console.log(presupuesto); // Mostrar el presupuesto actualizado
