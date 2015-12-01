"use strict";

var numberOfBlocks = 9;
var targetBlocks = [];
var trapBlock;
var targetTimer;
var trapTimer;
var instantTimer;


document.observe('dom:loaded', function(){
	var blocknormal = $$(".block");
	
	$("start").observe("click", function(){
		$("state").innerHTML = "Ready!";
		$("score").innerHTML = "0";
		clearTimeout(instantTimer);
		instantTimer = setTimeout(startGame,3000);
	});
	$("stop").observe("click", stopGame);

});

function startGame(){
	targetBlocks = [];
	clearTimeout(targetTimer);
	clearTimeout(trapTimer);
	clearTimeout(instantTimer);
	trapBlock= 0;
	startToCatch();
}

function stopGame(){
	targetBlocks = [];
	clearInterval(targetTimer);
	clearInterval(trapTimer);
	clearTimeout(instantTimer);
	trapBlock= 0;
	$("state").innerHTML = "Stop";
	$("score").innerHTML = "0";
}

function startToCatch(){
	var block = $$(".block");
	$("state").innerHTML = "Catch!";
	targetTimer = setInterval(function(){
		
		if(targetBlocks.length==4){
			alert("you lose!");
			
			for(var i=0 ; i<numberOfBlocks; i++){
			$$(".block")[i].stopObserving("click", this.clickHandler);
		}
			block[trapBlock].removeClassName("trap");
			for(var i = 0; i<targetBlocks.length; i++){		
				var blocknum = targetBlocks[i];
				block[blocknum].removeClassName("target");
			}
			stopGame();
		}else{
		do{
			var rnum = Math.floor(Math.random()*numberOfBlocks);
		}while(block[rnum].hasClassName("target"));
		
		targetBlocks.push(rnum);
		
		console.log(targetBlocks);
		}
		for(var i = 0; i<targetBlocks.length; i++){		
			var blocknum = targetBlocks[i];
			block[blocknum].addClassName("target");
		}	
		
	},1000);
	
	trapTimer = setInterval(function(){
		var block = $$(".block");
		do{
			trapBlock = Math.floor(Math.random()*numberOfBlocks);
		}while(block[trapBlock].hasClassName("target"));
		block[trapBlock].addClassName("trap");
		setTimeout(function(){
			block[trapBlock].removeClassName("trap");
		},2000);
		
	},3000);

	
		if(targetBlocks.length<4){
			for(var i = 0; i<numberOfBlocks; i++){
			
			block[i].observe("click",function(){
				var block = $$(".block");
				var blocknum = this.getAttribute("data-index");
				var t = 0;
				
				for(var j = 0; j<targetBlocks.length; j++){
					if(targetBlocks[j]==Number(blocknum)){
						this.removeClassName("target");
						targetBlocks.splice(j,1);
						t++;
						}
					}
				
				if(t==1){
					$("score").innerHTML = Number($("score").innerHTML)+20;
					t--;
				}else if(Number(blocknum)==trapBlock){
					this.removeClassName("trap");
					$("score").innerHTML = Number($("score").innerHTML)-30;
				}else{
					$("score").innerHTML = Number($("score").innerHTML)-10;
					this.addClassName("wrong");
					setTimeout(function(){
						block[blocknum].removeClassName("wrong");
					},100);
					
				}
				
				
			});
			}
		}
	
}