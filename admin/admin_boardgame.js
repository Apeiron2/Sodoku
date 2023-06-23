window.addEventListener("load", function () {
  create_table();
  document.getElementById("export_solution").style.display = "none";
});

function create_table() {
  document.querySelector("#puzzle").innerHTML = "";
  const puzzle = document.querySelector("#puzzle");
  for (i = 0; i < 81; i++) {
    const col = (i % 9) + 1;
    const row = Math.floor(i / 9) + 1;
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("min", 1);
    input.setAttribute("max", 9);
    input.setAttribute("class", `input col${col} row${row}`);
    puzzle.appendChild(input);
  }
}

function export_puzzle() {
  let code_puzzle = [];
  const puzzles = document.querySelectorAll(".input");
  puzzles.forEach((input) => {
    code_puzzle.push(input.value);
  });
  fetch(`http://localhost:5000/export_puzzle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      puzzle: code_puzzle,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

function reset_table() {
  create_table();
}
