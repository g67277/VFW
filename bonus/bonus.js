//BONUS DUE WEEK 2

/*Goal: Find the planets that the kerbal has NOT visited. You may edit this code
or start from scratch using the kerbal object and planet array below as the source of your data.
The kerbal object and planet array should not be modified or deleted.

Bonus of 10pts will be applied to project 2 grade only if turned in on time with project 2. 
Can not exceed a grade of 100. This is a pass/fail bonus.
*/

//START OF DO NOT MODIFY //////////////////////////////
var kerbal = {
 "name": "Bob",
 "weight": 50,
 "courage": 70,
 "stupidity": 100,
 "visited": ["Kerbin", "Mun"]
};

var planets = ["Kerbin", "Duna", "Eve", "Mun"];
//END OF DO NOT MODIFY //////////////////////////////

var checker = function(compared, compare, newChecker){ 
	for (i = 0, j = compared.length; i < j; i++){ 
		var counter = 0; 
		for(q = 0, n = compare.length +1; q < n; q++){ 
			if(compare[q] === compared[i]){ 
				counter++; 
			}; 
		}; 
		if(counter == 0){ 
			newChecker.push(compared[i]); 
		}; 
	}; 
	return newChecker; 
}; 

var checked = checker(planets, kerbal.visited, []); 

for(x = 0, z = checked.length; x < z; x++){ 
	//Output list of planets NOT visited.
	console.log(checked[x]); 
};


