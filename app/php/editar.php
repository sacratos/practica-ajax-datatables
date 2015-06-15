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
/*
* SQL queries
* Get data to display

$id_clinica=$_POST['idClinica'];
$id_doctor = $_POST["idDoctor"];
$nombre = $_POST["nombre"];
$numcolegiado = $_POST["numcolegiado"];
$clinica = $_POST["clinica"];
/* Consulta UPDATE */

//TENER LOS DATOS DE ANTES DE MODIFICAR
//COMPROBAR QUE DATOS SON DIFERENTES
//SI HAY MAS CLINICAS, HACER UN INSERT DE LA CLINICA EN clinica_doctor
//update
/*$query1 = "delete from clinica_doctor where id_doctor=" . $id_doctor . "";
$query1_res = mysql_query($query1);
$query2 = "delete from doctores where id_doctor=" . $id_doctor . "";
$query2_res = mysql_query($query2);

$query3 = "INSERT INTO doctores(id_doctor,nombre,numcolegiado) VALUES(". $id_doctor .",'". $nombre ."','". $numcolegiado ."')" ;
$query3_res = mysql_query($query3);
$hecho2=0;

for ($i=0;$i<count($clinicas);$i++)
{
$query3 = "insert into clinica_doctor(id_doctor,id_clinica) values(
             ". $id_doctor . ",
            " . $id_clinica . ")" ;
			
            $query_res3 = mysql_query($query3);
            
}
*/
$id = $_POST["idDoctor"];
$nombre = $_POST["nombre"];
$numcolegiado = $_POST["numcolegiado"];
$clinicas = $_POST["idClinica"];


if($clinicas){
$query = "delete from clinica_doctor where id_doctor=" . $id;
$query_res = mysql_query($query);
}
for ($i=0;$i<count($clinicas);$i++)
{
$query1 = "insert into clinica_doctor (id_doctor,id_clinica) values(
             ". $id . ",
            " . $clinicas[$i] . ")" ;
            $query_res = mysql_query($query1);
}
$query = "UPDATE doctores SET
            nombre = '" . $nombre . "',
            numcolegiado = '" . $numcolegiado . "'
            WHERE id_doctor = '" . $id."'";
$query_res = mysql_query($query);
if (!$query_res) {
    $mensaje  = 'Error en la consulta: ' . mysql_error() ;
    $estado = mysql_errno();
}
else
{
    $mensaje = "Actualización correcta";
    $estado = 0;
}
$resultado = array();
 $resultado[] = array(
      'mensaje' => $mensaje,
      'estado' => $estado
   );
echo json_encode($resultado);



/*
nombre = '" . $nombre . "',
numcolegiado = '" . $numcolegiado . "',
WHERE id_doctor = " . $id_doctor;
//mysql_query($query, $gaSql['link']) or fatal_error('MySQL 333333333Error: ' . mysql_errno());
/*En función del resultado correcto o no, mostraremos el mensaje que corresponda*/
// Comprobar el resultado
/*if (!$query3_res) {
$mensaje = 'Error en la consulta: ' . mysql_error() . "\n";
$estado = mysql_errno();
}
else
{
$mensaje = "Actualización correcta";
$estado = 0;
}
$resultado = array();
$resultado[] = array(
'mensaje' => $mensaje,
'estado' => $estado
);
echo json_encode($resultado);*/
?>