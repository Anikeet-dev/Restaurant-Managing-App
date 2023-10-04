const myForm = document.querySelector('#order-form');
const price = document.querySelector('#price-text');
const discription = document.querySelector('#discription-text');
const tableNumber = document.querySelector('#table-Number');
const orderButton = document.querySelector('#add-order');
const table1 = document.querySelector('#table1');
const table2 = document.querySelector('#table2');
const table3 = document.querySelector('#table3');

myForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();

    if (price.value === '' && discription.value === '' && tableNumber.value === '') {
        alert('Please enter fields!');
    } else {
        const orderDetails = {
            price: price.value,
            discription: discription.value,
            tableNumber: tableNumber.value
        };

        try {
            const response = await axios.post("https://crudcrud.com/api/f0dd9a2e3bbd452b99959a67c2bccca7/orderData", orderDetails);
            const responseData = response.data;

            const order = {
                _id: responseData._id,
                discription: responseData.discription,
                tableNumber: responseData.tableNumber
            };

            showOrder(order);
            clearInputs();
        } catch (error) {
            console.log(error);
        }
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get("https://crudcrud.com/api/f0dd9a2e3bbd452b99959a67c2bccca7/orderData");

        for (let i = 0; i < response.data.length; i++) {
            showOrder(response.data[i]);
        }
    } catch (error) {
        console.log(error);
    }
});

function showOrder(orderData) {
    const { _id, price, discription, tableNumber } = orderData;

    const order = document.createElement('li');
    order.innerHTML = `${price} - ${discription}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Order';
    deleteButton.className = 'btn btn-danger btn-sm';

    deleteButton.addEventListener('click', async () => {
        try {
            await deleteOrder(_id);
            order.remove();
        } catch (error) {
            console.log(error);
        }
    });

    order.appendChild(deleteButton);

    let tableElement;
    if (tableNumber === 'Table1') {
        tableElement = table1;
    } else if (tableNumber === 'Table2') {
        tableElement = table2;
    } else if (tableNumber === 'Table3') {
        tableElement = table3;
    }
    if (tableElement) {
        tableElement.appendChild(order);
    }
}

async function deleteOrder(orderId) {
    try {
        await axios.delete(`https://crudcrud.com/api/f0dd9a2e3bbd452b99959a67c2bccca7/orderData/${orderId}`);
        console.log(`Order with ID ${orderId} deleted successfully.`);
    } catch (error) {
        console.log(error);
    }
}

function clearInputs() {
    price.value = '';
    discription.value = '';
    tableNumber.value = '';
}
