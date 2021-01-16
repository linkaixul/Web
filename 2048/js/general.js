// var documentwidth = document.documentElement.clientWidth;
// var containerwidth = documentwidth*0.92;
// var cellwidth = documentwidth*0.18;
// var cellspace = documentwidth*0.04;
// console.log(documentwidth,containerwidth,cellwidth,cellspace);
/*
var documentwidth = document.documentElement.clientWidth;
var containerwidth = documentwidth*0.92;
var cellwidth = documentwidth*0.18;
var cellspace = documentwidth*0.04;
console.log(documentwidth,containerwidth,cellwidth,cellspace);


function getPosT(i,j) {
	return cellspace+(cellwidth+cellspace)*i;
	// body...
}
function getPosL(i,j) {
	return cellspace+(cellwidth+cellspace)*j;
	// body...
}
*/

function getPosT(i,j) {
	return 20+(120)*i;
	// body...
}
function getPosL(i,j) {
	return 20+(120)*j;
	// body...
}


function noSpace(num) {
	for (var i =0; i<4; i++) {
		for (var j=0; j<4; j++){
			if (num[i][j] == 0){
				return false;
			} 
		}
	}
	return true;
	// body...
}

function getNumColor(num) {
	if (num<=4){
		return '#736c65';
	}else{
		return '#fff';
	}

	// body...
}

function getNumBackgroundColor(num) {
	switch(num){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
	// body...
}
function canMoveL(num) {
	for (var i =0; i<4; i++) {
		for (var j=1; j<4; j++){
			if(num[i][j]!=0){
				if(num[i][j-1]==0 || num[i][j-1]==num[i][j]){
					return true;
				}
			}
		}
	}
	return false;
	// body...
}
function canMoveR(num) {
	for (var i =0; i<4; i++) {
		for (var j=0; j<3; j++){
			if(num[i][j]!=0){
				if(num[i][j+1]==0 || num[i][j+1]==num[i][j]){
					return true;
				}
			}
		}
	}
	return false;
	// body...
}

function canMoveUp(num) {
	for (var i =1; i<4; i++) {
		for (var j=0; j<4; j++){
			if(num[i][j]!=0){
				if(num[i-1][j]==0 || num[i-1][j]==num[i][j]){
					return true;
				}
			}
		}
	}
	return false;
	// body...
}

function canMoveD(num) {
	for(var i=0;i<3;i++){
		for (var j=0;j<4;j++){
			if(num[i][j]!=0){
				if(num[i+1][j] == 0 || num[i+1][j]==num[i][j]){
					return true;
				}
			}
		}
	}
	return false;
	// body...
}



function noMove(num) {
	if(canMoveL(num) || canMoveR(num) || canMoveUp(num) || canMoveD(num)){
		return false;
	}
	return true;
}

function noBlockHorizontal(row,col1,col2,num){
	for(var i=col1+1;i<col2;i++){
		if(num[row][i]!=0){
			return false;
		}
	}
	return true;
}

function noBlockVertical(col,row1,row2,num){
	for(var i = row1+1; i<row2;i++){
		if(num[i][col] !=0){
			return false;
		}
	}
	return true;
}

function updateScore(score) {
	//console.log(22);
	$('#score').text(score);
	// body...
}

function isGameOver() {
	if(noSpace(num) && noMove(num)){
		alert('Game Over!');
	}
}