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

        idDoctor = $('#idDoctor').val();
        nombre = $('#nombre').val();
        numcolegiado = $('#numcolegiado').val();
        id_clinica = $('#clinicas').val();




        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'php/editar.php',
            //lo más cómodo sería mandar los datos mediante 
            //var data = $( "form" ).serialize();
            //pero como el php tiene otros nombres de variables, lo dejo así
            //estos son los datos que queremos actualizar, en json:
            data: {
                idDoctor: idDoctor,
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
                // alert("ok");
                //  $('#edicionok').slideDown(2000).slideUp(2000);



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
            complete: {
                //si queremos hacer algo al terminar la petición ajax

            }
        });

        $('#tabla').fadeIn(100);
        $('#formulario').fadeOut(100);
        //$("#edicion").fadeOut(100);

    }

});




/////////////////////////////

$('#miTabla').on('click', '.borrarbtn', function(e) {
    //e.preventDefault();
    alert("ok");


    alert(idDoctor);
    $.ajax({
        //en principio el type para api restful sería delete pero no lo recogeríamos en $_REQUEST, así que queda como POST
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
    idDoctor = aData.id_doctor;

    alert(idDoctor);
    //$('#tabla').fadeOut(100);
    //   $('#basicModal').fadeIn(100);
    //$('#basicModal').show();


    //    $('#basicModal').on('click', '#confBorrar', function(e) {
    //  e.preventDefault();        
});

///////////////////////////


$('#basicModal').on('click', '#borrar', function(e) {
    alert(idDoctor);
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
            /*para volver a pedir vía ajax los datos de la tabla*/
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
    });


});


//////////////////////////////////////////


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
        // alert("ok");
        //  $('#edicionok').slideDown(2000).slideUp(2000);


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
    complete: {
        //si queremos hacer algo al terminar la petición ajax
    }
});
$('#tabla').fadeIn(100);
$('#formulario').fadeOut(100);
//$("#edicion").fadeOut(100);
});
});


//////////////////////////////////////////


//////////////////////////////////////////

$('#formEditar').validate({

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

        idDoctor = $('#idDoctor').val();
        nombre = $('#nombre').val();
        numcolegiado = $('#numcolegiado').val();
        id_clinica = $('#clinicas').val();




        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'php/modificar_clinica.php',
            //lo más cómodo sería mandar los datos mediante 
            //var data = $( "form" ).serialize();
            //pero como el php tiene otros nombres de variables, lo dejo así
            //estos son los datos que queremos actualizar, en json:
            data: {
                idDoctor: idDoctor,
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
                // alert("ok");
                //  $('#edicionok').slideDown(2000).slideUp(2000);



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
            complete: {
                //si queremos hacer algo al terminar la petición ajax

            }
        });

        $('#tabla').fadeIn(100);
        $('#formulario').fadeOut(100);
        //$("#edicion").fadeOut(100);

    }

});
