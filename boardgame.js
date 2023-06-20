window.addEventListener("load", function(){
    start();
})
array=[1,5,2,4,8,9,3,7,6,7,3,9,2,5,6,8,4,1,4,6,8,3,7,1,2,9,5,,,7,1,2,,6,5,9,5,9,1,7,6,3,4,2,8,2,4,6,8,9,5,7,5,3,9,1,4,6,3,7,5,8,2,6,2,5,9,4,8,1,3,7,8,7,3,5,1,2,9,6,4]

function start(){
    fetch
    create_table(array);
}

function create_table(array){
    document.querySelector('#puzzle').innerHTML="";
    const puzzle=document.querySelector("#puzzle");
    for (i=0;i<81;i++){
        const col=i%9+1;
        const row=Math.floor(i/9)+1;
        let group;
        const input=document.createElement("input");
        input.setAttribute('type','number');
        input.setAttribute('min',1);
        input.setAttribute('max',9);
        input.setAttribute('id',i);
        input.setAttribute('class',`input col${col} row${row}`);
        
        if (array[i]==undefined){
            input.setAttribute('value',null);
            input.classList.add('empty');
        } else {
            input.setAttribute('value',array[i]);
            input.setAttribute('readonly','readonly')
        }
        switch (col) {
            case 1:
            case 2:
            case 3:
                switch (row) {
                    case 1:
                    case 2:
                    case 3:
                        group=1;
                        break;
                    case 4:
                    case 5:
                    case 6:
                        group=4;
                        break;
                    default:
                        group=7;
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
                        group=2;
                        break;
                    case 4:
                    case 5:
                    case 6:
                        group=5;
                        break;
                    default:
                        group=8;
                        break;
                }
                break;

            default:
                switch (row) {
                    case 1:
                    case 2:
                    case 3:
                        group=3;
                        break;
                    case 4:
                    case 5:
                    case 6:
                        group=6;
                        break;
                    default:
                        group=9;
                        break;
                }
                break;
        }
        input.classList.add('group'+group);
        puzzle.appendChild(input);
    }
}

function check_puzzle(){
    const empty=document.querySelectorAll('.empty');
    empty.forEach(empty=>{
        const class_list=empty.className;
        const col=class_list[9];
        const row=class_list[14];
        const group=class_list[27];
        if (empty.value==''){
            document.querySelector('.message').innerHTML="Chưa điền hết kìa bro!"
        } else check_err(col,row,group,empty.value);
    })
}

function check_err(col,row,group,value){
    let err=0;
    const input=document.querySelector(`.col${col}.row${row}`);
    const cols=document.querySelectorAll(`.col${col}`);
    const rows=document.querySelectorAll(`.row${row}`);
    const groups=document.querySelectorAll(`.group${group}`);
    cols.forEach((col,index)=>{
        if ((index+1)!=row){
            if (col.value==value) err++;
        }
    })
    rows.forEach((row,index)=>{
        if ((index+1)!=col){
            if (row.value==value) err++;
        }
    })
    let err_group=0;
    groups.forEach((group)=>{
        if (group.value==value) err_group++;
    })
    if (err_group>1) err++;
    if (err){
        input.setAttribute('style','color:red');
    } else {input.setAttribute('style','color:green');}
}