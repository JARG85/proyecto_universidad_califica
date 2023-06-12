const triggerBtn = document.querySelector('#triggerBtn');
const example = document.querySelector('#example');
const exampleParent = document.querySelector('#exampleParent');

const add_person = document.querySelector('#addPerson');
const add_note = document.querySelector('#addNote');

const remove_person = document.querySelector('#removePerson');
const remove_note = document.querySelector('#removeNote');

const numeroFila = document.getElementById('numeroFila');
const numeroColumna = document.getElementById('numeroColumna');

const pre_add_person = document.querySelector('#pre-add-person');
const pre_add_note = document.querySelector('#pre-add-note');

const pre_remove_person = document.querySelector('#pre-remove-person');
const pre_remove_note = document.querySelector('#pre-remove-note');

const form_remove_person = document.getElementById('form-remove-person');
const form_remove_note = document.getElementById('form-remove-note');
const form_add_person = document.getElementById('form-add-person');
const form_add_note = document.getElementById('form-add-note');

const nombre = document.getElementById('nombre');
const nota = document.getElementById('nota');

// generate an array of arrays with dummy data
// const data = new Array(33) // number of rows
//     .fill()
//     .map((_, row) => new Array(50) // number of columns
//         .fill()
//         .map((_, column) => `${row}, ${column}`)
//     );

const data = [
    ['Nombre', 'Nota1', 'Nota 2', 'Nota 3 ', 'Nota 4', 'Promedio']
]

const hot = new Handsontable(example, {
    data,
    rowHeaders: true,
    colHeaders: true,
    width: '100%',
    height: '100%',
    rowHeights: 23,
    colWidths: 100,
    licenseKey: 'non-commercial-and-evaluation',
    allowInsertColumn: true
});

triggerBtn.addEventListener('click', () => {
    if (triggerBtn.textContent === 'Replegar tabla') {
        exampleParent.style.height = ''; // reset to initial 150px;
        hot.refreshDimensions();
        triggerBtn.textContent = 'Expandir tabla';
    } else {
        exampleParent.style.height = '60vh';
        hot.refreshDimensions();
        triggerBtn.textContent = 'Replegar tabla';
    }
});

//funcion para ocultar todos los campos.
const hideFields = () => {
    form_add_person.style.display = 'none';
    form_add_note.style.display = 'none';
    form_remove_person.style.display = 'none';
    form_remove_note.style.display = 'none';
}

//manejo de visualizacion de campos
pre_add_person.addEventListener('click', () => {
    hideFields();
    form_add_person.style.display = 'block';
})

pre_add_note.addEventListener('click', () => {
    hideFields();
    form_add_note.style.display = 'block';
})

pre_remove_person.addEventListener('click', () => {
    hideFields();
    form_remove_person.style.display = 'block';
})
pre_remove_note.addEventListener('click', () => {
    hideFields();
    form_remove_note.style.display = 'block';
})

//funciones para add y remove para los botones
let cantidadColumnas = hot.countCols();
let cantidadFilas = hot.countRows();

add_person.addEventListener('click', () => {
    console.log(hot.countRows());
    let valueName = nombre.value;
    if (valueName != '') {
        hot.setDataAtCell(hot.countRows(), 0, valueName)
        nombre.value = ''
    }
})

add_note.addEventListener('click', () => {
    hot.alter('insert_col', hot.countCols() - 1);
    let valueNote = nota.value;
    if (valueNote != '') {
        hot.setDataAtCell(0, hot.countCols() - 2, valueNote)
    }
})
//Escuchas para los campos remove
const limpiarEntrada = (value) => {
    const valor = value.toLowerCase();
    const regex = /[^0-9\s]/g;
    return valor.replace(regex, "");
}

numeroFila.addEventListener('input', () => {
    numeroFila.value = limpiarEntrada(numeroFila.value)
})
numeroColumna.addEventListener('input', () => {
    numeroColumna.value = limpiarEntrada(numeroColumna.value)
})

remove_person.addEventListener('click', () => {
    let valueInput = parseInt(numeroFila.value);
    console.log(valueInput, hot.countRows());

    if (valueInput > 1 && valueInput <= hot.countRows()) {
        hot.alter('remove_row', valueInput - 1, 1);
    } else {
        alert('No seleccionaste un numero valido a eliminar')
    }
})

remove_note.addEventListener('click', () => {
    let valueInput = parseInt(numeroColumna.value);
    if (valueInput > 1 && valueInput != hot.countCols()) {
        hot.alter('remove_col', valueInput - 1, 1);
    } else {
        alert('no selecciono un numero correcto');
    }
})