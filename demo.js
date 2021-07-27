"use strict";

const myList = document.querySelector("#list");
const doneList = document.querySelector("#donelist");

let todo = [],
  todone = [],
  temp;

function save_list() {
  const todoString = JSON.stringify(todo);
  const todoneString = JSON.stringify(todone);

  localStorage.setItem("todo", todoString);
  localStorage.setItem("todone", todoneString);
}

function get_list() {
  const todoString = localStorage.getItem("todo");
  const todoneString = localStorage.getItem("todone");

  todo = JSON.parse(todoString) ?? [];
  todone = JSON.parse(todoneString) ?? [];
}

function additem_whenenter(e) {
  if (e.keyCode === 13) {
    additem_todo("new");
  }
}

function additem_todo(flag, itemContent) {
  const item = document.createElement("li");
  const span = document.createElement("span");
  const check = document.createElement("input");
  const spanimg = document.createElement("span");

  item.appendChild(check);
  item.appendChild(spanimg);
  item.appendChild(span);

  check.setAttribute("type", "checkbox");
  check.classList.add("check-item");
  span.classList.add("list-item");
  spanimg.classList.add("glyphicon");
  spanimg.classList.add("glyphicon-remove");

  switch (flag) {
    case "todo":
      span.innerHTML = itemContent;
      myList.appendChild(item);
      document.querySelector("#noitem").style.display = "none";
      break;
    case "todone":
      check.checked = true;
      span.innerHTML = itemContent;
      doneList.appendChild(item);
      document.querySelector("#doneitem").style.display = "none";
      break;
    case "new":
      const itemNode = document.querySelector("#itemname");

      todo.push(itemNode.value);
      save_list();

      span.innerHTML = itemNode.value;
      myList.appendChild(item);
      itemNode.value = "";
      display_title();
      break;
    default:
      throw new Error("Wrong flag");
  }

  check.addEventListener("change", function () {
    const doneItem = this.parentElement;
    temp = doneItem.querySelector(".list-item").innerHTML;
    if (myList.id === doneItem.parentElement.id) {
      check_change("todo", myList, doneList, doneItem);
    } else {
      check_change("todone", doneList, myList, doneItem);
    }
    save_list();
    display_title();
  });

  spanimg.addEventListener("click", function () {
    const removeItem = this.parentElement;
    temp = check.disabled
      ? removeItem.querySelector(".list-item input").value
      : removeItem.querySelector(".list-item").innerHTML;
    if (myList.id === removeItem.parentElement.id) {
      remove_item("todo", removeItem);
    } else {
      remove_item("todone", removeItem);
    }
    save_list();
    display_title();
  });

  span.addEventListener("dblclick", function () {
    const parent = this.parentElement;
    const form = document.createElement("span");
    const text = document.createElement("input");
    const ok = document.createElement("button");
    const cancel = document.createElement("button");
    let data = this.textContent;

    check.disabled = true;
    span.innerHTML = "";
    text.value = data;
    ok.innerHTML = "OK";
    cancel.innerHTML = "Cancel";

    form.appendChild(text);
    form.appendChild(ok);
    form.appendChild(cancel);
    span.appendChild(form);

    ok.addEventListener("click", function () {
      change_item("todo", text.value);
      change_item("todone", text.value);

      save_list();
      save_element(text.value);
    });

    cancel.addEventListener("click", function () {
      save_element(data);
    });

    function save_element(value) {
      span.removeChild(form);
      span.textContent = value;
      parent.appendChild(span);
      check.disabled = false;
    }

    function change_item(type, value) {
      const isTodo = type === "todo";
      const list = isTodo ? todo : todone;
      for (let i = 0; i < list.length; i++) {
        if (data === list[i]) {
          list[i] = value;
        }
      }
    }
  });

  function remove_item(type, item) {
    const isTodo = type === "todo";
    const listNode = isTodo ? myList : doneList;
    const listIterable = isTodo ? todo : todone;

    listNode.removeChild(item);
    for (let i = 0; i < listIterable.length; i++) {
      if (temp === listIterable[i]) listIterable.splice(i, 1);
    }
  }
  function check_change(type, removeList, addList, doneItem) {
    const isTodo = type === "todo";
    const list = isTodo ? todo : todone;

    removeList.removeChild(doneItem);
    span.innerHTML = temp;
    addList.appendChild(item);

    isTodo ? todone.push(temp) : todo.push(temp);

    for (let i = 0; i < list.length; i++) {
      if (temp == list[i]) list.splice(i, 1);
    }
  }
}

function display_title() {
  const noItemNode = document.querySelector("#noitem");
  const doneItemNode = document.querySelector("#doneitem");

  noItemNode.style.display = todo.length === 0 ? "block" : "none";
  doneItemNode.style.display = todone.length === 0 ? "block" : "none";
}
function remove_list(id) {
  const root = document.getElementById(id);
  root.innerHTML = "";

  if (myList.id === id) {
    todo = [];
  } else {
    todone = [];
  }
  save_list();
  display_title();
}

get_list();

todo.forEach((item) => additem_todo("todo", item));
todone.forEach((item) => additem_todo("todone", item));
