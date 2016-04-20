

<?php

//open connection to mysql db
    $connection = mysqli_connect("localhost","admin","admin","androidl") or die("Error " . mysqli_error($connection));

    	$u = $_GET['keyword'];

    //fetch table rows from mysql db
    $sql = "select * from Gadget_details where Model = '".$u."'";
    $result = mysqli_query($connection, $sql);   

   if(mysqli_num_rows($result) == 0)
   {
   	
   	header('HTTP/ 404 Reason Phrase As You Wish');
   	// header("Location:http://localhost/androidlovers/mobiles.html");
    // exit();
    }
    else{
//create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }

    $var_json =  json_encode($emparray);

    $output='{ "records":'.$var_json.' }';

    echo $output;
    	
    }

    //close the db connection
    mysqli_close($connection);



?>


