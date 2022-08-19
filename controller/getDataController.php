<?php
    include("./config.php");
    $sql = "SELECT * FROM data_tbl ORDER BY id";
    $result = $conn->query($sql);
    $response = [];
    foreach($result as $row){
        array_push($response, $row);
    }
    header('Content-Type: application/json');
    echo json_encode($response);
    mysqli_close($conn);
?> 