//[idWord][0-Mot en anglais, 1-Mot en français]
var listWord = [
	["Blue", "Bleu"],
	["Green", "Vert"],
	["Pink", "Rose"],
	["Red", "Rouge"]
] ;

//[idWordAsked][0-ID Question Bonne Réponse, 1-Réponse 1, 2-Réponse 2, 3-Réponse 3, 4-Réponse 4, 5-Réponse Sélectionné]
var listAsk ;

/*---Variable état du jeu---*/
var langGame ;
var stateGame ;

/*---Variable du jeu des question---*/
var askSelected ;
var nbQuestion ;
var questionDisplay ;
var score ;

window.onload = function (){
	setHome() ;
}

function setHome() {
	/*---Variable---*/
	var element ;
	var tempText ;

	stateGame = "home" ;

	/*---Nettoyage de la page---*/
	cleanHTML() ;

	element = document.createElement("div") ;
	element.id = "rowLevel1" ;
	element.className = "row row25" ;
	document.getElementById("mainDiv").appendChild(element) ;

	element = document.createElement("div") ;
	element.id = "rowLevel2" ;
	element.className = "row row25" ;
	document.getElementById("mainDiv").appendChild(element) ;

	element = document.createElement("div") ;
	element.id = "rowLevel3" ;
	element.className = "row row25" ;
	document.getElementById("mainDiv").appendChild(element) ;

	element = document.createElement("div") ;
	element.id = "rowListWord" ;
	element.className = "row row25" ;
	document.getElementById("mainDiv").appendChild(element) ;

	/*---Ajoute les boutons de sélection de niveau---*/
		//Ajoute le bouton français de niveau 1
	putButton("rowLevel1", "Game", "Apprentissage niveau 1", "niveau1") ;
		//Ajoute le bouton français de niveau 2
	putButton("rowLevel2", "Game", "Apprentissage niveau 2", "niveau2") ;
		//Ajoute le bouton français de niveau 3
	putButton("rowLevel3", "Game", "Apprentissage niveau 3", "niveau3") ;
		//Ajoute le bouton anglais level 1
	putButton("rowLevel1", "Game", "Learning level 1", "level1") ;
		//Ajoute le bouton anglais level 2
	putButton("rowLevel2", "Game", "Learning level 2", "level2") ;
		//Ajoute le bouton anglais level 3
	putButton("rowLevel3", "Game", "Learning level 3", "level3") ;
		//Ajoute le bouton pour afficher la liste de mot
	putButton("rowListWord", "List", "Liste des mots", null) ;
}

function startGame(playSelect) {
	/*---Variable---*/
	var element ;
	//var tempText ;

	/*---Paramètre les variables du jeu---*/
	listAsk = [] ;
	score = 0 ;
	nbQuestion = 1 ;
	questionDisplay = nbQuestion-1 ;

	/*---Néttoye la page---*/
	cleanHTML() ;

	/*---Crée la zone et le bouton retour---*/
	element = document.createElement("div") ;
	element.id = "backRow" ;
	element.className = "row row10" ;
	document.getElementById("mainDiv").appendChild(element) ;
	putButton("backRow", "Back", "Retour", null) ;

	/*---Crée la zone qui affiche le score---*/
	element = document.createElement("div") ;
	element.id = "scoreRow" ;
	element.className = "row row10 txtCenter" ;
	document.getElementById("mainDiv").appendChild(element) ;
	updateScore() ;

	/*---Crée la div de jeu---*/
	element = document.createElement("div") ;
	element.id = "gameRow" ;
	element.className = "row row40" ;
	document.getElementById("mainDiv").appendChild(element) ;

	/*---Crée la div de la question---*/
	element = document.createElement("div") ;
	element.id = "askRow" ;
	element.className = "row row25 txtCenter" ;
	document.getElementById("gameRow").appendChild(element) ;

	/*---Crée la div des réponses---*/
	element = document.createElement("div") ;
	element.id = "answerRow" ;
	element.className = "row row75" ;
	document.getElementById("gameRow").appendChild(element) ;

	/*---Crée la div des résultats---*/
	element = document.createElement("div") ;
	element.id = "resultRow" ;
	element.className = "row row30" ;
	document.getElementById("mainDiv").appendChild(element) ;

	/*---Crée la div précédent-suivant---*/
	element = document.createElement("div") ;
	element.id = "prevNextRow" ;
	element.className = "row row10" ;
	document.getElementById("mainDiv").appendChild(element) ;

	element = document.createElement("div") ;
	element.id = "colPrev" ;
	element.className = "col-sm-6" ;
	document.getElementById("prevNextRow").appendChild(element) ;

	element = document.createElement("div") ;
	element.id = "colNext" ;
	element.className = "col-sm-6" ;
	document.getElementById("prevNextRow").appendChild(element) ;

	switch (playSelect) {
		case "niveau1" :
			langGame = "français" ;
			stateGame = 2 ;
		break ;
		case "niveau2" :
			langGame = "français" ;
			stateGame = 4 ;
		break ;
		case "niveau3" :
			langGame = "français"
			stateGame = "cash" ;
		break ;
		case "level1" :
			langGame = "english" ;
			stateGame = 2 ;
		break ;
		case "level2" :
			langGame = "english" ;
			stateGame = 4 ;
		break ;
		case "level3" :
			langGame = "english"
			stateGame = "cash" ;
		break ;
	}

	randomAsk() ;
	/*---Place la question---*/
	writeQuestion(listAsk[questionDisplay][0]) ;
	/*---Crée l'espace de réponse---*/
	if (stateGame == "cash"){writeAnswerZone() ;}
	else{randomAnswer() ; writeAnswerButton(false) ;}
}

function randomAsk() {
	/*---Variable---*/
	var labelButton ;
	var idWordInButton ;
	var buttonAnswer ;
	var temp ;
	var idUsed = [];
	var alreadyUsed ;


	/*---Sélectione la question---*/
	listAsk[questionDisplay] = [getRandom(0, listWord.length)] ; //Sélectionne le mot à traduire
	listAsk[questionDisplay][5] = null ;
}

function randomAnswer() {
	var idUsed = [listAsk[questionDisplay][0]] ; //Stock l'id des mots déjà utilisé
	var temp ;
	var idWordInButton ;

	var buttonAnswer = getRandom(0, stateGame) ;
	listAsk[questionDisplay][buttonAnswer] = listAsk[questionDisplay][0] ;

	for (var i = 0; i < stateGame; i++) {
		if (i == buttonAnswer){idWordInButton = listAsk[questionDisplay][0] ;}
		else {
			//Choisi un mot parmi la liste et vérifie si il n'est pas déjç utilisé
			alreadyUsed = true ;
			while(alreadyUsed) {
				alreadyUsed = false ;
				temp = getRandom(0, listWord.length) ;
				for (var j = 0; j < idUsed.length; j++) {if (idUsed[j] == temp){alreadyUsed = true ;}}
			}
			idWordInButton = temp ;
			idUsed[idUsed.length] = idWordInButton ;
		}
		listAsk[questionDisplay][1+i] = idWordInButton ;	
	}
	if (stateGame == 2){
		listAsk[questionDisplay][3] = null ;
		listAsk[questionDisplay][4] = null ;
	}
}

function writeQuestion(idWordAsked) {
	var tempText ;
	switch (langGame) {
		case "français" :
			tempText = "Question "+(questionDisplay+1)+" : Quelle est la traduction française de « "+listWord[idWordAsked][0]+" » ?" ;
		break ;
		case "english" :
			tempText = "Question "+(questionDisplay+1)+" : What is the English translation of « "+listWord[idWordAsked][1]+" » ?" ;
		break ;
	}
	document.getElementById("askRow").innerHTML = tempText ;
}

function writeAnswerButton(isResult) {
	var typeButton ;
	var infoFuncButton ;
	var element ;

	if (!isResult){typeButton="Answer" ;}
	if (isResult){infoFuncButton=null ;}

	for (var i = 1; i < stateGame+1; i++) {

		element = document.createElement("div") ;
		element.id = "colButAnswer"+i ;
		element.className = "col-sm-6" ;
		document.getElementById("answerRow").appendChild(element) ;

		switch (langGame) {
			case "français" :
				labelButton = listWord[listAsk[questionDisplay][i]][1];
			break ;
			case "english" :
				labelButton = listWord[listAsk[questionDisplay][i]][0];
			break ;
		}
		if(isResult)
		{
			typeButton = "result" ;
			if(listAsk[questionDisplay][i] == listAsk[questionDisplay][5]) {typeButton = "badResult";}
			if(listAsk[questionDisplay][i] == listAsk[questionDisplay][0]) {typeButton = "goodResult" ;}
		}
		putButton("colButAnswer"+i, typeButton, labelButton, listAsk[questionDisplay][i]) ;
	}
}

function writeAnswerZone() {
	var element ; //Reçoit l'élément à ajouter dans la page web
	var tempText ; //Reçoit le texte de l'élément

	document.getElementById("answerRow").className = "row row75" ;

	element = document.createElement("div") ;
	element.id = "answerTxtRow" ;
	element.className = "row" ;
	document.getElementById("answerRow").appendChild(element) ;

	element = document.createElement("input") ;
	element.type = "text" ;
	element.id = "textAnswer" ;
	document.getElementById("answerTxtRow").appendChild(element) ;

	element = document.createElement("div") ;
	element.id = "answerButRow" ;
	element.className = "row" ;
	document.getElementById("answerRow").appendChild(element) ;

	tempText = document.createTextNode("Valider") ;
	element = document.createElement("button") ;
	element.id = "buttonTextAnswer" ;
	element.className = "btn btn-primary" ;
	element.appendChild(tempText) ;
	element.onclick = function(){testTextAnswer();}
	document.getElementById("answerButRow").appendChild(element) ;

	element = document.createElement("div") ;
	element.id = "infoTextAnswer" ;
	element.className = "row txtInfo" ;
	tempText = document.createTextNode("*Faites bien attention à l'orthographe et la première lettre doit être en majuscule.") ;
	element.appendChild(tempText) ;
	document.getElementById("answerRow").appendChild(element) ;
}

function testButtonAnswer(idAnswer) {
	/*---Variable---*/
	var element ;
	var tempText ;

	listAsk[questionDisplay][5] = idAnswer ;

	element = document.createElement("div") ;
	element.id = "titleResultRow" ;
	element.className = "row txtCenter" ;
	if(idAnswer==listAsk[questionDisplay][0]){
		score += 1 ;
		tempText = document.createTextNode("Bonne réponse ! Votre score est : "+score+"/"+nbQuestion) ;
	}
	else {
		tempText = document.createTextNode("Mauvaise réponse ! Votre score est : "+score+"/"+nbQuestion) ;
	}
	element.appendChild(tempText) ;
	document.getElementById("resultRow").appendChild(element) ;

	displayAnswer() ;

	putButton("colNext", "Next", "Suivant", null) ;

	nbQuestion += 1 ;
	updateScore() ;
}

function testTextAnswer() {
	var playerAnswer = document.getElementById("textAnswer").value ;
	var goodAnswer ;

	listAsk[questionDisplay][5] = playerAnswer ;

	switch (langGame) {
		case "français" :
			goodAnswer = listWord[listAsk[questionDisplay][0]][1];
		break ;
		case "english" :
			goodAnswer = listWord[listAsk[questionDisplay][0]][0];
		break ;
	}

	document.getElementById("answerRow").innerHTML = "Votre réponse est « "+playerAnswer+" »." ;

	element = document.createElement("div") ;
	element.id = "titleResultRow" ;
	element.className = "row txtCenter" ;

	if (playerAnswer==goodAnswer){
		score += 1 ;
		tempText = document.createTextNode("Bonne Réponse ! Votre score est : "+score+"/"+nbQuestion) ;
	}
	else {
		tempText = document.createTextNode("Mauvaise réponse ! Votre score est : "+score+"/"+nbQuestion) ;
	}
	element.appendChild(tempText) ;
	document.getElementById("resultRow").appendChild(element) ;

	displayAnswer() ;

	putButton("colNext", "Next", "Suivant", null) ;

	nbQuestion += 1 ;
	updateScore() ;
}

function displayAnswer() {
	/*---Variable---*/
	var element ;
	var tempText ;

	/*---Redessine les boutons---*/
	document.getElementById("answerRow").innerHTML = "" ;

	if (stateGame == "cash"){
		tempText = document.createTextNode("Votre réponse est « "+listAsk[questionDisplay][5]+" ».") ;
		document.getElementById("answerRow").className = "row row75 txtCenter" ;
		document.getElementById("answerRow").appendChild(tempText) ;
	}
	else{writeAnswerButton(true) ;}

	/*---Donne la réponse---*/
	element = document.createElement("div") ;
	element.id = "txtResultRow" ;
	element.className = "row txtCenter" ;
	tempText = document.createTextNode("« "+listWord[listAsk[questionDisplay][0]][0]+" » se traduit en français par « "+listWord[listAsk[questionDisplay][0]][1]+" ».") ;
	element.appendChild(tempText) ;
	document.getElementById("resultRow").appendChild(element) ;
}

function displayListWord() {
	/*---Variable---*/
	var element ;
	var tempText ;

	/*---Fonction---*/
	cleanHTML() ;

	element = document.createElement("div") ;
	element.id = "backRow" ;
	element.className = "row row10" ;
	document.getElementById("mainDiv").appendChild(element) ;
	putButton("backRow", "Back", "Retour", null) ;

	for (var i = 0; i < listWord.length; i++) {
		element = document.createElement("div") ;
		element.className = "row" ;
		tempText = document.createTextNode(listWord[i][0]+" : "+listWord[i][1]) ;
		element.appendChild(tempText) ;
		document.getElementById("mainDiv").appendChild(element) ;
	}
}

function previousQuestion() {
	cleanGame() ;

	questionDisplay -= 1 ;

	writeQuestion(listAsk[questionDisplay][0]) ;
	writeAnswerButton(true) ;
	displayAnswer() ;
	if (questionDisplay!=0){putButton("colPrev", "Previous", "Précédent", null) ;}
	putButton("colNext", "Next", "Suivant", null) ;
}

function nextQuestion() {
	/*---Variable---*/
	var isResult = false;

	cleanGame() ;

	questionDisplay += 1 ;

	if(questionDisplay==listAsk.length)
	{
		randomAsk() ;
		if(stateGame != "cash"){randomAnswer() ;}

		isResult = false ;
	}
	else if (listAsk[questionDisplay][5]==null) {isResult = false ;}
	else {isResult = true ;}

	/*---Place la question---*/
	writeQuestion(listAsk[questionDisplay][0]) ;
	/*---Crée l'espace de réponse---*/
	if (stateGame == "cash"){writeAnswerZone() ;}
	else{writeAnswerButton(isResult) ;}
	if (isResult){displayAnswer() ;}
	
	putButton("colPrev", "Previous", "Précédent", null) ;
	if (questionDisplay!=nbQuestion-1){putButton("colNext", "Next", "Suivant", null) ;}
}

function updateScore() {
	document.getElementById("scoreRow").innerHTML = "Votre score est de "+score+" sur "+(nbQuestion-1)+"." ;
}

/*---Outil---*/
//Vide la partie HTML
function cleanHTML() {
	document.getElementById("mainDiv").innerHTML = "" ;
}

//Vide la partie HTML du jeu
function cleanGame() {
	document.getElementById("askRow").innerHTML = "" ;
	document.getElementById("answerRow").innerHTML = "" ;
	document.getElementById("resultRow").innerHTML = "" ;
	document.getElementById("colPrev").innerHTML = "" ;
	document.getElementById("colNext").innerHTML = "" ;
}

//Retourne un nombre aléaroire entre min inclu et max exclu
function getRandom (min, max) {return Math.floor(Math.random() * (max - min)) + min; ;}