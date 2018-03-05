provincias = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz',
            'Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva',
            'Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas',
            'Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia',
            'Valladolid','Vizcaya','Zamora','Zaragoza']

$(function(){

    $( ".buscador" ).controlgroup();

    // Buscar sitio
    $("#donde").autocomplete({
        source: function (request, response) {
            $.getJSON("./ciudades.json", function (data) {
                response($.map(data, function (value, key) {
                    return {
                        label: value,
                        value: key.nm
                    };
                }));
            });
        },
        minLength: 2,
    });


    $( "#doeeeende" ).autocomplete({
    source: function( request, response ) {
        $.ajax( {
            url: "ciudades.json",
            type: "get",
            dataType: "json",
            data: {
                term: request.term
            },
        }
        .done(function (data) {
            var options = $("#country");
            $.each(data[0], function (idx, val) {
            options.append($('<option />', { value: idx, text: val.cname }));
            });
        })
        .fail(function(jqXHR, status, error) {
 
        }) );
    },
    minLength: 2,
    select: function( event, ui ) {
        log( "Selected: " + ui.item.value + " aka " + ui.item.id );
    }
    } );


    $("#dssonde").autocomplete({
        source: function (request, response) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            $.ajax({
                url: "./ciudades.json",
                dataType: "json",
                success: function (data) {
                    response($.map(data, function(v,i){
                        var text = v.mn;
                            return {
                                    label: v.nm,
                                    value: v.nm
                                   };
                        
                    }));
                }
            });
        }
    });

    // Date llegada
    $( "#llegada" ).datepicker({
        minDate: 0,
        showAnim: 'slideDown',
        dateFormat: "dd/mm/yy"
    });
    
    // Date salida
    $( "#salida" ).datepicker({
        showAnim: 'slideDown',
        dateFormat: "dd/mm/yy",
        minDate: 0
    });
    
    // Tipo de vivienda
    $( ".tipo input" ).checkboxradio({
        icon: false
    });

    
    // Llegada salida, control
    var dateFormat = "dd/mm/yy",
    from = $( "#llegada" )
        .datepicker({
            changeMonth: true,
            dateFormat: "dd/mm/yy"
        })
        .on( "change", function() {
        to.datepicker( "option", "minDate", getDate( this ) );
        to.datepicker( "option", "dateFormat", "dd-mm-yy" );
        from.datepicker( "option", "dateFormat", "dd-mm-yy" );
        }),
    to = $( "#salida" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        dateFormat: "dd/mm/yy"
    })
    .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
        
    });

    function getDate( element ) {
    var date;
    try {
        date = $.datepicker.parseDate( dateFormat, element.value );
    } catch( error ) {
        date = null;
    }

    return date;
    }
    // Fin control llegada - salida
    
    // Seleccion de personas
    $( "#personas" )
        .selectmenu()
        .selectmenu( "menuWidget" )
        .addClass( "overflow" );

    // Precio slider
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 500,
        values: [ 20, 100 ],
        step: 20,
        slide: function( event, ui ) {
            $( "#precio" ).val( ui.values[ 0 ] + "€ - " + ui.values[ 1 ] + "€" );
        }
    });
    $( "#precio" ).val($( "#slider-range" ).slider( "values", 0 ) +
    "€ - " + $( "#slider-range" ).slider( "values", 1 ) + "€" );
    // Fin precio

    // Características
    $( ".caracteristicas input" ).checkboxradio({
        icon: false,
        classes: {"ui-checkboxradio": "highlight"}
    });

    // Ver más características
    $( "#dialog" ).dialog({
        autoOpen: false,
        draggable: false,
        dialogClass: "dialogo",
        show: {
          effect: "blind",
          duration: 100
        },
        hide: {
          effect: "explode",
          duration: 100
        },

        //close: function(event, ui){
        //    $( 'body' ).css('background-color', '');
        //}
    });
   
    $( "#opener" ).on( "click", function() {
        if ($( "#dialog" ).dialog( "isOpen" ) == false){
            $( "#dialog" ).dialog( "open" );
        } else{
            $( "#dialog" ).dialog( "close" )
        }
        //$( 'body' ).css('background-color', '#E5E5E5');
    });

    /* Abrir más características y que el body se ponga oscuro
    if ($( '.dialogo' ).css('display') == "none"){
        $( 'body' ).css('background-color', 'black');
    }
    $( '.dialogo' ).hover(function() {
        $( 'body' ).css('background-color', 'black');
        $('body').css('opacity', '.3');
        $( '.dialogo' ).css('background-color', 'rgba(f, f, f, 1)');
        $( '.dialogo' ).css('opacity', '1');
        $( '.nada' ).prepend($( '.dialogo' ).css('display'));
      }, function() {
        // vuelve a dejar el <div> como estaba al hacer el "mouseout"
        $('body').css('background-color', '');
        $('body').css('opacity', '');
      });*/

    // Boton buscar
    $( "#buscar" ).button({
        icon: "ui-icon-search"
    })

    // Control de imagenes
    $( "#previous" ).button({
        icon: "ui-icon-arrowthick-1-w"
    })
    $( "#next" ).button({
        icon: "ui-icon-arrowthick-1-e"
    })

    



});
