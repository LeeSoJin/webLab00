<!DOCTYPE html>
<html>
<head>
	<title>SQL</title>
    <meta charset="utf-8" />
</head>
<body>
	<h1>Practice SQL</h1>
	<form action="http://localhost/sql.php" method="get">
	<div>
		DB_Name : <input type="text" name="db" />
		SQL query : <input type="text" name="query" />
	</div>
	<div id="submitbutton">
		<input type="submit" value="ENTER" />
	</div>
	<p>
	<?
	$dbname = $_GET["db"];
	$query = $_GET["query"];
	
	$db = new PDO("mysql:dbname=".$dbname.";host=localhost","root","root");
	$rows = $db->query($query);
	
	foreach($rows as $row){
	?>
	<li><? for($i = 0; $i<count($row); $i++ ) {?><?= "\t".$row[$i]; ?><? } ?></li>

	<? } ?>
	</p>
	</form>
</body>

