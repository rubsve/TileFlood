			var stepCounter= 0; 
			var visitedArray;
			var haveNotVisited = function(value) {
				for (var i = 0;i < visitedArray.length;  i++) {
					if (visitedArray[i] === value) {
						return false;
					}
				}
				visitedArray[visitedArray.length]=value;
				return true;
			};
			
			
			
			var getColor = function(index) {
				if (index === 0) return "orange";
				if (index === 1) return "white";
				if (index === 2) return "blue";
				if (index === 3) return "black";
				if (index === 4) return "pink";
				if (index === 5) return "grey";
			}
		
			var boardAddTable = function(size) {
				document.getElementById("controll").style.visibility= "visible";
				document.getElementById("restart").style.visibility= "hidden";
				document.getElementById("message").style.visibility= "hidden";

				stepCounter= 0;
				stepCounterDiv=document.getElementById("stepCounter").innerHTML = stepCounter;
				
				var boardTable = document.getElementById("board");
				while ( boardTable.rows.length > 0){
					boardTable.deleteRow(0);
				}
				var row;
				var cell;
				for (var i=0; i< size;i++){
					row = boardTable.insertRow(i); 
					for (var j=0; j< size;j++){
						cell = row.insertCell(j);

						var colorIndex=Math.floor(Math.random()*6)
						var className = getColor(colorIndex);
							
						cell.className=className;
					}
										
				}
			};

			var changeColor = function( x, y, oldColor, newColor){
				if ( haveNotVisited(x + " " + y) ) {
					if (x >= 0 && x<10 && y>=0 && y<10 ){
						var boardTable = document.getElementById("board");
						var cell = boardTable.rows[x].cells[y];
						if ( cell.className === oldColor )
						{
							changeColor(x+1,y,oldColor,newColor);
							changeColor(x,y+1,oldColor,newColor);
							changeColor(x-1,y,oldColor,newColor);
							changeColor(x,y-1,oldColor,newColor);
							cell.className = newColor;
						}
					}	                    				
				}
			};
			
			var isVictory = function () {
				for (var i = 0 ; i< 10 ; i++){
					for (var j = 0; j<10;j++){

						if (document.getElementById("board").rows[i].cells[j].className != document.getElementById("board").rows[0].cells[0].className) 
							return false; 
					}
				}
				
				return true;	
			};
			
			var klicked = function(newColor) {
				stepCounter++;
				var stepCounterDiv=document.getElementById("stepCounter");
				stepCounterDiv.innerHTML = stepCounter;
				
				var boardTable = document.getElementById("board");
				var oldColor = boardTable.rows[0].cells[0].className;
				visitedArray = [];
				changeColor(0,0,oldColor,newColor);
				if ( isVictory() ) {
					document.getElementById("message").innerHTML="You win!";
					
					document.getElementById("controll").style.visibility= "hidden";
					document.getElementById("restart").style.visibility= "visible";
					document.getElementById("message").style.visibility= "visible";
				
				}
				else if ( stepCounter === 19){
					document.getElementById("message").innerHTML="You lose!";
					
					document.getElementById("controll").style.visibility= "hidden";
					document.getElementById("restart").style.visibility= "visible";
					document.getElementById("message").style.visibility= "visible";
				}
				

			};
			
			var restart = function () {
				boardAddTable(10);
				
				
			};
