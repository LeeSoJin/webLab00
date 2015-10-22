<!DOCTYPE html>
<html>
	<head>
		<title>Fruit Store</title>
		<link href="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/pResources/gradestore.css" type="text/css" rel="stylesheet" />
	</head>

	<body>
		<?
			$name = $_POST["name"];
			$id = $_POST["id"];
			$fruit = $_POST["fruit"];
			$number = $_POST["number"];
			$card_num = $_POST["cardNum"];
			$card_type = $_POST["cc"];
		?>
		<?php
		# Ex 4 : 
		# Check the existance of each parameter using the PHP function 'isset'.
		# Check the blankness of an element in $_POST by comparing it to the empty string.
		# (can also use the element itself as a Boolean test!)
		if (!isset($name) || $name==null || $name=="" ||
		 !isset($id) || $id==null || $id=="" ||
		 !isset($card_num) || $card_num==null || $card_num=="" ||
		 !isset($card_type) || $card_type==null || $card_type=="" ){ ?>	
		 <h1>Sorry</h1>
			<p>You didn't fill out the form completely. <a href="http://localhost/fruitstore.html">Try again?</a></p>
		 	
		

		<!-- Ex 4 : 
			Display the below error message : 
			<h1>Sorry</h1>
			<p>You didn't fill out the form completely. Try again?</p>
		--> 

		<?php
		# Ex 5 : 
		# Check if the name is composed of alphabets, dash(-), ora single white space.
		} elseif (!preg_match('/^[A-Za-z][A-Za-z]*[\ ]*[\-]*[A-Za-z]*$/',$name)) { 
		?>
			<h1>Sorry</h1>
			<p>You didn't provide a valid name. <a href="http://localhost/fruitstore.html">Try again?</a></p>


		<!-- Ex 5 : 
			Display the below error message : 
			<h1>Sorry</h1>
			<p>You didn't provide a valid name. Try again?</p>
		--> 

		<?php
		# Ex 5 : 
		# Check if the credit card number is composed of exactly 16 digits.
		# Check if the Visa card starts with 4 and MasterCard starts with 5. 
		} elseif (!preg_match('/^[0-9]{16}$/',$card_num)) {
		?>
			<h1>Sorry</h1>
			<p>You didn't provide a valid credit card number. <a href="http://localhost/fruitstore.html">Try again?</a></p>
		<? } elseif((!preg_match('/^[4][0-9]*$/',$card_num) & $card_type=="Visa")||(!preg_match('/^[5][0-9]*$/',$card_num) & $card_type=="MasterCard")){
		?> 			<h1>Sorry</h1>
			<p>You didn't provide a valid credit card number. <a href="http://localhost/fruitstore.html">Try again?</a></p>
	

		<!-- Ex 5 : 
			Display the below error message : 
			<h1>Sorry</h1>
			<p>You didn't provide a valid credit card number. Try again?</p>
		--> 

		<?php
		# if all the validation and check are passed 
		} else {
		?>

		<h1>Thanks!</h1>
		<p>Your information has been recorded.</p>
		
		<!-- Ex 2: display submitted data -->
		<ul> 
			<li>Name: <?= $name; ?></li>
			<li>Membership Number: <?= (int)$id; ?></li>
			<?
				$options = " ";
				for($i=0; $i<count($_POST[option]); $i++){
					if($_POST[option][$i]) $options .= $_POST[option][$i];
					if($i!=(count($_POST[option])-1)) $options .= ", ";
				}
				
			?>
			<li>Options: <?= $options; ?></li>
			<li>Fruits: <?= $fruit; ?> - <?= $number; ?> </li>
			<li>Credit <?= $card_num; ?> ( <?= $card_type; ?> ) </li>
		</ul>
		
		<!-- Ex 3 : 
			<p>This is the sold fruits count list:</p> -->
		<?php
			$filename = "customers.txt";
			/* Ex 3: 
			 * Save the submitted data to the file 'customers.txt' in the format of : "name;membershipnumber;fruit;number".
			 * For example, "Scott Lee;20110115238;apple;3"
			 */
			 file_put_contents($filename, $name.";".$id.";".$fruit.";".$number.PHP_EOL, FILE_APPEND);
		?>
		
		<!-- Ex 3: list the number of fruit sold in a file "customers.txt".
			Create unordered list to show the number of fruit sold -->
		<ul>
		<?php 
		$fruitcounts = soldFruitCount($filename);
		
		?>
		<li>Melon - <?= $fruitcounts["Melon"]; ?></li>
		<li>Apple - <?= $fruitcounts["Apple"]; ?></li>
		<li>Orange - <?= $fruitcounts["Orange"]; ?></li>
		<li>Strawberry - <?= $fruitcounts["Strawberry"]; ?></li>
		
		<?php
		
		?>
		</ul>
		
		<?php
		}
		?>
		
		<?php
			/* Ex 3 :
			* Get the fruits species and the number from "customers.txt"
			* 
			* The function parses the content in the file, find the species of fruits and count them.
			* The return value should be an key-value array
			* For example, array("Melon"=>2, "Apple"=>10, "Orange" => 21, "Strawberry" => 8)
			*/
			function soldFruitCount($filename) {
				$lines = file($filename);
				$fruitcounts = array();
				$count = array(0,0,0,0);
				foreach($lines as $line) {
					$tmp = explode(";", $line);
					#$tmp[2]=fruit,tmp[3]=num
					
					
					
					if($tmp[2]=="Melon") {
						$count[0] += (int)$tmp[3];
						
						}
					else if($tmp[2]=="Apple") {
						$count[1] += (int)$tmp[3];
						
						}
					else if($tmp[2]=="Orange") {
						$count[2] += (int)$tmp[3];
						
						}
					else if($tmp[2]=="Strawberry") {
						$count[3] += (int)$tmp[3];
						
						}
					$fruitcounts["Melon"] = $count[0];
					$fruitcounts["Apple"] = $count[1];
					$fruitcounts["Orange"] = $count[2];
					$fruitcounts["Strawberry"] = $count[3];
				}
				
				return $fruitcounts;
			}
		?>
		
	</body>
</html>
