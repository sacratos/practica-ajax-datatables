'use strict';
$('#formulario').toggle();
$(document).ready(function() {
    var miTabla = $('#miTabla').DataTable({
        'processing': true,
        'serverSide': true,
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
            }
        },
        'ajax': 'php/cargar_vdoctores.php',
        'columns': [{
            'data': 'doctor'
        }, {
            'data': 'numcolegiado'
        }, {
            'data': 'clinica'
        }, {
            'data': 'id_doctor',
            /*añadimos las clases editarbtn y borrarbtn para procesar los eventos click de los botones. No lo hacemos mediante id ya que habrá más de un
            botón de edición o borrado*/
            'render': function(data) {
                return '<a class="btn btn-primary editarbtn" href=http://localhost/php/editar.php?id_doctor=' + data + '>Editar</a><a class="btn btn-warning borrarbtn" href=http://localhost/php/borrar.php?id_doctor=' + data + '>Borrar</a>';
            }
        }]
    });

    /*Creamos la función que muestre el formulario cuando hagamos click*/
    /*ojo, es necesario hacerlo con el método ON. Tanto por rendimiento como porque puede haber elementos (botones) que todavía no existan en el document.ready*/
     $('#miTabla').on('click', '.editarbtn', function(e){
        e.preventDefault();
        $('#tabla').fadeOut(100);
        $('#formulario').fadeIn(100);

        var nRow = $(this).parents('tr')[0];
        var aData = miTabla.row(nRow).data();
        $('#idDoctor').val(aData.id_doctor);
        $('#nombre').val(aData.doctor);
        $('#numcolegiado').val(aData.numcolegiado);
        
        $('#clinica').val(aData.clinica);
        
    });

     $('#formulario').on('click', '.guardar', function(e) {
        e.preventDefault();
        $('#tabla').fadeIn(100);
        $('#formulario').fadeOut(100);

        var nRow = $(this).parents('tr')[0];
        var aData = miTabla.row(nRow).data();
        $('#idDoctor').val(aData.id_doctor);
        $('#nombre').val(aData.doctor);
        $('#numcolegiado').val(aData.numcolegiado);
        $('#clinica').val(aData.clinica);
       
        
    });

   //boton enviar del formulario de editar
       $('.guardar').click(function(e) {
           e.preventDefault();
           id_doctor = $('#idDoctor').val();
           doctor = $('#nombre').val();
           numcolegiado = $('#numcolegiado').val();
           clinica = $('#clinica').val();
           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'php/guardar.php',
               //lo más cómodo sería mandar los datos mediante 
               //var data = $( "form" ).serialize();
               //pero como el php tiene otros nombres de variables, lo dejo así
               //estos son los datos que queremos actualizar, en json:
               data: {
                   id_doctor: idDoctor,
                   doctor: nombre,
                   numcolegiado: numcolegiado,
                   id_clinica:id_clinica
                   
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
                },{
                  type: "danger"
                });
               },
               success: function(data) {
                  var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
                  $mitabla.fnDraw();
                 // alert("ok");
                //  $('#edicionok').slideDown(2000).slideUp(2000);
               
               
                 if(data[0].estado==0){
                 $.growl({
                  
                  icon: "glyphicon glyphicon-ok",
                  message: "Doctor editado correctamente!"
                },{
                  type: "success"
                });
               }else{
                 $.growl({
                  
                  icon: "glyphicon glyphicon-remove",
                  message: "Error al editar el doctor!"
                },{
                  type: "danger"
                });
               }
               },
               complete: {
                   //si queremos hacer algo al terminar la petición ajax
               }
           });
           $('#tabla').fadeIn(100);
           $('#formulario').fadeOut(100);
            //$("#edicion").fadeOut(100);
       });
});


/*
    $('#miTabla').on('click', '.borrarbtn', function(e) {
           //e.preventDefault();
                    var nRow = $(this).parents('tr')[0];
           var aData = miTabla.row(nRow).data();
           idDoctor = aData.id_doctor;

           alert(idDoctor);
           //$('#tabla').fadeOut(100);
        //   $('#basicModal').fadeIn(100);
           //$('#basicModal').show();


         //    $('#basicModal').on('click', '#confBorrar', function(e) {
             //  e.preventDefault();

          
     });
      
     
/* En http://www.datatables.net/reference/option/ hemos encontrado la ayuda necesaria
para utilizar el API de datatables para el render de los botones */
/* Para renderizar los botones según bootstrap, la url es esta: 
http://getbootstrap.com/css/#buttons
*/