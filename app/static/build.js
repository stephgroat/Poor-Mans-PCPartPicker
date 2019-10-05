
var finishedMetadata = function(id) {
	$(id).parent().removeClass('col-6');
	$(id).parent().removeClass('col-8');
	$(id).parent().addClass('col-3');
	$(id).removeClass('big-btn');
	$(id).addClass('med-btn');
    $(id).parent().appendTo('#finished_container');
	$(id).removeClass('alert-primary');
	$(id).removeClass('alert-info');
	$(id).removeClass('alert-danger');
	$(id).addClass('alert-secondary');

	expandItem(id, data[id.substr(1)])
}
var nextMetadata = function(id) {
	$(id).parent().prepend('<div class="section-title">Add Next Part</div>');
	$(id).parent().removeClass('col-3');
	$(id).parent().removeClass('col-6');
	$(id).removeClass('med-btn');
	$(id).addClass('big-btn');
	$(id).parent().addClass('col-8');
    $(id).parent().appendTo('#next_item');
	$(id).removeClass('alert-secondary');
	$(id).removeClass('alert-info');
	$(id).removeClass('alert-danger');
	$(id).addClass('alert-primary');
	$(id).wrap('<a class="no-underline" href="/pick_item/' + id.substr(1) + '"></a>')
}
var upcomingMetadata = function(id) {
	$(id).parent().removeClass('col-8');
	$(id).parent().removeClass('col-6');
	$(id).removeClass('big-btn');
	$(id).removeClass('med-btn');
	$(id).parent().addClass('col-3');
	$(id).parent().appendTo('#upcoming_item');
	$(id).removeClass('alert-primary');
	$(id).removeClass('alert-secondary');
	$(id).removeClass('alert-danger');
	$(id).addClass('alert-info');
	$(id).wrap('<a class="no-underline" href="/pick_item/' + id.substr(1) + '"></a>')
}
var errorMetadata = function(id) {
	$(id).parent().removeClass('col-8');
	$(id).parent().removeClass('col-3');
	$(id).removeClass('big-btn');
	$(id).addClass('med-btn');
	$(id).parent().addClass('col-6');
	$(id).removeClass('alert-primary');
	$(id).removeClass('alert-info');
	$(id).removeClass('alert-secondary');
	$(id).addClass('alert-danger');

	expandItem(id, data[id.substr(1)])
}

var setupFinishedBuild = function() {
	$('#next_item').remove();
	// $('#upcoming_item').remove();
	$('#conflicts').remove();
	$('.section-title').remove();
	var temp = '<div class="alert alert-success" id="completion-alert">Build ready to complete!</div>'
	$('#finished_container').insertBefore('#in_progress_container');
	$('#finished_container').before(temp)
} 

var prepCard = function(type) {

	temp =  '<div class="col-5">' +
				'<img src="/static/media/' + data[type]["img"] + '">' +
            '</div>' +
            '<div class="col-7">' +
				'<div class="big">' + data[type]["brand"] + " " + data[type]["model"] + '</div>' +
				'<div class="bold huge">$' + data[type]["price"] + '</div>' +
            '</div>' +
			'</div>';
	return temp;
}

var displayParts = function() {

	var highlightNextItem = false;

	if (data["cpu"] != "") {
		$('#cpu').empty();

		temp = '<span class="bigger bold">Processor</span><div class="row">'
		temp += prepCard("cpu")

		$("#cpu").append(temp);
		$('#cpu').after('<a class="remove-btn" id="remove_cpu" href="#"><img src="/static/media/cancel.svg"></a>')
		finishedMetadata('#cpu');
	}
	else if (!highlightNextItem) {
		highlightNextItem = true;
		nextMetadata('#cpu');
	}
	else {
		upcomingMetadata('#cpu');
	}

	if (data["cooler"] != ""){
		$('#cooler').empty();

		temp = '<span class="bigger bold">CPU Cooler</span><div class="row">'
		temp += prepCard("cooler")

		$("#cooler").append(temp)
		$('#cooler').after('<a class="remove-btn" id="remove_cooler" href="#"><img src="/static/media/cancel.svg"></a>')
		finishedMetadata('#cooler');
	}
	else if (!highlightNextItem && data['cpu']['cooler'] == "no") {
		highlightNextItem = true;
		nextMetadata('#cooler');
	}
	else {
		upcomingMetadata('#cooler');
	}

	if (data["motherboard"] != ""){
		$('#motherboard').empty();
		
		temp = '<span class="bigger bold">Motherboard</span><div class="row">'
		temp += prepCard("motherboard")

		$("#motherboard").append(temp)
		$('#motherboard').after('<a class="remove-btn" id="remove_motherboard" href="#"><img src="/static/media/cancel.svg"></a>')
		finishedMetadata('#motherboard');
	}
	else if (!highlightNextItem) {
		highlightNextItem = true;
		nextMetadata('#motherboard');
	}
	else {
		upcomingMetadata('#motherboard');
	}

	if (data["gpu"] != ""){
		$('#gpu').empty();
		
		temp = '<span class="bigger bold">Graphics Card</span><div class="row">'
		temp += prepCard("gpu")

		$("#gpu").append(temp)
		$('#gpu').after('<a class="remove-btn" id="remove_gpu" href="#"><img src="/static/media/cancel.svg"></a>')
		finishedMetadata('#gpu');
	}
	else if (!highlightNextItem) {
		highlightNextItem = true;
		nextMetadata('#gpu');
	}
	else {
		upcomingMetadata('#gpu');
	}
	
	if (data["psu"] != ""){
		$('#psu').empty();
		
		temp = '<span class="bigger bold">Power Supply</span><div class="row">'
		temp += prepCard("psu")

		$("#psu").append(temp)
		$('#psu').after('<a class="remove-btn" id="remove_psu" href="#"><img src="/static/media/cancel.svg"></a>')
		finishedMetadata('#psu');
	}
	else if (!highlightNextItem) {
		highlightNextItem = true;
		nextMetadata('#psu');
	}
	else {
		upcomingMetadata('#psu');
	}
	
	if (data["ram"] != ""){
		$('#ram').empty();
		
		temp = '<span class="bigger bold">RAM</span><div class="row">'
		temp += prepCard("ram")

		$("#ram").append(temp)
		$('#ram').after('<a class="remove-btn" id="remove_ram" href="#"><img src="/static/media/cancel.svg"></a>')
		finishedMetadata('#ram');
	}
	else if (!highlightNextItem) {
		highlightNextItem = true;
		nextMetadata('#ram');
	}
	else {
		upcomingMetadata('#ram');
	}
	
	if (data["storage"] != ""){
		$('#storage').empty();
		
		temp = '<span class="bigger bold">Storage</span><div class="row">'
		temp += prepCard("storage")

		$("#storage").append(temp)
		$('#storage').after('<a class="remove-btn" id="remove_storage" href="#"><img src="/static/media/cancel.svg"></a>')
		finishedMetadata('#storage');
	}
	else if (!highlightNextItem) {
		highlightNextItem = true;
		nextMetadata('#storage');
	}
	else {
		upcomingMetadata('#storage');
	}
	
	if (data["case"] != ""){
		$('#case').empty();
		
		temp = '<span class="bigger bold">Case</span><div class="row">'
		temp += prepCard("case")

		$("#case").append(temp)
		$('#case').after('<a class="remove-btn" id="remove_case" href="#"><img src="/static/media/cancel.svg"></a>')
		finishedMetadata('#case');
	}
	else if (!highlightNextItem) {
		highlightNextItem = true;
		nextMetadata('#case');
	}
	else {
		upcomingMetadata('#case');
	}
	
	if (data["monitor"] != ""){
		$('#monitor').empty();
		
		temp = '<span class="bigger bold">Monitor</span><div class="row">'
		temp += prepCard("monitor")

		$("#monitor").append(temp)
		$('#monitor').after('<a class="remove-btn" id="remove_monitor" href="#"><img src="/static/media/cancel.svg"></a>')
		finishedMetadata('#monitor');
	}
	else {
		upcomingMetadata('#monitor');
	}
	
    var compatible = checkCompat();
    

    if ($('#finished_container').children().length > 0) {
		$('#finished_container').before('<div class="section-title">Current build</div>');
    }

    if (compatible && !highlightNextItem) {
    	setupFinishedBuild();
    }

    if ($('#upcoming_item').children().length > 0) {
		$('#upcoming_item').before('<div class="section-title">Parts not picked</div>');
    }

    $(".remove-btn").click(function(){                
        var ident = $(this).attr("id")
        submitData(ident)
    })

}

var submitData = function(name) {
    var data_to_save = name.trim()
    $.ajax({
        type: "POST",
        url: window.location.pathname,
        dataType: "html",
        contentType: "text/plain; charset=utf-8",
        data : data_to_save,
        success: function(result){
            console.log(result)
            if (name.includes("remove"))
            	window.location = "/build"
            else
            	window.location = "/"
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

var checkCompat = function() {
	var isCompatible = true;
	if (data["cpu"] != "" && data["motherboard"] != "" && data['cpu']['socket'] != data["motherboard"]['socket']) {
		$('#alerts').append('<div class="row">' +
			'<img class="img-fluid warning" src="/static/media/warning.svg">' +
			'Incompatible cpu with motherboard</div>')
		temp = '<div class="row" id="cpu_mb_conflict"></div>';
		$('#conflicts').append(temp)
		$('#cpu').parent().appendTo('#cpu_mb_conflict');
		$('#motherboard').parent().appendTo('#cpu_mb_conflict');
		errorMetadata('#cpu');
		errorMetadata('#motherboard');
		$('#conflicts').append($('#cpu_mb_conflict'))
		isCompatible = false;
	}
	if (data["ram"] != "" && data["motherboard"] != ""
			 && (data["motherboard"]["ramtype"] != data["ram"]["ramtype"] || data["motherboard"]["ramspeed"] < data["ram"]["ramspeed"])){
		temp = '<div class="row" id="mb_ram_conflict"></div>';
		$('#conflicts').append(temp)
		$('#ram').parent().appendTo('#mb_ram_conflict');

		if ($('#motherboard').parents('#conflicts').length > 0) {
			$('#motherboard').parent().clone().appendTo('#mb_ram_conflict');
			errorMetadata('#motherboard');
		}
		else
			$('#motherboard').parent().appendTo('#mb_ram_conflict');
		errorMetadata('#motherboard');
		errorMetadata('#ram');
		// errorMetadata('#motherboard');
		$('#conflicts').append($('#mb_ram_conflict'));
		$('#alerts').append('<div class="row">' +
			'<img class="img-fluid warning" src="/static/media/red_x.png">' +
			'Incompatible ram</div>');
		isCompatible = false;
	}

	if (!isCompatible) {
		$('#conflicts').prepend('<div class="section-title">Part conflicts</div>');
    }
	return isCompatible;
}

$(document).ready(function(){
    //when the page loads, display all the names
    displayParts()

    $('#finish').appendTo('.navbar-nav');
	$("#new_name").val(data["name"])
    $("#finish_btn").click(function(){
    	var name = $("#new_name").val()
        submitData(name)
    })
})