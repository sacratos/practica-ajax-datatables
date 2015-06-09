<?php
// DB table to use
$table = 'vistaDoctores';
// Table's primary key
$primaryKey = 'id_doctor';
// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array( 'db' => 'id_doctor', 'dt' => 'idDoctor' ),
    array( 'db' => 'doctor',  'dt' => 'nombre' ),
    array( 'db' => 'numcolegiado',   'dt' => 'numcolegiado' ),
    array( 'db' => 'clinica',     'dt' => 'nombreClinica' ),
    array( 'db' => 'id_clinica',     'dt' => 'idClinica' )
);
// SQL server connection information
$sql_details = array(
    'user' => 'root',
    'pass' => 'root',
    'db'   => 'clinicas',
    'host' => 'localhost'
);
// Conexion SQL para cargar el resto de los php
$gaSql['user'] = "root";
$gaSql['password'] = "root";
$gaSql['db'] = "clinicas";
$gaSql['server'] = "localhost";
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */
require( 'ssp.class.php' );
echo json_encode(
    SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
);