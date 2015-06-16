<?php
header('Access-Control-Allow-Origin: *');

$table = 'vdoctores';
 
// Table's primary key
$primaryKey = 'id_doctor';

$columns = array(
    array( 'db' => 'id_doctor', 'dt' => 'idDoctor' ),
    array( 'db' => 'nombre',  'dt' => 'nombre' ),
    array( 'db' => 'numcolegiado',   'dt' => 'numcolegiado' ),
    array( 'db' => 'nombre_clinica',     'dt' => 'nombreClinica' ),
    array( 'db' => 'id_clinica',     'dt' => 'idClinica' )
);
 
// SQL server connection information
$sql_details = array(
    'user' => 'pablosaenz_root',
    'pass' => 'infenlaces123',
    'db'   => 'pablosaenz_clinicas',
    'host' => 'www.infenlaces.com'
);
 
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */
 
require( 'ssp.class.php' );
 
echo json_encode(
    SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
);
?>