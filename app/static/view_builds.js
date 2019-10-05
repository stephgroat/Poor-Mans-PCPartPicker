var prepCard = function(datum) {

	temp =  
			'<div class="row">' +
			'<div class="col-5">' +
			'<img src="/static/media/' + datum["img"] + '">' +
            '</div>' +
            '<div class="col-7">' +
            	'<div class="big bold">Featured Part</div>' +
				'<div class="big">' + datum["brand"] + " " + datum["model"] + '</div>' +
            '</div>';
	return temp;
}


var displayBuild = function(i) {

	if (data[i]["name"] == "")
		data[i]["name"] = "[unnamed_build]";
	var body = 	'<div class="col-4 top-pad"><button class="btn btn-block build-item" id="' + i + '_btn"><span class="huge bold">' + data[i]["name"] + '</span>'
	var featured = "";
	if (data[i]["cpu"] != "") {
		featured = prepCard(data[i]["cpu"])
	}
	else if (data[i]["gpu"] != "") {
		featured = prepCard(data[i]["gpu"])
	}
	else if (data[i]["motherboard"] != "") {
		featured = prepCard(data[i]["motherboard"])
	}
	else if (data[i]["monitor"] != "") {
		featured = prepCard(data[i]["monitor"])
	}
	else if (data[i]["case"] != "") {
		featured = prepCard(data[i]["case"])
	}
	else if (data[i]["ram"] != "") {
		featured = prepCard(data[i]["ram"])
	}
	else if (data[i]["storage"] != "") {
		featured = prepCard(data[i]["storage"])
	}
	else if (data[i]["psu"] != "") {
		featured = prepCard(data[i]["psu"])
	}
	else if (data[i]["cooler"] != "") {
		featured = prepCard(data[i]["cooler"])
	}
	else {
		featured = 
			'<div class="row">' +
			'<div class="col-5">' +
            '</div>' +
            '<div class="col-7">' +
            '</div>';
	}

	body +=	featured + '</div><div class="row top-pad">'

	var incomplete = false;
	var incompat = false;
	for (var k in data[i]) {
		if (k != "cooler" && k != "monitor" && data[i][k] == "")
			incomplete = true;
		if (data[i]["cpu"] != "" && data[i]['cpu']['cooler'] == "no" && data[i]['cooler'] == "")
			incomplete = true;
	}
	if (data[i]["cpu"] != "" && data[i]["motherboard"] != "" && data[i]["cpu"]["socket"] != data[i]["motherboard"]["socket"])
		incompat = true;
	else if (data[i]["motherboard"] != "" && data[i]["ram"] != "" && data[i]["motherboard"]["ramtype"] != data[i]["ram"]["ramtype"])
		incompat = true;
	else if (data[i]["motherboard"] != "" && data[i]["ram"] != "" && data[i]["motherboard"]["ramspeed"] < data[i]["ram"]["ramspeed"])
		incompat = true;

	if (incompat) {
		body +=	'<div class="col-2">' +
				'<img class="warning" src="/static/media/warning.svg"></div>' +
				'<div class="col-4 big left-align">Incompatible</div>'
	}
	else if (incomplete) {
		body +=	'<div class="col-2">' +
				'<img class="warning" src="/static/media/warning.svg"></div>' +
				'<div class="col-4 big left-align">Incomplete</div>'
	}
	else
		body +=	'<div class="col-2">' +
				'<img class="warning" src="/static/media/green_check.png"></div>' +
				'<div class="col-4 big left-align">Complete</div>'

	body +=		
				'<div class="col-6 big bold">Total Cost: $' +
				data[i]["totalcost"] +
				'</div>';
	body +=	'</div></div>' +
			'</button></div>';

	$("#builds_container").append(body);

	if (incompat) {
		$("#" + i + "_btn").addClass("alert-danger")
	}
	else if (incomplete) {
		$("#" + i + "_btn").addClass("alert-secondary")
	}
	else
		$("#" + i + "_btn").addClass("alert-success")


	$("#" + i + "_btn").click(function() {
		window.location = "/build/" + (i+1)
	})
}
$(document).ready(function(){

	for (var i = 0; i < data.length; i++) {
		displayBuild(i);
	}
})