const url = "http://www.raydelto.org/agenda.php"
const form = document.getElementById("form_datos");
const inputName = document.getElementById("input_name");
const inputLastName = document.getElementById("input_last_name");
const inputPhone = document.getElementById("input_phone");
const addButton = document.getElementById("add_contacts");
const tableData = document.querySelector("#table_data");


form.addEventListener("submit", function () {
    event.preventDefault();
})

function recibirRespuesta(respuesta) {
    return respuesta.json();
}

function procesarRespuesta(contactos) {
    let i = 0
    while (i < contactos.length) {
        datos = contactos[i]
        addContact(datos.nombre, datos.apellido, datos.telefono, id=i);
        i++
    }
}

addButton.addEventListener("click", function () {
    const name = inputName.value;
    const lastName = inputLastName.value;
    const phone = inputPhone.value;

    const dataToSend = {
        nombre: name,
        apellido: lastName,
        telefono: phone
    }

    const optionResquest = {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
    };

    fetch(url, optionResquest).then(response => {
        if (response.status !== 200) {
            return response.json();
        }
        else {
            console.log("Se recibio el estado", response.status)
        }
    }).then(data => { console.log("Datos enviados correctamente.", data) }).catch(error => {
    })

    if (name.trim() !== "") {
        addContact(name, lastName, phone);
    }
})

function addContact(name, lastName, phone, id=null, tagClass= "general_row") {
    const newRow = document.createElement("tr");
    const nameCell = document.createElement("td");
    const lastNameCell = document.createElement("td");
    const phoneCell = document.createElement("td");

    if(!id){
       const lastRow = tableData.rows[tableData.rows.length - 1]
       const idLastRow = lastRow.getAttribute("id")?.split("-");
       if(idLastRow?.length){
        id = parseInt(idLastRow[1]) + 1
       }
       console.log(id)
    }

    newRow.setAttribute("id", `row-${id}`);    
    newRow.classList.add(tagClass);

    nameCell.textContent = name;
    lastNameCell.textContent = lastName
    phoneCell.textContent = phone

    newRow.appendChild(nameCell)
    newRow.appendChild(lastNameCell)
    newRow.appendChild(phoneCell)
    tableData.appendChild(newRow)

    inputName.value = "";
    inputLastName.value = "";
    inputPhone.value = "";
}


function cargarContactos() {
    fetch(url).then(recibirRespuesta).then(procesarRespuesta);
}