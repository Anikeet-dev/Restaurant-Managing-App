const myForm = document.querySelector('#order-form');
const price = document.querySelector('#price-text');
const discription = document.querySelector('#discription-text');
const tableNumber = document.querySelector('#table-Number');
const orderButton = document.querySelector('#add-order');
const table1 =  document.querySelector('#table1');
const table2 =  document.querySelector('#table2');
const table3 =  document.querySelector('#table3');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if (price.value === '' && discription.value === '' && tableNumber.value === '') {
        alert('Please enter fields!');
    } else {
        const orderDetails = {
            price: price.value,
            discription: discription.value,
            tableNumber: tableNumber.value
        };

        axios.post("https://crudcrud.com/api/73e65c770f2d44499ba4196dbe1382df/orderData", orderDetails)
            .then((response) => {
                const responseData = response.data;
                const order = document.createElement('li');

                order.innerHTML =
                    responseData.price + ' - ' +
                    responseData.discription + '-' +
                    responseData.tableNumber;

                showOrder(order);

                clearInputs();
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/73e65c770f2d44499ba4196dbe1382df/orderData")
        .then((response) => {
            console.log(response)

            for (var i = 0; i < response.data.length; i++) {
                showOrder(response.data[i]);
            }
            
        })
        .catch((err) => {
            console.log(err);
        })
})

function showOrder(orderData) {
    const { _id, price, discription, tableNumber } = orderData;

    const order = document.createElement('li');
    order.innerHTML = `${price} - ${discription}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Order';
    deleteButton.className = 'btn btn-danger btn-sm'; 

    deleteButton.addEventListener('click', () => {
        deleteOrder(_id);
        order.remove();
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

function deleteOrder(orderId) {
    axios.delete(`https://crudcrud.com/api/73e65c770f2d44499ba4196dbe1382df/orderData/${orderId}`)
        .then((response) => {
            console.log(`Order with ID ${orderId} deleted successfully.`);
        })
        .catch((err) => {
            console.log(err);
        });
}


function clearInputs() {
    price.value = '';
    discription.value = ''
    tableNumber.value = '';
}