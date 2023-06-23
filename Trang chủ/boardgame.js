window.addEventListener("load", function () {
  start();
});
function send(mess) {
  document.getElementById("mess").innerHTML = mess;
}

function start() {
  fetch(`http://localhost:5000/get_puzzle`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const arr = res[0].puzzle.split(",");
      create_table(arr);
    })
    .catch((err) => send(err));
}

function create_table(array) {
  document.querySelector("#puzzle").innerHTML = "";
  const puzzle = document.querySelector("#puzzle");
  for (i = 0; i < 81; i++) {
    const col = (i % 9) + 1;
    const row = Math.floor(i / 9) + 1;
    let group;
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("min", 1);
    input.setAttribute("max", 9);
    input.setAttribute("id", i);
    input.setAttribute("class", `input col${col} row${row}`);

    if (array[i] == "") {
      input.setAttribute("value", null);
      input.classList.add("empty");
    } else {
      input.setAttribute("value", array[i]);
      input.setAttribute("readonly", "readonly");
    }
    switch (col) {
      case 1:
      case 2:
      case 3:
        switch (row) {
          case 1:
          case 2:
          case 3:
            group = 1;
            break;
          case 4:
          case 5:
          case 6:
            group = 4;
            break;
          default:
            group = 7;
            break;
        }
        break;
      case 4:
      case 5:
      case 6:
        switch (row) {
          case 1:
          case 2:
          case 3:
            group = 2;
            break;
          case 4:
          case 5:
          case 6:
            group = 5;
            break;
          default:
            group = 8;
            break;
        }
        break;

      default:
        switch (row) {
          case 1:
          case 2:
          case 3:
            group = 3;
            break;
          case 4:
          case 5:
          case 6:
            group = 6;
            break;
          default:
            group = 9;
            break;
        }
        break;
    }
    input.classList.add("group" + group);
    puzzle.appendChild(input);
  }
}

function check_puzzle() {
  const empty = document.querySelectorAll(".empty");
  let null_value = 0;
  empty.forEach((empty) => {
    const class_list = empty.className;
    const col = class_list[9];
    const row = class_list[14];
    const group = class_list[27];
    if (empty.value == "") {
      null_value++;
    } else check_err(col, row, group, empty.value);
  });
  if (null_value > 0)
    document.querySelector("#message").innerHTML = "Chưa điền hết kìa bro!";
}

function check_err(col, row, group, value) {
  let err = 0;
  const input = document.querySelector(`.col${col}.row${row}`);
  const cols = document.querySelectorAll(`.col${col}`);
  const rows = document.querySelectorAll(`.row${row}`);
  const groups = document.querySelectorAll(`.group${group}`);
  cols.forEach((col, index) => {
    if (index + 1 != row) {
      if (col.value == value) err++;
    }
  });
  rows.forEach((row, index) => {
    if (index + 1 != col) {
      if (row.value == value) err++;
    }
  });
  let err_group = 0;
  groups.forEach((group) => {
    if (group.value == value) err_group++;
  });
  if (err_group > 1) err++;
  if (err) {
    input.setAttribute("style", "color:red");
  } else {
    input.setAttribute("style", "color:green");
  }
}
