
var expandItem = function(id, datum) {
	$(id).attr('data-toggle', 'modal')
	$(id).attr('data-target', '#part-modal')

	$(id).click(function() {
		setModalData(id, datum)
	})
}



var setModalData = function (id, datum) {

	var loc = window.location.pathname
	var part = id.substr(1)
	$('.modal-footer').empty()

	if (loc.includes('pick_item') && !isNaN(part)) {
		var s = loc.split('/')
		id = '#' + s[s.length-1]
    	footer = '<button type="button" class="btn btn-info add_to_build" id="' + datum["id"] +'_submit">Add to Build</button>';
	}
	else {
		footer = '<a href="' + datum["shop"] + '"><img class="amazon-img" src="/static/media/amazon.png"></a>' +
		'<button type="button" class="btn btn-secondary" id="change-part-btn">Change part</button>' +
        	'<button type="button" class="btn btn-danger"  data-dismiss="modal" id="remove-part-btn">Remove part</button>'
	}
	$('.modal-footer').append(footer)
	$('#change-part-btn').wrap('<a class="no-underline" href="/pick_item/' + part + '"></a>')

	$('#remove-part-btn').click(function(){
        submitData('remove_' + part)
    })
    $(".add_to_build").click(function(){                
        saveItem(part, "add")
    })


	$('.modal-body').empty()

	var temp = '<div class="row">' +
			'<div class="col-5">' +
			'<img src="/static/media/' + datum["img"] + '">' +
			'</div>' +
			'<div class="col-7">' +
			'<div class="huge">' + datum["brand"] + " " + datum["model"] + '</div>' +
			'<div class="huge bold">$' + datum["price"] + '</div>' +
			'</div>' +
			'</div><div class="bigger bold center-align">Specifications</div><hr/>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Brand:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["brand"] + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Model:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["model"] + '</span>' +
				'</div>' +
			'</div>';
	$('.modal-body').append(temp)

	if (id == "#cpu") {
		$('#part-modal-label').text('Processor')

		temp =
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Cores:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["cores"] + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Clock speed:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["clock"] + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Power used:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["power"] + ' W</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Cooler included:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["cooler"] + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Socket:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["socket"].toUpperCase() + '</span>' +
				'</div>' +
			'</div>'
		$('.modal-body').append(temp)

	}
	if (id == "#cooler") {
		$('#part-modal-label').text('CPU Cooler')
		temp =
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Cooler Type:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["type"] + '</span>' +
				'</div>' +
			'</div>'
		$('.modal-body').append(temp)
	}
	if (id == "#motherboard") {
		$('#part-modal-label').text('Motherboard')

		temp =
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">CPU type:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["cputype"] + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">CPU socket:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["socket"].toUpperCase() + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">RAM type:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["ramtype"].toUpperCase() + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Max RAM speed:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["ramspeed"] + '</span>' +
				'</div>' +
			'</div>'
		$('.modal-body').append(temp)
	}
	if (id == "#gpu") {
		$('#part-modal-label').text('Graphics Card')

		temp =
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Chipset type:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["type"] + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Memory:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["memory"] + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Clock speed:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["clock"] + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Power Used:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["power"] + ' W</span>' +
				'</div>' +
			'</div>'
		$('.modal-body').append(temp)
	}
	if (id == "#psu") {
		$('#part-modal-label').text('Power Supply')

		temp =
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Watts:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["watts"] + ' W</span>' +
				'</div>' +
			'</div>'
		$('.modal-body').append(temp)
	}
	if (id == "#ram") {
		$('#part-modal-label').text('RAM')

		temp =
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">RAM type:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["ramtype"] + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">RAM speed:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["ramspeed"] + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Modules:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["modules"] + '</span>' +
				'</div>' +
			'</div>'
		$('.modal-body').append(temp)
	}
	if (id == "#storage") {
		$('#part-modal-label').text('Storage')

		temp =
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Drive type:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["type"].toUpperCase() + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Capacity:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["size"] + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Interface:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["interface"].toUpperCase() + '</span>' +
				'</div>' +
			'</div>'
		$('.modal-body').append(temp)
	}
	if (id == "#case") {
		$('#part-modal-label').text('Case')
		temp =
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Tower size:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["type"].toUpperCase() + '</span>' +
				'</div>' +
			'</div>'
		$('.modal-body').append(temp)
	}
	if (id == "#monitor") {
		$('#part-modal-label').text('Monitor')

		temp =
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Size:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["size"] + '"</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Refresh rate:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["refresh"] + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Response time:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["response"] + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-5">' +
					'<span class="bold big">Panel type:</span>' +
				'</div>' +
				'<div class="col-7">' +
					'<span class="big">' + datum["panel"] + '</span>' +
				'</div>' +
			'</div>'
		$('.modal-body').append(temp)
	}
}