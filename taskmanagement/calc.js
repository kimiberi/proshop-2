function addTask() {
    const _title = document.getElementById("id_title");
    // console.log(_title.value);
    const _desc = document.getElementById("id_desc");
    const _date = document.getElementById("id_date");

    const task = {
        title: _title.value,
        desc: _desc.value,
        date: _date.value
    };
    console.log(task)

    localStorage.setItem("Task", JSON.stringify(task));

    return (
       document.getElementById("title").innerHTML = task.title,
        document.getElementById("desc").innerHTML = task.desc,
        document.getElementById("date").innerHTML = task.date
    )
}