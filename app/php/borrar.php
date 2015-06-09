<?php
/* Database connection information */
include("mysql.php" );
/*
 * Local functions
 */
function fatal_error($sErrorMessage = '') {
    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
    die($sErrorMessage);
}
/*
 * MySQL connection
 */
if (!$gaSql['link'] = mysql_pconnect($gaSql['server'], $gaSql['user'], $gaSql['password'])) {
    fatal_error('Could not open connection to server');
}
if (!mysql_select_db($gaSql['db'], $gaSql['link'])) {
    fatal_error('Could not select database ');
}
mysql_query('SET names utf8');
if (isset($_REQUEST['idDoctor'])) {
    if (empty($_REQUEST['idDoctor'])) {
        return "El parámetro id_doctor viene vacio!";
    }
    $idDoctor = $_REQUEST['idDoctor'];
}
/*
 * SQL queries
 * Get data to display
 */
$query = "delete * from doctores where id_doctor='" . $idDoctor . "'";
$query_res = mysql_query($query);
if (!$query_res) {
    if (mysql_errno() == 1451) {
        $mensaje = "Imposible borrar la clínica, tiene doctores definidos. Borre primero los doctores";
        $estado = mysql_errno();
    } else {
        $mensaje = 'Error en la consulta: ' . mysql_error() . "\n";
        $estado = mysql_errno();
    }
} else {
    $mensaje = "Borrado correcto";
    $estado = 0;
}
$resultado = array();
$resultado[] = array(
    'mensaje' => $mensaje,
    'estado' => $estado
);
echo json_encode($resultado);
?>