var saveItem = function(id, fx){
    if (fx == "remove") {
        var data_to_save = fx
        build[id] = ""
    }
    else
        var data_to_save = id
    $.ajax({
        type: "POST",
        url: window.location.pathname,
        dataType: "html",
        contentType: "text/plain; charset=utf-8",
        data : data_to_save,
        success: function(result){
            console.log(result)
            window.location = "/build"
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

var submitData = function(name) {
    if (name.includes('remove')) {
        var s = name.split('_')
        build[s[s.length-1]] = ""
    }
    var data_to_save = name.trim()
    $.ajax({
        type: "POST",
        url: window.location.pathname,
        dataType: "html",
        contentType: "text/plain; charset=utf-8",
        data : data_to_save,
        success: function(result){
            console.log(result)
            displayParts()
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

var prepCard = function(datum) {

    temp =  '<div class="col-5">' +
                '<img src="/static/media/' + datum["img"] + '">' +
            '</div>' +
            '<div class="col-7">' +
                '<div class="big">' + datum["brand"] + " " + datum["model"] + '</div>' +
                '<div class="bold bigger">$' + datum["price"] + '</div>' +
            '</div>';
    return temp;
}

var displayItems = function(in_data){
    $("#data_container").empty();
    $("#data_container").append('<div class="section-title">Parts</div>');
    var body = ""
    for(i=0; i < in_data.length; i += 3) {
        body += '<div class="row">'

        for (x=0; x<3; x++) {
            if ((i+x) < in_data.length) {
                body += '<div class="col-4">' +
                        '<button class="btn btn-block part-item alert alert-dark" data-toggle="modal" data-target="#part-modal" id="' + in_data[i+x]["id"] +'">' + 
                        '<div class="row">' +
                        prepCard(in_data[i+x]) +
                        '</div>' +
                        '</button>' + 
                        '</div>';
            }
        }
        body += '</div>'

    }
    $("#data_container").append(body)
    for(i=0; i < in_data.length; i++) {
        expandItem('#' + in_data[i]["id"], in_data[i])
    }
}


var activate_filter = function() {
    keys = Object.keys(data[0]);
    filters = {};
    for (var key in data[0]) {
        filters[key] = [];
    }
    for (var i=0; i < data.length; i++) {
        for (var key in data[0]) {
            if (!filters[key].includes(data[i][key])) {
                filters[key].push(data[i][key]);
            }
        }
    }
    var filtered_data = data.slice(0)
    for (var i=data.length-1; i >= 0; i--) {
        for (key in data[i]) {
            if ( key == "price" || key == "ramspeed" || key == "watts") {
                min = $('#range-' + key).slider('values', 0);
                max = $('#range-' + key).slider('values', 1);

                if ( min > data[i][key] || (max < data[i][key] && max > min) ) {
                    filtered_data.splice(i, 1)
                    break;
                }

            }
            else if (key != "id" && key != "img" && key != "model" && key != "brand" && key != "power" && key != "clock" && key != "shop") {
                if (!$('#' + key + "_" + data[i][key]).prop('checked')) {
                    filtered_data.splice(i, 1)
                    break;
                }
            }
                
        }
    }
    displayItems(filtered_data)
}

var setupFilters = function(in_data){
    keys = Object.keys(in_data[0]);
    filters = {};
    for (var key in in_data[0]) {
        filters[key] = [];
    }

    var body = "";
    for (var i=0; i < in_data.length; i++) {
        for (var key in in_data[0]) {
            if (!filters[key].includes(in_data[i][key])) {
                filters[key].push(in_data[i][key]);
            }
        }
    }

    var minprice = 99999999999999;
    var maxprice = 0;

    var minspeed = 99999999999999;
    var maxspeed = 0;

    var minwatt = 99999999999999;
    var maxwatt = 0;
    for (var key in in_data[0]) {
        if (key != "id" && key != "img" && key != "model" && key != "brand" && key != "power" && key != "clock" && key != "shop") {
            body += '<div class="row" id="' + key + '_group"><div class="col-12">' + key + '<br>';
            if (key == "price") {
                for (var k=0; k < filters[key].length; k++) {
                    if (filters[key][k] < minprice)
                        minprice = filters[key][k]
                    if (filters[key][k] > maxprice)
                        maxprice = filters[key][k]
                }
                minprice -= 10
                maxprice += 10
                body += '<label for="' + key + '-amount"></label><div id="range-' + key + '"></div>';
                body += '<span id="' + key + '">$' + minprice + ' - $' + maxprice + '</span>';
            }
            else if (key == "ramspeed") {
                for (var k=0; k < filters[key].length; k++) {
                    if (filters[key][k] < minspeed)
                        minspeed = filters[key][k]
                    if (filters[key][k] > maxspeed)
                        maxspeed = filters[key][k]
                }
                minspeed -= 10
                maxspeed += 10
                body += '<label for="' + key + '-amount"></label><div id="range-' + key + '"></div>';
                body += '<span id="' + key + '">' + minspeed + ' - ' + maxspeed + '</span>';
            }
            else if (key == "watts") {
                for (var k=0; k < filters[key].length; k++) {
                    if (filters[key][k] < minwatt)
                        minwatt = filters[key][k]
                    if (filters[key][k] > maxwatt)
                        maxwatt = filters[key][k]
                }
                minwatt -= 10
                maxwatt += 10
                body += '<label for="' + key + '-amount"></label><div id="range-' + key + '"></div>';
                body += '<span id="' + key + '">' + minwatt + ' - ' + maxwatt + '</span>';
            }
            else
                for (var k=0; k < filters[key].length; k++) {
                    body += '<input class="form-check-input" type="checkbox" id="' + 
                               key + "_" + filters[key][k] + '" value="' + filters[key][k] +'" checked> ' +
                            '<label class="form-check-label" for="' + key + "_" + filters[key][k] + '">' +
                            filters[key][k] + '</label><br>';
                }
            body += '</div></div><hr/>';
        }
    }
    $("#filter_container").append(body);

    $('#range-price').slider({
        range:true,
        min: minprice,
        max: maxprice,
        values: [minprice, maxprice],
        slide: function( event, ui ) {
            $( '#price').text( '$' + ui.values[0] + ' - $' + ui.values[1] )
            activate_filter()
        }
    })
    $('#range-ramspeed').slider({
        range:true,
        min: minspeed,
        max: maxspeed,
        values: [minspeed, maxspeed],
        slide: function( event, ui ) {
            $( '#ramspeed').text( '' + ui.values[0] + ' - ' + ui.values[1] )
            activate_filter()
        }
    })
    $('#range-watts').slider({
        range:true,
        min: minwatt,
        max: maxwatt,
        values: [minwatt, maxwatt],
        slide: function( event, ui ) {
            $( '#watts').text( '' + ui.values[0] + ' - ' + ui.values[1] )
            activate_filter()
        }
    })

    for (var key in in_data[0])
        if (key != "id" && key != "img" && key != "model" && key != "brand" && key != "power" && key != "clock" && key != "shop") 
            for (var k=0; k < filters[key].length; k++) 
                $("#" + key + "_" + filters[key][k]).change(activate_filter)

}

var preFilter = function(in_data, in_build){
    var cpu_socket = ""
    var mb_socket = ""
    var mb_ramtype = ""
    var ramtype = ""
    if (in_build["motherboard"] != "") {
        mb_socket = in_build["motherboard"]["socket"]
        mb_ramtype = in_build["motherboard"]["ramtype"]
        $("#ramtype_group *").prop("checked", false)
        $("#socket_group *").prop("checked", false)
        $("#ramtype_" + mb_ramtype).prop("checked", false)

    }
    if (in_build["cpu"] != "") {
        cpu_socket = in_build["cpu"]["socket"]
        $("#socket_group *").prop("checked", false)
    }
    if (in_build["ram"] != "") {
        ramtype = in_build["ram"]["ramtype"]
        $("#ramtype_group *").prop("checked", false)
    }
    $("#socket_" + mb_socket).prop("checked", true)
    $("#socket_" + cpu_socket).prop("checked", true)
    $("#ramtype_" + mb_ramtype).prop("checked", true)
    $("#ramtype_" + ramtype).prop("checked", true)

    activate_filter()

}

$(document).ready(function(){
    $('#back_to_build').appendTo('#navbar_buttons');
    setupFilters(data)
    //when the page loads, display all the names
    displayItems(data)
    preFilter(data, build)
    displayParts()

    $("#build_title").text(build["name"])
})