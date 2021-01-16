function showNumWithAn(i,j,randNum) {
	var cellnumber = $('#cell-number-'+i+'-'+j);
	cellnumber.css('background-color',getNumBackgroundColor(randNum));
	cellnumber.css('color',getNumColor(randNum));
	cellnumber.text(randNum);
	cellnumber.animate({
		width:'100px',
		height:'100px',
		top:getPosT(i,j),
		left:getPosL(i,j)
	},300);
	// body...
}

function showMoveAn(fromx,fromy,tox,toy) {
	var cellnumber=$('#cell-number-'+fromx+'-'+fromy);
	cellnumber.animate({
		top:getPosT(tox,toy),
		left:getPosL(tox,toy)
	}, 300)   //等等300ms显示动画移到

	// body...
}