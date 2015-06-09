'use strict';
$(document).ready(function() {
    $('#tabla').fadeIn(100);
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
    //Cargamos nombre de la clinica
    function cargarClinica() {
        $.ajax({
                type: 'GET',
                dataType: 'json',
                url: 'php/cargarClinicasVdoctores.php'
                    //estos son los datos que queremos actualizar, en json:
                    // {parametro1: valor1, parametro2, valor2, ….}
                    //data: { id_clinica: id_clinica, nombre: nombre, ….,  id_tarifa: id_tarifa },
            })
            .done(function(data) {
                $('#idClinica').empty();
                $.each(data, function() {
                    $('#idClinica').append(
                        $('<option></option>').val(this.id_clinica).html(this.nombre)
                    );
                });
            })
            .fail(function() {
                console.log('ha habido un error al obtener el objeto');
            });


    }
    cargarClinica();

    //crear doctor
    $('#formCrear').validate({

        rules: {
            nombreNuevo: {
                required: true,
                lettersonly: true
            },
            numcolegiadoNuevo: {
                required: false,
                digits: true
            },
            clinicas2: {
                required: true
            }
        },
        messages: {
            nombreNuevo: {
                required: 'Escribe el nombre de doctor',
                lettersonly: 'Por favor, escribe solo letras.',
            },
            numcolegiadoNuevo: {
                required: 'Escribe el numero de colegiado',
                digits: 'Solo numeros',
            },
            clinicas2: {
                required: 'Selecciona al menos una clinica',
            }
        },
        submitHandler: function() {
            nombreNuevo = $('#nombreNuevo').val();
            numcolegiadoNuevo = $('#numcolegiadoNuevo').val();
            clinicas2 = $('#clinicas2').val();
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: 'php/añadirDoctor.php',
                data: {
                    nombreNuevo: nombreNuevo,
                    numcolegiadoNuevo: numcolegiadoNuevo,
                    clinicas2: clinicas2
                },
                error: function(xhr, status, error) {
                    $.growl({

                        icon: "glyphicon glyphicon-remove",
                        message: "ERROR: fallo al crear doctor"

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
                            message: "INSERCCIÓN CORRECTA"

                        }, {
                            type: "success"
                        });
                    } else {

                        $.growl({

                            icon: "glyphicon glyphicon-remove",
                            message: "ERROR: fallo al crear doctor"

                        }, {
                            type: "danger"
                        });
                    }

                },
                complete: {}
            });
            $('#formularioCrear').fadeOut(100);
            $('#tabla').fadeIn(100);

        }

    });

    //boton añadir doctor
    $('#añadirDoctor').click(function(e) {
        e.preventDefault();
        $('#tabla').fadeOut(100);
        $('#formularioCrear').fadeIn(100);
        cargarClinicasCrear();
    });

    function cargarClinicasCrear() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'php/listarClinicas.php',
            async: false,
            error: function(xhr, status, error) {},
            success: function(data) {
                $('#clinicas2').empty();
                $.each(data, function() {
                    $('#clinicas2').append(
                        $('<option ></option>').val(this.id_clinica).html(this.nombre)
                    );
                });

            },
            complete: {}
        });
    }
    $('#miTabla').on('click', '.borrarbtn', function(e) {
      $('#basicModal').fadeIn(100);
      console.log('test');
           e.preventDefault();
           var nRow = $(this).parents('tr')[0];
           var aData = miTabla.row(nRow).data();
           var idDoctor = aData.idDoctor;


           $.ajax({
               /*en principio el type para api restful sería delete pero no lo recogeríamos en $_REQUEST, así que queda como POST*/
               type: 'POST',
               dataType: 'json',
               url: 'php/borrar.php',
               //estos son los datos que queremos actualizar, en json:
               data: {
                   id_doctor: idDoctor
               },
               error: function(xhr, status, error) {
                   //mostraríamos alguna ventana de alerta con el error
                   alert("Ha entrado en error");
               },
               success: function(data) {
                   //obtenemos el mensaje del servidor, es un array!!!
                   //var mensaje = (data["mensaje"]) //o data[0], en función del tipo de array!!
                   //actualizamos datatables:
                   /*para volver a pedir vía ajax los datos de la tabla*/
                   miTabla.fnDraw();
               },
               complete: {
                   //si queremos hacer algo al terminar la petición ajax
               }
           });
       });
    $('#modalBorrarDoctor').on('click', '#confBorrar', function(e) {
        $('#basicModal').fadeIn(100);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'php/borrar.php',
            data: {
                id_doctor: id_doctor
            },
            error: function(xhr, status, error) {
                $.growl({
                    icon: "glyphicon glyphicon-remove",
                    message: "ERROR: fallo al borrar"
                }, {
                    type: "danger"
                });
            },
            success: function(data) {
                var $mitabla = $("#miTabla").dataTable({
                    bRetrieve: true
                });
                $mitabla.fnDraw();
                $.growl({
                    icon: "glyphicon glyphicon-remove",
                    message: "SE HA BORRADO EL USUARIO"
                }, {
                    type: "success"
                });
            },
            complete: {}
        });
        $('#tabla').fadeIn(100);
    });



    //boton de modificar
    $('#enviar').click(function(e) {
           e.preventDefault();
           idDoctor = $('#idDoctor').val();
           nombre = $('#nombre').val();
           numcolegiado = $('#numcolegiado').val();
           idClinica = $('#idClinica').val();
           nombreClinica = $('#clinicas').val();
           
           

           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'php/modificar.php',
               //lo más cómodo sería mandar los datos mediante 
               //var data = $( "form" ).serialize();
               //pero como el php tiene otros nombres de variables, lo dejo así
               //estos son los datos que queremos actualizar, en json:
               data: {
                   id_clinica: idClinica,
                   nombre: nombre,

               },
               error: function(xhr, status, error) {
                   //mostraríamos alguna ventana de alerta con el error
               },
               success: function(data) {
                  var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
                  $mitabla.fnDraw();
               },
               complete: {
                   //si queremos hacer algo al terminar la petición ajax
               }
           });

           $('#tabla').fadeIn(100);
           $('#formularioEditar').fadeOut(100);

       });
});
