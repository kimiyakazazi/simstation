

const url = 'https://jsonplaceholder.typicode.com/todos';
const url2 = 'https://jsonplaceholder.typicode.com/users/';

//task 1 
async function getTodos() {
    let response = await fetch(url)
    let data = await response.json()
    console.log(data)
}
//task 2
async function getUById(id) {
    let response = await fetch(url2 + id)
    let data = await response.json()
    console.log(data)
    document.getElementById("task02Result").innerText = "user id :" + id + "\ntel:" + data.phone + "\nadress:" + JSON.stringify(data.address)
}
//task 3
async function manipulateUser() {
    let response = await fetch(url2)
    let data = await response.json()
    let newData = JSON.parse(JSON.stringify(data));

    newData.sort(compare)
    data.sort(compare)

    console.log(newData)
    for (let i = 0; i < data.length; i++) {
        data[i].name = 'kimiya'
        data[i].email = 'kimiya.kazazi96@gmail.com'
    }


    document.getElementById("task03Result").innerText = JSON.stringify(data)
}

function compare(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}


