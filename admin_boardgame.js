window.addEventListener("load", function(){
    create_puzzle();
})
function create_puzzle(){
    document.querySelector('#board').innerHTML="";
    const board=document.querySelector("#board");
    for (i=0;i<81;i++){
        const input=document.createElement("input");
        input.setAttribute('type','number');
        input.setAttribute('id',i);
        input.setAttribute('class',`col${i%9+1} row${Math.floor(i/9)+1}`);
        board.appendChild(input);
    }
}
function export_puzzle(){
    let nbpuzzle=[];
    const inputs=document.querySelectorAll("input");
    inputs.forEach(input=>{
        nbpuzzle.push(input.value);
    })
    alert(nbpuzzle);
}
function reset_puzzle(){
    create_puzzle();
}