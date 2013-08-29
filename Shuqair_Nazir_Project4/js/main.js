// JavaScript Document
// Nazir Shuqair
// VFW 1308
// 20 Aug 2013
// Project 4

window.addEventListener("DOMContentLoaded", function(){
	//alert(localStorage.value(0));
	//getElementByID function
	function $(e){
		var element = document.getElementById(e);
		return element;
	}
	
	//Create select field elements and populate with options
	function popSec(){
		var formTag =  document.getElementsByTagName("form");//formTag is an array of all form tags
		var selectLi = $('select');
		var makeSelect = document.createElement('select');
		makeSelect.setAttribute("id", "bridges");
		for(var i=0, j = bridgeGroup.length; i < j; i++){
			var makeOption = document.createElement('option');
			var optText= bridgeGroup[i];
			makeOption.setAttribute("value", optText);	
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	//Find the value of a selected radio button
	function getSelectedRadio(){
		var radios = document.forms[0].check;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
			userRValue = radios[i].value;
			}
		}
	}
	
	function getCheckBoxValue(){
		if($('pp').checked){
			ppValue = $('pp').value;
		}else{
			ppValue = "No";	
		}
	}

	/*function getCheckBoxValue(){
		var checkBoxes = document.forms[0].hit;
		var checkArray = [];
		var testing = [];
		//console.log(checkBoxes[1]);
		for(var i=0; i<checkBoxes.length; i++){
			if(checkBoxes[i].checked){
				checkbValue = checkBoxes[i].value;
				checkArray[i] = checkbValue;
				testing[i] = i;
			}else{
				checkbValue = "No";	
			}
		}
		retriveNum(testing);
		return checkArray;
	}
	
	function retriveNum (num){
		var ckNum = [];
		ckNum = num;
		console.log(ckNum);
	}*/
	
	//turn links on and off
	function toggleControls(n){
			switch(n){
				case "on":
					$('meetingForms').style.display = "none";
					$('clearD').style.display = "inline";
					$('displayD').style.display = "none";
					$('additem').style.display = "inline";
					break;
				case "off":
					$('meetingForms').style.display = "block";
					$('clearD').style.display = "inline";
					$('displayD').style.display = "inline";
					$('submit').style.display = "inline";
					$('items').style.display = "none";
					break;
				default:
					return false;
			}
	}
	
	function storeData(key){
		// if no key, this is a new post, if there is a key, its an old item being edited
		if(!key){
			var id 				= Math.floor(Math.random() * 100001);
		}else{
			id = key;
		}
		//Gather up all our form field values and store in an object
		//Object properties containt array with the form label and input value 
		getSelectedRadio();
		getCheckBoxValue();
		
		var item 			= {};
			item.date 		= ["Date of Meeting:", $('date').value ];
			item.nameM 		= ["Name of Meeting:", $('nameM').value];
			item.poc		= ["Contact Number:", $('poc').value];
			item.roomN 		= ["Room Number:", $('roomN').value];
			item.meetingT 	= ["Meeting Time:", $('meetingT').value];
			item.checkb 	= ["Capabilities Needed:", ppValue];
			item.bridges 	= ["Using Bridge:", $('bridges').value];
			item.code 		= ["Call Code:", $('code').value];
			item.length 	= ["Length of Meeting:", $('length').value];
			item.userR 		= ["User Responded:", userRValue];
			item.notes		= ["Notes:", $('notes').value];
		//Save data to local storage.  Use stringify to convert objects to strings
		localStorage.setItem(id, JSON.stringify(item));
		alert("Meeting Saved!");
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("You do not have any Scheduled Meetings! ***Default Data Loaded***");
			autoFillData();
		}else{
			//Write data from local storage to browser
			var makeDiv = document.createElement('div');
			makeDiv.setAttribute("id","items");
			var makeList = document.createElement('ul');
			makeDiv.appendChild(makeList);
			document.body.appendChild(makeDiv);	
			$('items').style.display = "block";
			for(i=0, j= localStorage.length; i<j;i++){
				var makeli = document.createElement('li');
				var makeLinks = document.createElement('li');
				makeList.appendChild(makeli);
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				//Convert String from localStorage value back to an object by using JSON parse
				var obj = JSON.parse(value);
				console.log(obj);
				var makeSubList = document.createElement('ul');
				makeli.appendChild(makeSubList);
				for(var n in obj){
					var makeSubLi= document.createElement('li');
					makeSubList.appendChild(makeSubLi);
					var optSubText = obj[n][0]+" "+ obj[n][1];
					makeSubLi.innerHTML = optSubText;
					makeSubList.appendChild(makeLinks);
				}
				makeItemLinks(localStorage.key(i), makeLinks); //creates our edit or delete links for each item in local storage
			}
		}
	}
	
	// Creates the edit and delete links
	function makeItemLinks(key, makeLinks){
		//Add edit single Item link
		var editLink = document.createElement('a');	
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		makeLinks.appendChild(editLink);
		
		var breakTag = document.createElement('br');
		makeLinks.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');	
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		makeLinks.appendChild(deleteLink);
	}
	
	//Auto populate local storage
	function autoFillData(){
		//The actual JSON Object data required for this to work is coming from json.js file which is loaded form the html page
		//Store the JSON into local storage
		for(var q in json){
			var id = Math.floor(Math.random() * 100001);
			localStorage.setItem(id, JSON.stringify(json[q]));
		}	
	}
	
	function editItem(cb){
		//Grab data from our item in local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		//show form again
		toggleControls("off");	
		
		//populate form fields with the current local storage values
		$('date').value = item.date[1];
		$('nameM').value = item.nameM[1];
		$('poc').value = item.poc[1];
		$('roomN').value = item.roomN[1];
		$('meetingT').value = item.meetingT[1];
		//Radio button population, must be a better way to write this!
		var radios = document.forms[0].check;
		for(i = 0; i < radios.length ; i++){
			if(radios[i].value == "yes" && item.userR[1] == "yes"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "no" && item.userR[1] == "no"){
				radios[i].setAttribute("checked", "checked");	
			}
		}
		if(item.checkb[1] == "pp"){
			$('pp').setAttribute("checked", "checked");	
		}
		$('bridges').value = item.bridges[1];
		$('code').value = item.code[1];
		$('length').value = item.length[1];
		$('notes').value = item.notes[1];
		
		//remove the intial listener from the input "add" button
		add.removeEventListener("click", storeData);
		//Change submit button value to edit button value
		$('submit').value = "Edit Meeting";
		var editSubmit = $('submit');
		
		//Save value established in this function as a property of editSubmit Event
		//so we can use that value, when we save the data we edited
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;		
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Meeting Deleted");
			window.location.reload();
		}else{
			alert("Meeting was not deleted");
		}
	}
	//Clear Data Function
	function clearLocal(){
		if(localStorage.length === 0){
			alert("Nothing to clear!")
		}else{
			localStorage.clear();
			alert("Schedule is cleared");
			window.location.reload();
			return false;
		}
	}
	
	function validate(e){
		//Define the elements we want to check
		var getDat = $('date');
		var getNameM = $('nameM');
		var getRoomN = $('roomN');
		var getMeetingT = $('meetingT');
		var getPoc = $('poc');
		
		//Reset Error Messages
		errMsg.innerHTML = "";
		getDat.style.border = "1px solid black";
		getNameM.style.border = "1px solid black";
		getRoomN.style.border = "1px solid black";
		getMeetingT.style.border = "1px solid black";
		getPoc.style.border = "1px solid black";
		//get Error messages
		var messageAry = [];
		//check for group validation
		if(getDat.value === ""){
			var datError = "Please enter a Date"
			getDat.style.border = "1px solid red";
			messageAry.push(datError);
		}
		if(getNameM.value === ""){
			var nameMError = "Please enter a Meeting Name"
			getNameM.style.border = "1px solid red";
			messageAry.push(nameMError);
		}
		var roomNum = /^\(?([0-9]{1})\)?[-. ]?([0-9]{3})$/
		if(!(roomNum.exec(getRoomN.value))){
			var roomNError = "Please enter a valid room number"
			getRoomN.style.border = "1px solid red";
			messageAry.push(roomNError);
		}
		if(getMeetingT.value === ""){
			var meetingTError = "Please enter a Meeting Time"
			getMeetingT.style.border = "1px solid red";
			messageAry.push(meetingTError);
		}
		// phone number validation
		var phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		if(!(phone.exec(getPoc.value))){
			var pocError = "Please enter a valid Phone number"
			getPoc.style.border = "1px solid red";
			messageAry.push(pocError);	
		}
		
		//if there were errors, display them on the screen
		if (messageAry.length >= 1){
			for(var i = 0, j = messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				console.log(messageAry[i]);
				errMsg.appendChild(txt);	
			} 
			e.preventDefault();
			return false;
		}else{
			//send the key value which came from the editdata function
			storeData(this.key);
		}
  		
	}
	
	//variabes default
	
	var bridgeGroup = ["--Select--", "USAMTIC Audio", "USAMTIC Video", "TMS Audio", "TMS Video"],
		userRValue,
		ppValue = "No",
		errMsg = $('errors');
	popSec();
	
	//Set Links and submit click events
	var displayD = $('displayD');
	displayD.addEventListener("click", getData);
	var clearD = $('clearD');
	clearD.addEventListener("click", clearLocal);
	var add = $('submit');
	add.addEventListener("click", validate);
	
	
});