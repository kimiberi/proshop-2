function deleteTask(index) {
    // console.log(index)
    let getExistingData = JSON.parse(localStorage.getItem("localData"));
    let removeData = getExistingData.splice(index, 1);
    // console.log(removeData);
    // console.log(getExistingData);

    localStorage.setItem("localData", JSON.stringify(getExistingData));

    let list = document.getElementById('display_tableList');
    let ul = `
        <th>Title</th>
        <th>Description</th>
        ${JSON.parse(localStorage.getItem("localData")).map((data, index) =>
        `
        <tr>
        <td>${data.title}</td>
        <td>${data.desc}</td>
        <td><button onClick=deleteTask(${index})>DELETE</button>
        </tr>
        `).join('')}`;
     list.innerHTML = ul;
     console.log(ul)
}

function editTask(index) {
    // console.log(index)
    let getExistingData = localStorage.getItem("localData");
    let getdata = JSON.parse(getExistingData)[index];
console.log(getdata)
}

function addTask() {
    const _title = document.getElementById("id_title");
    const _desc = document.getElementById("id_desc");
    const _date = document.getElementById("id_date");

    const add_task = {
        title: _title.value,
        desc: _desc.value,
        // date: _date.value
    };

    if (!localStorage.getItem("localData")) {
        localStorage.setItem("localData", JSON.stringify([add_task]));
        // console.log(JSON.parse(localStorage.getItem("localData")));
    } else {
        let additional_task = [...JSON.parse(localStorage.getItem("localData")), add_task]
        localStorage.setItem("localData", JSON.stringify(additional_task));
        // console.log(JSON.parse(localStorage.getItem("localData")));
    }

    let tableList = document.getElementById('display_tableList');
    let ul = `
        <th>Title</th>
        <th>Description</th>
        ${JSON.parse(localStorage.getItem("localData")).map((data, index) =>
        `
        <tr>
        <td>${data.title}</td>
        <td>${data.desc}</td>
        <td><button onClick=deleteTask(${index})>DELETE</button>
        </tr>
        `).join('')}`;
        tableList.innerHTML = ul;
     console.log(ul)


    return (
       document.getElementById("title").innerHTML = add_task.title,
        document.getElementById("desc").innerHTML = add_task.desc
        // document.getElementById("date").innerHTML = add_task.date
    )
}


// localStorage.setItem("localData", JSON.stringify(localData));
// var stored = JSON.parse(localStorage.getItem("localData"));