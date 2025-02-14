var isUpdate = false;

function deleteTask(index) {
    // console.log(index)
    let getExistingData = JSON.parse(localStorage.getItem("localData"));
    let removeData = getExistingData.splice(index, 1);
    // console.log(removeData);
    // console.log(getExistingData);

    localStorage.setItem("localData", JSON.stringify(getExistingData));

    let tableList = document.getElementById('display_tableList');
    let table_ui = `
        <th>Title</th>
        <th>Description</th>
        ${JSON.parse(localStorage.getItem("localData")).map((data, index) =>
        `
        <tr>
        <td>${data.title}</td>
        <td>${data.desc}</td>
        <td><button onClick=editTask(${index})>EDIT</button>
        <td><button onClick=deleteTask(${index})>DELETE</button>
        </tr>
        `).join('')}`;
        tableList.innerHTML = table_ui;
    //  console.log(table_ui)
}

function editTask(index) {
    // console.log(index)
    let getExistingData = localStorage.getItem("localData");
    let getdata = JSON.parse(getExistingData)[index];
    console.log(getdata);

    const _title = document.getElementById("id_title");
    const _desc = document.getElementById("id_desc");
    const _date = document.getElementById("id_date");

    // get the value and display it as edit data
    _title.value = getdata.title;
    _desc.value = getdata.desc;
    // _date.value = getdata.date;

    let btnList = document.getElementById('display_btn');
    let btn_ui = `
        <button id="btn_save" onclick="saveTask(${index})">Save task</button>
    `;
    btnList.innerHTML = btn_ui;
}

function saveTask(index) {
    const _title = document.getElementById("id_title");
    const _desc = document.getElementById("id_desc");
    const _date = document.getElementById("id_date");

    const save_task = {
        title: _title.value,
        desc: _desc.value,
        // date: _date.value
    };
    console.log(save_task);

    // console.log(index)
    let getExistingData = localStorage.getItem("localData");
    let getdata = JSON.parse(getExistingData)[index];
    getdata = save_task;
    console.log(getdata);

    // update the specific data
    let getwholeData = JSON.parse(getExistingData);
    const result = getwholeData.map((data, i) => index == i ? save_task : data);
    console.log(result);

    // save it
    localStorage.setItem("localData", JSON.stringify(result));

    // display the new updated data
    let tableList = document.getElementById('display_tableList');
    let table_ui = `
        <th>Title</th>
        <th>Description</th>
        ${JSON.parse(localStorage.getItem("localData")).map((data, index) =>
        `
        <tr>
        <td>${data.title}</td>
        <td>${data.desc}</td>
        <td><button onClick=editTask(${index})>EDIT</button>
        <td><button onClick=deleteTask(${index})>DELETE</button>
        </tr>
        `).join('')}`;
        tableList.innerHTML = table_ui;
    //  console.log(table_ui)

    // clear input fields
    _title.value = '';
    _desc.value = '';

    let btnList = document.getElementById('display_btn');
    let btn_ui = `
        <button id="btn_add" onclick="addTask()">Add task</button>
    `;
    btnList.innerHTML = btn_ui;
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
    let table_ui = `
        <th>Title</th>
        <th>Description</th>
        ${JSON.parse(localStorage.getItem("localData")).map((data, index) =>
        `
        <tr>
        <td>${data.title}</td>
        <td>${data.desc}</td>
        <td><button onClick=editTask(${index})>EDIT</button>
        <td><button onClick=deleteTask(${index})>DELETE</button>
        </tr>
        `).join('')}`;
        tableList.innerHTML = table_ui;
    //  console.log(table_ui)

     // clear input fields
     _title.value = '';
     _desc.value = '';

    // return (
    //    document.getElementById("title").innerHTML = add_task.title,
    //     document.getElementById("desc").innerHTML = add_task.desc,
    //     document.getElementById("date").innerHTML = add_task.date
    // )
}

// localStorage.setItem("localData", JSON.stringify(localData));
// var stored = JSON.parse(localStorage.getItem("localData"));