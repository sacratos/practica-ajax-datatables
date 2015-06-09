'use strict';
$(document).ready(function() {
    $('#tabla').fadeIn(5000);
    $('#basicModal').toggle();
    $('#formularioEditar').toggle();
    $('#formularioCrear').toggle();
    'use strict';

    // Metodo especial de validacion para España, con acentos y ñ
    $.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[áéíóúÁÉÍÓÚA-Za-zñÑ ]+$/i.test(value);
    }, "Solo letras por favor");

    // Declaracion inicial de variables para posterior utilizacion
    var id_doctor;
    var nombre;
    var numcolegiado;
    var id_clinica;

    $(document).ready(function() {

        var miTabla = $('#miTabla').DataTable({

            // Modificamos las propiedades de las columnas especiales
            "columnDefs": [{
                "targets": [3],
                "visible": false,
                "searchable": false
            }, {
                "targets": [4, 5],
                "orderable": false
            }],
            'processing': true,
            'serverSide': true,
            'ajax': 'php/cargarClinicasVdoctores.php',
            'language': {
                'sProcessing': 'Procesando...',
                'sLengthMenu': 'Mostrar _MENU_ registros',
                'sZeroRecords': 'No se encontraron resultados',
                'sEmptyTable': 'Ningún dato disponible en esta tabla',
                'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
                'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
                'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
                'sInfoPostFix': '',
                'sSearch': 'Buscar:',
                'sUrl': '',
                'sInfoThousands': ',',
                'sLoadingRecords': 'Cargando...',
                'oPaginate': {
                    'sFirst': 'Primero',
                    'sLast': 'Último',
                    'sNext': 'Siguiente',
                    'sPrevious': 'Anterior'
                },
                'oAria': {
                    'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
                    'sSortDescending': ': Activar para ordenar la columna de manera descendente'
                },
            },

            'columns': [{
                'data': 'nombre'
            }, {
                'data': 'numcolegiado'
            }, {
                'data': 'clinica',
                'render': function(data) {
                    return '<li>' + data + '</li><br>';
                }
            }, {
                'data': 'id_clinica'
            }, {
                'data': 'id_doctor',
                'render': function(data) {
                    /*Boton para editar el doctor*/
                    return '<a class="btn btn-primary editarbtn" >Editar</a>';
                }
            }, {
                'data': 'id_doctor',
                'render': function(data) {
                    /*Boton para borrar el doctor que carga una ventana modal*/
                    return '<a class="btn btn-warning borrarbtn" data-toggle="modal" data-target="#modalBorrarDoctor" >Borrar</a>';
                }
            }],
        });
    });
    $('#tabla').on('click', '.editarbtn', function(e) {
        e.preventDefault();
        $('#tabla').fadeOut(100);
        $('#formularioEditar').fadeIn(100);
        var nRow = $(this).parents('tr')[0];
        var aData = miTabla.row(nRow).data();
        $('#id_doctor').val(aData.id_doctor);
        $('#nombre').val(aData.doctor);
        $('#numcolegiado').val(aData.numcolegiado);
        $('#clinica').val(aData.clinica);
    });
});

/*
    $('#tabla').on('click', '.editarbtn', function(e) {
        e.preventDefault();
        $('#tabla').fadeOut(100);
        $('#formularioEditar').fadeIn(100);
        var nRow = $(this).parents('tr')[0];
        var aData = miTabla.row(nRow).data();
        $('#id_doctor').val(aData.id_doctor);
        $('#nombre').val(aData.doctor);
        $('#numcolegiado').val(aData.numcolegiado);
        $('#clinica').val(aData.clinica);
    });

$('#miTabla').on('click', '.borrarbtn', function(e) {
    alert(id_doctor);
    $.ajax({
        //en principio el type para api restful sería delete pero no lo recogeríamos en $_REQUEST, así que queda como POST
        type: 'POST',
        dataType: 'json',
        url: 'php/borrar.php',
        //estos son los datos que queremos actualizar, en json:
        data: {
            id_doctor: id_doctor
        },
        error: function(xhr, status, error) {
            //mostraríamos alguna ventana de alerta con el error
            alert("Ha entrado en error");
            // $('#edicionerr').html("Error al borrar doctor!").slideDown(2000).slideUp(2000);
            $.growl({

                icon: "glyphicon glyphicon-remove",
                message: "Error al borrar!"
            }, {
                type: "danger"
            });
        },
        success: function(data) {
            alert("borrado ok");
            //obtenemos el mensaje del servidor, es un array!!!
            //var mensaje = (data["mensaje"]) //o data[0], en función del tipo de array!!
            //actualizamos datatables:
            ////para volver a pedir vía ajax los datos de la tabla////
            var $mitabla = $("#miTabla").dataTable({
                bRetrieve: true
            });
            $mitabla.fnDraw();
            //  $('#edicionok').html("Borrado correcto!").slideDown(2000).slideUp(2000);
            $.growl({
                icon: "glyphicon glyphicon-remove",
                message: "Borrado realizado con exito!"
            }, {
                type: "success"
            });
        },
        complete: {
            //si queremos hacer algo al terminar la petición ajax
        }
    }); //$ajax
    var nRow = $(this).parents('tr')[0];
    var aData = miTabla.row(nRow).data();
    id_doctor = aData.id_doctor;
    alert(id_doctor);
    $('#tabla').fadeOut(100);
});

$('#formularioEditar').validate({
    rules: {
        nombre: {
            required: true,
            lettersonly: true
        },
        numcolegiado: {
            required: true,
            digits: true
        },
        clinicas: {
            required: true
        }
    },
    submitHandler: function() {
        id_doctor = $('#id_doctor').val();
        nombre = $('#nombre').val();
        numcolegiado = $('#numcolegiado').val();
        clinica = $('#clinica').val();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'php/editar.php',
            //lo más cómodo sería mandar los datos mediante 
            //var data = $( "form" ).serialize();
            //pero como el php tiene otros nombres de variables, lo dejo así
            //estos son los datos que queremos actualizar, en json:
            data: {
                id_doctor: id_doctor,
                nombre: nombre,
                numcolegiado: numcolegiado,
                id_clinica: id_clinica

            },
            error: function(xhr, status, error) {
                //mostraríamos alguna ventana de alerta con el error
                alert(error);
                alert(xhr);

                alert(status);

                // $('#edicionerr').slideDown(2000).slideUp(2000);

                $.growl({

                    icon: "glyphicon glyphicon-remove",
                    message: "Error al editar!"

                }, {
                    type: "danger"
                });
            },
            success: function(data) {
                var $mitabla = $("#miTabla").dataTable({
                    bRetrieve: true
                });
                $mitabla.fnDraw();
                if (data[0].estado == 0) {
                    $.growl({
                        icon: "glyphicon glyphicon-ok",
                        message: "Doctor editado correctamente!"
                    }, {
                        type: "success"
                    });
                } else {
                    $.growl({
                        icon: "glyphicon glyphicon-remove",
                        message: "Error al editar el doctor!"
                    }, {
                        type: "danger"
                    });

                }
            },
        });
        $('#tabla').fadeIn(100);
        $('#formulario').fadeOut(100);
        //$("#edicion").fadeOut(100);
    }
});
$('#formularioEditar').on('click', '.guardar', function(e) {
    alert('hey!');
    e.preventDefault();
    $('#formularioEditar').fadeOut(100);
    $('#tabla').fadeIn(100);
    var nRow = $(this).parents('tr')[0];
    var aData = miTabla.row(nRow).data();
    $('#id_doctor').val(aData.id_doctor);
    $('#nombre').val(aData.doctor);
    $('#numcolegiado').val(aData.numcolegiado);
    $('#clinica').val(aData.clinica);
});
*/
