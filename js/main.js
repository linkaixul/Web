
var num = new Array();
var score = 0;
var hasConflict = new Array();

$(document).ready(function(){
	newgame();
});

function newgame(){
	//settingForMobile();

	init();

	//在随机两个格中生成数字
	generateNumber();
	generateNumber();
}

function init(){
	//初始化单元格位置cell
	for (var i=0;i<4;i++){
		for (var j =0; j<4; j++){
			var cell=$('#cell-'+i+'-'+j);
			cell.css('top',getPosT(i,j));
			cell.css('left',getPosL(i,j));
			//20+100 row 1
			//2(20+100) row 2
			//baaa9b
		}
	}

	//initial数组初始化
	for (var i = 0; i<4; i++) {
		num[i] = new Array();
		hasConflict[i] = new Array();
		for (var j = 0; j<4; j++) {
			num[i][j] = 0;
			hasConflict[i][j] = false; //false=未叠加
		}
	}

	//num[0][2] = 4;
	//num[1][3] = 16;
	//num[2][0] = 8;
	//动态create上层单元格并初始化
	updateView();
	score = 0;
	updateScore(score);
}

function updateView() {
	//clean清空上层单元格，并初始化
	$('.cell-number').remove();
	for (var i = 0; i <4; i++) {
		for (var j = 0;j<4;j++){
			$('#grid').append('<div class="cell-number" id="cell-number-'+i+'-'+j+'"></div>')
			
			var cellnumber= $('#cell-number-'+i+'-'+j);

			if(num[i][j] ==0){
				cellnumber.css('width','0px');
				cellnumber.css('height','0px');
				cellnumber.css('left',getPosL(i,j));
				cellnumber.css('top',getPosT(i,j));

			}else{
				cellnumber.css('width','100px');
				cellnumber.css('height','100px');
				cellnumber.css('left',getPosL(i,j));
				cellnumber.css('top',getPosT(i,j));
				cellnumber.css('background-color',getNumBackgroundColor(num[i][j]));
				cellnumber.css('color',getNumColor(num[i][j]));
				cellnumber.text(num[i][j]);
			}
			hasConflict[i][j]=false;

			//mobile server setting
			// $('cell-number').css('border-radius','6px');
			// $('cell-number').css('font-size','10px');
			// $('cell-number').css('line-height','5px');

		}
		
	}
	// body...
}

function generateNumber() {
	//建立x,y坐标 ->生成
	//1.判断是否还有空格？
	if (noSpace(num)){
		return;
	}
	//随机一个位置
	var count = 0;
	var temp=new Array();
	for (var i =0; i<4; i++) {
		for (var j=0;j<4;j++){
			if(num[i][j]==0){
				temp[count] = i*4 +j;     //if i=1,j=3,x=7 -> 7/4=1, 7%4=3(j)
				count++;
			}
		}
	}
	var pos = Math.floor(Math.random()*count);  //[0,1]*6 = [0,5]
	var randx = Math.floor(temp[pos]/4); //向下取整数
	var randy = Math.floor(temp[pos]%4);


	//random number
	var randNum = Math.random()<0.5?2:4 //(<0.5取2,>0.5取4)

	//在随机位置显示随机数
	num[randx][randy] =randNum;
	showNumWithAn(randx,randy,randNum);



	//if all 16 cell is filled, but not yet finish
}

//实现键盘相应
$(document).keydown(function(event){
	//阻止event默认行为（页面滑动）
	event.preventDefault();
	switch(event.keyCode){
		case 37: //left
			//判断是否可左移动
			if(canMoveL(num)){
				moveLeft();
				setTimeout(generateNumber,400);
				setTimeout(isGameOver,800);
				//generateNumber();
			}
			break;
		case 38: //up
			if(canMoveUp(num)){
				moveUp();
				setTimeout(generateNumber,400);
				setTimeout(isGameOver,800);
			}

			break;
		case 39: //right
			if(canMoveR(num)){
				moveRight();
				setTimeout(generateNumber,400);
				setTimeout(isGameOver,800);
			}

			break;
		case 40:  //down
			if(canMoveD(num)){
				moveDown();
				setTimeout(generateNumber,400);
				setTimeout(isGameOver,800);
			}

			break;
	}
});

function moveLeft() {
	for(var i=0;i<4;i++){
		for (var j=1;j<4;j++){
			if(num[i][j]!=0){
				for(var k=0;k<j;k++){
					if(num[i][k] == 0 && noBlockHorizontal(i,k,j,num)){
						//console.log(11);
						showMoveAn(i,j,i,k);
						num[i][k] = num[i][j];
						num[i][j] = 0;
						break;
					}else if(num[i][k] ==num[i][j] && noBlockHorizontal(i,k,j,num) && !hasConflict[i][k]){
						showMoveAn(i,j,i,k);  //动画效果
						num[i][k] += num[i][j];  //add
						num[i][j] = 0;     //设置原来位置=0  
						//统计score
						score += num[i][k];
						updateScore(score);

						hasConflict[i][k] = true;  //已经叠加，false=未叠加
						break;
					}

				}
			}
		}
	}
	//正在更新显示移动后的效果
	setTimeout(updateView,200); 
	
	// body...
}
function moveRight() {
	for(var i=0;i<4;i++){
		for (var j=2;j>=0;j--){
			if(num[i][j]!=0){
				for(var k=3;k>j;k--){
					if(num[i][k] ==0 && noBlockHorizontal(i,j,k,num)){
						showMoveAn(i,j,i,k);
						num[i][k] = num[i][j];
						num[i][j] = 0;
						break;
					}else if(num[i][k] ==num[i][j] && noBlockHorizontal(i,j,k,num) && !hasConflict[i][k]){
						showMoveAn(i,j,i,k);
						num[i][k] += num[i][j];
						num[i][j] = 0;
						score += num[i][k];
						updateScore(score);

						hasConflict[i][k]=true;
						break;
					}
				}

			}
		}
		
	}
	//正在更新显示移动后的效果
	setTimeout(updateView,200); 
	
	// body...
}
function moveUp() {
	for (var j = 0; j<4; j++){
		for(var i=1; i<4;i++){
			if(num[i][j]!=0){
				for (var k=0;k<i;k++){                //colomn j:row k -> i
					if(num[k][j]==0 && noBlockVertical(j,k,i,num)){
						showMoveAn(i,j,k,j);
						num[k][j] = num[i][j];
						num[i][j] = 0;
						break;
					}else if(num[k][j] == num[i][j] && noBlockVertical(j,k,i,num) && !hasConflict[k][j]){
						showMoveAn(i,j,k,j);
						num[k][j]+=num[i][j];
						num[i][j] = 0;
						score += num[k][j];
						updateScore(score);

						hasConflict[k][j] = true;
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView,200);
	// body...
}

function moveDown() {
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(num[i][j]!=0){
				for (var k=3;k>i;k--){
					if(num[k][j]==0 && noBlockVertical(j,i,k,num)){
						showMoveAn(i,j,k,j);
						num[k][j] = num[i][j];
						num[i][j] = 0;
						break;
					}else if(num[k][j]==num[i][j] && noBlockVertical(j,i,k,num) && !hasConflict[k][j]){
						showMoveAn(i,j,k,j);
						num[k][j]+=num[i][j];
						num[i][j]=0;
						score+=num[k][j];
						updateScore(score);

						hasConflict[k][j]=true;
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView,200);
	// body...
}