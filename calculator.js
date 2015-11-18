"use strict"
var stack = [];
window.onload = function () {
    //var stack = [];
    var displayVal = "0";
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = this.innerHTML;

            if(/^[0-9]$/.test(value)){
                if(displayVal.charAt(0)=="0"){
                    displayVal="";
                    displayVal += value;
                } 
                else {
                    displayVal += value;
                }
            } else if(value=="AC") {
                document.getElementById('expression').innerHTML = "0";
                displayVal="0";
                while(stack.length > 0){
                    stack.pop();
                }
                
            } else if(value=='.'){
                //displayVal += value;
                var cnt = displayVal.split(".").length;
                if(cnt==1){
                    displayVal += value;
                }

            } else {
				displayVal = Number(displayVal);
				stack.push(displayVal);
                displayVal+=value;
				
				
                if(document.getElementById('expression').innerHTML=="0"){
                    document.getElementById('expression').innerHTML = displayVal;
                }else{
				/*	if(value=="("){
						
						document.getElementById('expression').innerHTML += "";
					}else if(/\)$/.test(document.getElementById('expression').innerHTML)){
						document.getElementById('expression').innerHTML += value;
						stack.pop();
					}//else if(/\)$/.test(document.getElementById('expression').innerHTML)){
						//stack.push
					//}
					else{*/
						document.getElementById('expression').innerHTML += displayVal;
					//}
				}
				displayVal="0";
				value = String(value);
                stack.push(value);
				if(value=="="){
					
					stack.pop();
					alert(stack);
					if(isValidExpression(stack)){
						
						stack = infixToPostfix(stack);
						alert(stack);
						displayVal = postfixCalculate(stack);
					
					} else{
						displayVal = "error";
					}
					//document.getElementById('expression').innerHTML="0";
					
					//결과출력
				}
				

            }
            document.getElementById('result').innerHTML = displayVal;
            //document.getElementById('expression').innerHTML = ;
        };
    }

    
}
function isValidExpression(s) {
	var num1=0;
	var num2=0;
	for(var i = 0; i<stack.length; i++){
		if(s[i] == "("){
			num1++;
		}else if(s[i] == ")"){
			num2++;
		}
	}
	if(num1==num2){
		return true;
	}
	else{
		return false;
	}
}
function infixToPostfix(s) {
    var priority = {
        "+":0,
        "-":0,
        "*":1,
        "/":1
    };
    var tmpStack = [];
    var result = [];
    for(var i =0; i<stack.length ; i++) {
        if(/^[0-9]+$/.test(s[i])){
            result.push(s[i]);
        } else {
            if(tmpStack.length === 0){
                tmpStack.push(s[i]);
            } else {
                if(s[i] === ")"){
                    while (true) {
                        if(tmpStack.last() === "("){
                            tmpStack.pop();
                            break;
                        } else {
                            result.push(tmpStack.pop());
                        }
                    }
                    continue;
                }
                if(s[i] ==="(" || tmpStack.last() === "("){
                    tmpStack.push(s[i]);
                } else {
                    while(priority[tmpStack.last()] >= priority[s[i]]){
                        result.push(tmpStack.pop());
                    }
                    tmpStack.push(s[i]);
                }
            }
        }
    }
	
    for(var i = tmpStack.length; i > 0; i--){
        result.push(tmpStack.pop());
    }
    return result;
}

function postfixCalculate(s) {
	var tmpStack = [];
	
	for(var i = 0; i<stack.length; i++){
		if(/^[1-9]+$/.test(s[i])){
			tmpStack.push(s[i]);
			
		}
		else if(s[i]=="+"){
			var num1 = tmpStack.pop();
			var num2 = tmpStack.pop();
			var num = num2+num1;
			tmpStack.push(num);
		}
		else if(s[i]=="-"){
			var num1 = tmpStack.pop();
			var num2 = tmpStack.pop();
			var num = num2-num1;
			tmpStack.push(num);
		}
		else if(s[i]=="*"){
			var num1 = tmpStack.pop();
			var num2 = tmpStack.pop();
			var num = num2*num1;
			tmpStack.push(num);
		}
		else if(s[i]=="/"){
			var num1 = tmpStack.pop();
			var num2 = tmpStack.pop();
			var num = num2/num1;
			tmpStack.push(num);
		}
		
		
	
	}
	
	return tmpStack.pop();
}
