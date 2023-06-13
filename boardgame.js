
const solution= [1,2,3,4,5,6,7,8,9,
                1,2,3,4,5,6,7,8,9,
                1,2,3,4,5,6,7,8,9,
                1,2,3,4,5,6,7,8,9,
                1,2,3,4,5,6,7,8,9,
                1,2,3,4,5,6,7,8,9,
                1,2,3,4,5,6,7,8,9,
                1,2,3,4,5,6,7,8,9,
                1,2,3,4,5,6,7,8,9];
const puzzle= [1,2,3,4,5,6,7,8,9,
    1,2,3,4,0,6,7,8,9,
    1,0,3,4,5,6,7,8,9,
    1,2,3,4,5,6,7,0,9,
    1,2,3,4,5,6,7,8,9,
    1,2,3,4,5,6,7,8,9,
    1,2,0,4,5,6,7,8,9,
    1,2,3,4,5,6,7,8,9,
    1,2,3,4,5,6,7,8,9];
function start(){
    document.querySelector('#board').innerHTML='';
    const board = document.querySelector('#board');
    for (i=0;i<81;i++) {
        const input=document.createElement('input');
        input.setAttribute('type','number');
        input.setAttribute('id',i);
        input.setAttribute('class',`col${i%9+1} row${Math.floor(i/9)+1}`);
        if (puzzle[i]==0) {
            input.setAttribute('value','null');
            input.classList.add('empty')
        } else {
            input.setAttribute('value',puzzle[i]);
            input.setAttribute('readonly','readonly');
        }
        board.appendChild(input);
    }
}
function check(){
    let error=0;
    for (i=0;i<81;i++){
        const box=document.getElementById(`${i}`);
        const data=box.value;
        if (data!=solution[i]) {
            error++;
            box.style.color="red";
        }
    }
    if (error!=0) return alert('Sai mẹ mày r!'); else return alert('giỏi lắm con trai của ta :)))))');
}
  