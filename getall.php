<?php
    //open connection to mysql db
    $connection = mysqli_connect("localhost","admin","admin","androidl") or die("Error " . mysqli_error($connection));

    //fetch table rows from mysql db
    $sql = "select * from gadgets";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }

    $var_json =  json_encode($emparray);

    $output='{ "records":'.$var_json.' }';

    echo $output;

    //close the db connection
    mysqli_close($connection);
?>