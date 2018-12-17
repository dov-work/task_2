var myList = document.getElementById("list");
var doneList = document.getElementById("donelist");

var todo = [];
var todone = [];


var temp;
var count = 0, countDone = 0, x = 0, y = 0;
var flag = true;

function save_count() {
    var localCount = count;
    var localCountDone = countDone;
    localStorage.setItem("count", localCount);
    localStorage.setItem("countDone", localCountDone);
}

function get_count() {
    var localCount = localStorage.getItem("count");
    var localCountDone = localStorage.getItem("countDone");
    count = localCount;
    countDone = localCountDone;
}


function save_list() {
    var str = JSON.stringify(todo);
    var str1 = JSON.stringify(todone);
    localStorage.setItem("todo", str);
    localStorage.setItem("todone", str1);

}

function get_list() {
    var str = localStorage.getItem("todo");
    var str1 = localStorage.getItem("todone");

    todo = JSON.parse(str);
    todone = JSON.parse(str1);
    if (!todo) {
        todo = [];
    }
    if (!todone) {
        todone = [];
    }

    console.log(todo);
    console.log(todone);

}
get_count();
get_list();
var todoCount = count;
var todoneCount = countDone;

while (todoCount > 0) {
    additem_todo('todo');
    --todoCount;
}

while (todoneCount > 0) {
    additem_todo('todone');
    --todoneCount;
}

function additem_whenenter(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        additem_todo('new');
    }
}

function additem_todo(flag) {
    var item = document.createElement("li");
    var span = document.createElement("span");
    var check = document.createElement("input");
    var spanimg = document.createElement("span");
    item.appendChild(check);

    item.appendChild(spanimg);
    item.appendChild(span);

    check.setAttribute('type', 'checkbox');
    check.classList.add("check-item");
    span.classList.add("list-item");
    spanimg.classList.add("glyphicon");
    spanimg.classList.add("glyphicon-remove");

    if (flag == 'todo') {
        var itemContent = todo[x];
        span.innerHTML = itemContent;
        myList.appendChild(item);
        x++;
        document.getElementById("noitem").style.display = "none";


    }
    else if (flag == 'todone') {
        check.checked = true;
        var itemContent = todone[y];
        span.innerHTML = itemContent;
        doneList.appendChild(item);
        y++;
        document.getElementById("doneitem").style.display = "none";


    }
    else {
        var itemContent = document.getElementById("itemname");
        todo.push(itemContent.value);
        save_list();
        span.innerHTML = itemContent.value;
        myList.appendChild(item);
        itemContent.value = "";
        count++;
        save_count();
        display_title();
    }


    check.addEventListener("change", function () {

        var doneItem = this.parentElement;
        temp = doneItem.childNodes[2].innerHTML;
        if (myList.id == this.parentElement.parentElement.id) {
            myList.removeChild(doneItem);
            span.innerHTML = temp;
            doneList.appendChild(item);
            count--;
            countDone++;
            todone.push(temp);
            for (var i = 0; i < todo.length; i++) {
                if (temp == todo[i])
                    todo.splice(i, 1);
            }
        }
        else {
            doneList.removeChild(doneItem);
            span.innerHTML = temp;
            myList.appendChild(item);
            count++;
            countDone--;
            todo.push(temp);
            for (var i = 0; i < todone.length; i++) {
                if (temp == todone[i])
                    todone.splice(i, 1);
            }
        }
        save_list();
        save_count();
        display_title();

        spanimg.addEventListener("click", function () {

            var removeItem = this.parentElement;
            temp = removeItem.childNodes[2].innerHTML;

            if (myList.id == this.parentElement.parentElement.id) {
                myList.removeChild(removeItem);
                count--;
                for (var i = 0; i < todo.length; i++) {
                    if (temp == todo[i])
                        todo.splice(i, 1);
                }

            }
            else {
                doneList.removeChild(removeItem);
                countDone--;
                for (var i = 0; i < todone.length; i++) {
                    if (temp = todone[i])
                        todone.splice(i, 1);
                }
            }
            save_list();
            save_count();
            display_title();

        });

        span.addEventListener("dblclick", function () {

            var data = this.innerHTML;
            var parent = this.parentElement;
            span.innerHTML = "";
            var form = document.createElement("span");
            var text = document.createElement("input");
            var ok = document.createElement("button");
            var cancel = document.createElement("button");

            text.value = data;
            ok.innerHTML = "OK";
            cancel.innerHTML = "Cancel";

            form.appendChild(text);
            form.appendChild(ok);
            form.appendChild(cancel);
            span.appendChild(form);

            ok.addEventListener("click", function () {
                span.removeChild(form);

                for (var i = 0; i < todo.length; i++) {
                    if (data == todo[i]) {
                        todo[i] = text.value;
                    }

                }

                for (var i = 0; i < todone.length; i++) {
                    if (data == todone[i]) {
                        todone[i] = text.value;
                    }
                }
                save_list();
                data = text.value;
                span.innerHTML = data;
                parent.appendChild(span);
            });

            cancel.addEventListener("click", function () {
                span.removeChild(form);
                span.innerHTML = data;
                parent.appendChild(span);
            });
        });
    }

    function display_title() {

        if (count == 0) {
            document.getElementById("noitem").style.display = "block";
        }
        if (count == 1) {
            document.getElementById("noitem").style.display = "none";
        }
        if (countDone == 0) {
            document.getElementById("doneitem").style.display = "block";
        }
        if (countDone == 1) {
            document.getElementById("doneitem").style.display = "none";
        }

    }
    function remove_list(id) {
        var root = document.getElementById(id);
        while (root.firstChild) {
            root.removeChild(document.getElementById(id).firstChild);

        }


        if (myList.id == id) {
            todo = [];
            count = 0;
        }
        else {
            todone = [];
            countDone = 0;
        }
        save_list();
        save_count();
        display_title();

    }
