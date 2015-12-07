"use strict";


document.observe("dom:loaded", function() {
	/* Make necessary elements Dragabble / Droppables (Hint: use $$ function to get all images).
	 * All Droppables should call 'labSelect' function on 'onDrop' event. (Hint: set revert option appropriately!)
	 * 필요한 모든 element들을 Dragabble 혹은 Droppables로 만드시오 (힌트 $$ 함수를 사용하여 모든 image들을 찾으시오).
	 * 모든 Droppables는 'onDrop' 이벤트 발생시 'labSelect' function을 부르도록 작성 하시오. (힌트: revert옵션을 적절히 지정하시오!)
	 */
	var image = $$("img");
	
	
	for(var i=0;i<image.length;i++){
		new Draggable(image[i],{revert: true});
		
			Droppables.add("selectpad",{onDrop: labSelect});		
			Droppables.add("labs",{onDrop: labSelect});
		
	}
	
	
	
	
		
	
	
});

function labSelect(drag, drop, event) {
	/* Complete this event-handler function 
	 * 이 event-handler function을 작성하시오.
	 */
	//alert("You dropped"+drag.getAttribute('alt'));
	
	if(drop == $("selectpad")/*$("selectpad").childElementCount < 3*/){
		//drag.fade();
		//var node = document.createElement("img");
		//node.appendChild(drag);
		if($("selectpad").childElementCount < 3){
			drop.appendChild(drag);
			var node = document.createElement("li");
			var string = drag.getAttribute('alt');
			node.appendChild(document.createTextNode(string));
			$("selection").appendChild(node).pulsate();
		}
	}else if(drop==$("labs")){
		$("labs").appendChild(drag);
		$("selection").innerHTML = "";
		var childs = $$("#selectpad img");
		for(var i=0; i<childs.length; i++){
			var node = document.createElement("li");
			var string = childs[i].getAttribute('alt');
			node.appendChild(document.createTextNode(string));
			$("selection").appendChild(node);
		}
	}
	
/*	var childs = $$("#selectpad img");
	for(var i=0; i<childs.length; i++){
		var node = document.createElement("li");
		var string = childs[i].getAttribute('alt');
		node.appendChild(document.createTextNode(string));
		$("selection").appendChild(node);
	}
	*/
	
		
	
	
	
	
	
	
	
	
}


