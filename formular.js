function make_pdfform() {
	return pdfform();
}

function get_form_fields() {
	var url_string = document.URL;
	var url = new URL(url_string);
	var nume = url.searchParams.get("nume");
	var prenume = url.searchParams.get("prenume");
	var zi_nastere = url.searchParams.get("zi_nastere");
	var luna_nastere = url.searchParams.get("luna_nastere");
	var an_nastere = url.searchParams.get("an_nastere");
	var adresa_locuintei = url.searchParams.get("adresa_locuintei");
	var locul_deplasarii = url.searchParams.get("locul_deplasarii");
	var motivul_deplasarii = url.searchParams.get("motivul_deplasarii1-10");
	var data_declaratiei = url.searchParams.get("data_declaratiei");
	
	fields={};
    fields["nume"]=[nume];
	fields["prenume"]=[prenume];
	fields["ziua"]=[zi_nastere];
	fields["luna"]=[luna_nastere];
	fields["anul"]=[an_nastere];
	fields["fill_8"]=[adresa_locuintei];
    fields["fill_1"]= data_declaratiei != null ? [data_declaratiei] : [new Date().toJSON().slice(0,10).replace(/-/g,'/')];
    fields["fill_10"]=locul_deplasarii != null ? [locul_deplasarii] : ["Supermarket"]
    
	switch (motivul_deplasarii) {
        case "1":
            fields["Group1"]=["Choice1"];c
            break;
        case "2":
            fields["Group2"] = ["Choice1"];
            break;
        case "3":
            fields["Group3"] = ["Choice1"];
            break;
        case "4":
            fields["Group4"] = ["Choice1"];
            break;
        case "5":
            fields["Group5"] = ["Choice1"];
            break;
        case "6":
            fields["Group6"] = ["Choice1"];
            break;
        case "7":
            fields["Group7"] = ["Choice1"];
            break;
        case "8":
            fields["Group8"] = ["Choice1"];
            break;
        case "9":
            fields["Group9"] = ["Choice1"];
            break;
        case "10":
            fields["Group10"] = ["Choice1"];
            break;
        case null:
            fields["Group2"] = ["Choice1"];
            break;
}
	return fields;
}

function fill(buf) {
	var fields = get_form_fields();
	var filled_pdf; // Uint8Array
	try {
		filled_pdf = make_pdfform().transform(buf, fields);
    }
    catch (e) {
		return on_error(e);
	}
	var blob = new Blob([filled_pdf], {type: 'application/pdf'});
    saveAs(blob, 'pdfform.js_generated.pdf');      
}

function read_default_pdf(){
    var xhr = new XMLHttpRequest();
	xhr.open('GET', "original.pdf", true);
	xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
        if (this.status == 200) {
            fill(this.response);
        } else {
            on_error('failed to load URL (code: ' + this.status + ')');
        }
    };
	xhr.send();
}

function on_error(e) {
	console.error(e, e.stack);
}

read_default_pdf()
