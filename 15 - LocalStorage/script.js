const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    //seria el handleSubmit
    const text = addItems.querySelector('[name=item]').value
    console.log(text)
    e.preventDefault()

    const item = {
        text,
        done: false,
    }

    items.push(item)
    console.table(items)
    populateList(items, itemsList)
    localStorage.setItem('items', JSON.stringify(items))
    console.log(localStorage.getItem('items'))
    this.reset()
}

function populateList(plates = [], platesList) {
    console.log(plates)
    console.log(platesList)
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type='checkbox' data-index=${i} id='item${i}' ${(plate.done === true ? 'checked' : '')}>
                <label for='item${i}'>
                    ${i} ${plate.text}
                </label>
            </li>
        `;
    }).join('')
}

function toggleDone(e) {
    //skip this unless it's an input
    if (!e.target.matches('input')) return
    console.log(e.target)
    const el = e.target
    //consegui el numero, ahora lo que hago es buscar este elemento con esta posicion (numero) en el array y volver a setear el localStorage con el nuevo boolean.
    console.log(el.dataset.index)

    items[el.dataset.index].done = !items[el.dataset.index].done
    console.log(items[el.dataset.index])
    localStorage.setItem('items', JSON.stringify(items))
    //para actualizarlo en tiempo real al hacer click, EL PROBLEMA DE ESTE ES QUE ME RENDERIZA TODA LA LISTA CADA VEZ QUE HAGO CLICK ADENTRO DE
    populateList(items, itemsList)
}

window.addEventListener('DOMContentLoaded', populateList(items, itemsList))
addItems.addEventListener('submit', addItem)

itemsList.addEventListener('click', toggleDone)

//CHECK ALL BUTTON
const CheckAll = document.querySelector('.checks-all')

function checkAll() {
    items.forEach(item => {
        item.done = true
    })

    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList)
}

CheckAll.addEventListener('click', checkAll)


//UNCHECK ALL BUTTON
const UncheckAll = document.querySelector('.unchecks-all')

function uncheckAll() {
    items.forEach(item => {
        item.done = false
    })

    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList)
}

UncheckAll.addEventListener('click', uncheckAll)