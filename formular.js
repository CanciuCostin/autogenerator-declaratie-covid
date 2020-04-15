// Example of constructing pdfform
// If you don't care about which PDF library to use, just call without arguments, as in
// pdfform().transform(..) / pdfform().list_fields(...)
function make_pdfform() {
	return pdfform();
}

// Example of filling out fields
function fill(buf) {
    fields={}
    fields["nume"]="ccanciu";
	var list_form = document.querySelector('.list_form');
	var filled_pdf; // Uint8Array
	try {
		filled_pdf = make_pdfform().transform(buf, fields);
	} catch (e) {
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


// From here on just code for this demo.
// This will not feature in your website
function on_error(e) {
	console.error(e, e.stack);  // eslint-disable-line no-console
}


read_default_pdf()
