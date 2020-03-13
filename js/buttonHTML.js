function putButton(idDiv, typeButt, labelButt, infoFuncButt) {
	/*---Variable---*/
	var element ; //Reçoit l'élément à ajouter dans la page web
	var tempText ; //Reçoit le texte de l'élément
	var tempClass ; //Reçoit la class de l'élément
	var tempFunction ; //Reçoit la fonction lié au bouton

	/*---Paramètre le bouton---*/
	tempText = document.createTextNode(labelButt) ;

	switch (typeButt) {
		case "Back" :
			tempClass = "btn btn-success" ;
			tempFunction = function(){setHome();};
		break ;
		case "List" :
			tempClass = "btn btn-success" ;
			tempFunction = function(){displayListWord();} ;
		break ;
		case "Game" :
			tempClass = "btn btn-primary" ;
			tempFunction = function(){startGame(infoFuncButt);} ;

			element = document.createElement("div") ;
			element.id = "col"+infoFuncButt ;
			element.className = "col-sm-6" ;
			document.getElementById(idDiv).appendChild(element) ;
			idDiv = "col"+infoFuncButt ;
		break ;
		case "Answer" :
			tempClass = "btn btn-primary" ;
			tempFunction = function(){testButtonAnswer(infoFuncButt);} ;
		break ;
		case "goodResult" :
			tempClass = "btn btn-success" ;
			tempFunction = null ;
		break ;
		case "badResult" :
			tempClass = "btn btn-danger" ;
			tempFunction = null ;
		break ;
		case "result" :
			tempClass = "btn btn-primary" ;
			tempFunction = null ;
		break ;
		case "Previous" :
			tempClass = "btn btn-primary" ;
			tempFunction = function(){previousQuestion() ;} ;
		break ;
		case "Next" :
			tempClass = "btn btn-primary" ;
			tempFunction = function(){nextQuestion() ;} ;
		break ;
	}

	/*---Place le bouton---*/
	element = document.createElement("button") ;
	element.className = tempClass ;
	element.onclick = tempFunction ;
	element.appendChild(tempText) ;

	document.getElementById(idDiv).appendChild(element) ;
}