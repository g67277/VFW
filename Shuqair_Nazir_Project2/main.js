// JavaScript Document

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
		var checkBoxes = document.forms[0].hit;
		for(var i=0; i<checkBoxes.length; i++){
			console.log(checkBoxes[i].value);
			if(checkBoxes[i].checked){
				checkbValue = checkBoxes[i].value;
			}else{
				checkbValue = "No";	
			}
		}
	}
	
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
					$('submit').style.display = "none";
					$('items').style.display = "none";
					break;
				default:
					return false;
			}
	}
	
	function storeData(){
		var id 				= Math.floor(Math.random() * 100001);
		//Gather up all our form field values and store in an object
		//Object properties containt array with the form label and input value 
		getSelectedRadio();
		getCheckBoxValue();
		var item 			= {};
			item.date 		= ["Date:", $('date').value ];
			item.nameM 		= ["Name of Meeting:", $('nameM').value];
			item.poc		= ["Contact:", $('poc').value];
			item.roomN 		= ["Room Number:", $('roomN').value];
			item.meetingT 	= ["Meeting Time:", $('meetingT').value];
			item.checkb 	= ["Capabilities Needed:", checkbValue];
			item.bridges 	= ["Bridges:", $('bridges').value];
			item.code 		= ["Code:", $('code').value];
			item.length 	= ["Length:", $('length').value];
			item.userR 		= ["User Responded:", userRValue];
			item.notes		= ["Notes:", $('notes').value];
		//Save data to local storage.  Use stringify to convert objects to strings
		localStorage.setItem(id, JSON.stringify(item));
		alert("Meeting Saved!");
	}
	
	function getData(){
		toggleControls("on");
		//Write data from local storage to browser
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id","items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);	
		console.log(localStorage.length);
		$('items').style.display = "block";
		for(i=0, j= localStorage.length; i<j;i++){
			var makeli = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			console.log(key);
			var value = localStorage.getItem(key);
			console.log(value);
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
			}
		}
	}
	
	//variabes default
	
	var bridgeGroup = ["--Select--", "USAMTIC Audio", "USAMTIC Video", "TMS Audio", "TMS Video"],
		userRValue,
		checkbValue;
	popSec();
	
	//Set Links and submit click events
	var displayD = $('displayD');
	displayD.addEventListener("click", getData);
	/*var clearD = $('clearD');
	clearD.addEventListener("click", clearLocal);*/
	var add = $('submit');
	add.addEventListener("click", storeData);
	
	
});