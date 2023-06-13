const numbers=[1,2,3,4,5,6,7,8,9];
for (row=0;row<9;row++){
    values[row]=[];
    for (col=0;col<9;col++){
        values[row][col]=0;
    }
}
for (row=0;row<9;row++){
    for (col=0;col<9;col++){
        const number=values[row][col];
        create_number(values,number,row,col);
    }
}
function create_number(values,number,row,col){
    if ((!check_row(values,number,row)) && !(check_col(values,number,col))) return number;
    else {
        numbers.forEach(x=>{
            number=x;
            create_number(values,number,row,col);
        })
    }
}
function check_row(values,number,row){
    for (col=0;col<9;col++){
        if (values[row][col]=number) return false ;else return true;
    }
}
function check_col(values,number,col){
    for (row=0;row<9;row++){
        if (values[row][col]=number) return false ;else return true;
    }
}
// function check_gr(values,number,row,col){

// }
console.log(values);