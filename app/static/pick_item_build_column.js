var displayParts = function() {

    $("#parts_container").empty()
    $("#parts_container").append('<div class="section-title">Current Build</div>')
    if (build["cpu"] != "") {
        $('#cpu').empty();
        temp = '<div class="col-12 build-item-wrapper">' +
                    '<button class="btn alert-secondary btn-block build-item" data-toggle="modal" data-target="#part-modal" id="cpu">' + 
                        '<span class="bigger bold">Processor</span><div class="row">' +
                            prepCard(build["cpu"]) +
                        '</div>' +
                    '</button>' + 
                '</div>';
        $("#parts_container").append(temp)
        expandItem('#cpu', build["cpu"])
    }

    if (build["cooler"] != ""){
        $('#cooler').empty();
        temp = '<div class="col-12 build-item-wrapper">' +
                    '<button class="btn alert-secondary btn-block build-item" data-toggle="modal" data-target="#part-modal" id="cooler">' + 
                        '<span class="bigger bold">CPU Cooler</span><div class="row">' +
                            prepCard(build["cooler"]) +
                        '</div>' +
                    '</button>' + 
                '</div>';
        $("#parts_container").append(temp)
        expandItem('#cooler', build["cooler"])
    }

    if (build["motherboard"] != ""){
        $('#motherboard').empty();
        temp = '<div class="col-12 build-item-wrapper">' +
                    '<button class="btn alert-secondary btn-block build-item" data-toggle="modal" data-target="#part-modal" id="motherboard">' + 
                        '<span class="bigger bold">Motherboard</span><div class="row">' +
                            prepCard(build["motherboard"]) +
                        '</div>' +
                    '</button>' + 
                '</div>';
        $("#parts_container").append(temp)
        expandItem('#motherboard', build["motherboard"])
    }

    if (build["gpu"] != ""){
        $('#gpu').empty();
        temp = '<div class="col-12 build-item-wrapper">' +
                    '<button class="btn alert-secondary btn-block build-item" data-toggle="modal" data-target="#part-modal" id="gpu">' + 
                        '<span class="bigger bold">Graphics Card</span><div class="row">' +
                            prepCard(build["gpu"]) +
                        '</div>' +
                    '</button>' + 
                '</div>';
        $("#parts_container").append(temp)
        expandItem('#gpu', build["gpu"])
    }
    
    if (build["psu"] != ""){
        $('#psu').empty();
        temp = '<div class="col-12 build-item-wrapper">' +
                    '<button class="btn alert-secondary btn-block build-item" data-toggle="modal" data-target="#part-modal" id="psu">' + 
                        '<span class="bigger bold">Power Supply</span><div class="row">' +
                            prepCard(build["psu"]) +
                        '</div>' +
                    '</button>' + 
                '</div>';
        $("#parts_container").append(temp)
        expandItem('#psu', build["psu"])
    }
    
    if (build["ram"] != ""){
        $('#ram').empty();
        temp = '<div class="col-12 build-item-wrapper">' +
                    '<button class="btn alert-secondary btn-block build-item" data-toggle="modal" data-target="#part-modal" id="ram">' + 
                        '<span class="bigger bold">RAM</span><div class="row">' +
                            prepCard(build["ram"]) +
                        '</div>' +
                    '</button>' + 
                '</div>';
        $("#parts_container").append(temp)
        expandItem('#ram', build["ram"])
    }
    
    if (build["storage"] != ""){
        $('#storage').empty();
        temp = '<div class="col-12 build-item-wrapper">' +
                    '<button class="btn alert-secondary btn-block build-item" data-toggle="modal" data-target="#part-modal" id="storage">' + 
                        '<span class="bigger bold">Storage</span><div class="row">' +
                            prepCard(build["storage"]) +
                        '</div>' +
                    '</button>' + 
                '</div>';
        $("#parts_container").append(temp)
        expandItem('#storage', build["storage"])
    }
    
    if (build["case"] != ""){
        $('#case').empty();
        temp = '<div class="col-12 build-item-wrapper">' +
                    '<button class="btn alert-secondary btn-block build-item" data-toggle="modal" data-target="#part-modal" id="case">' + 
                        '<span class="bigger bold">Case</span><div class="row">' +
                            prepCard(build["case"]) +
                        '</div>' +
                    '</button>' + 
                '</div>';
        $("#parts_container").append(temp)
        expandItem('#case', build["case"])
    }
    if (build["monitor"] != ""){
        $('#monitor').empty();
        temp = '<div class="col-12 build-item-wrapper">' +
                    '<button class="btn alert-secondary btn-block build-item" data-toggle="modal" data-target="#part-modal" id="monitor">' + 
                        '<span class="bigger bold">Monitor</span><div class="row">' +
                            prepCard(build["monitor"]) +
                        '</div>' +
                    '</button>' + 
                '</div>';
        $("#parts_container").append(temp)
        expandItem('#monitor', build["monitor"])
    }
}