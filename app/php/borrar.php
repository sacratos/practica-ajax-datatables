<?php
/* Database connection information */
include("mysql.php" );
/*
 * Local functions
 */
function fatal_error($sErrorMessage = '') {
    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Error Interno del Servidor');
    die($sErrorMessage);
}
/*
 * MySQL connection
 */
if (!$gaSql['link'] = mysql_pconnect($gaSql['server'], $gaSql['user'], $gaSql['password'])) {
    fatal_error('No se pudo conectar con el servidor');
}
if (!mysql_select_db($gaSql['db'], $gaSql['link'])) {
    fatal_error('Imposible seleccionar la base de datos. ');
}
mysql_query('SET names utf8');
//$_REQUEST['numcolegiado'] = 1;
if (isset($_REQUEST['num'])) {
    // param was set in the query string
    if (empty($_REQUEST['num'])) {
        return "El parámetro numcolegiado esta vacio.";
    }
    $id = $_REQUEST['num'];
}
/*
 * SQL queries
 * Get data to display
 */
$sql = "delete from doctores where id_doctor=" . $id;
$query_res = mysql_query($sql);
// Comprobar el resultado
if (!$query_res) {
    if (mysql_errno() == 1451) {
        $mensaje = "Imposible borrar doctor, tiene prescripciones o albaranes";
        $estado = mysql_errno();
    } else {
        $mensaje = 'Error en la consulta: ' . mysql_error() . "\n";
        $estado = mysql_errno();
    }
} else {
    $mensaje = "Doctor borrado correctamente";
    $estado = 0;
}
$resultado = array();
$resultado = array(
    'mensaje' => $mensaje,
    'estado' => $estado
);
echo json_encode($resultado);
?>