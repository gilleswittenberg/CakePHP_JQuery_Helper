var CakePHP = { JQuery: { Helper: {} } };
CakePHP.JQuery.Helper.Form = {
	DOMElement: null,
	model: null,
	isCreated: false
};

CakePHP.JQuery.Helper.Form.create = function create(model, options) {
	var $form;
	var defaults = {
		type: 'post'
	};
	options = $.extend(defaults, options);
	if (options.type === 'file') {
		options.enctype = 'multipart/form-data';
	}
	$form = $('<form>', options);
	this.DOMElement = $form;
	this.model = model;
	this.isCreated = true;
	return $form;
};

CakePHP.JQuery.Helper.Form.input = function input(fieldName, options) {
	var nameObj, model, name, $div, $label, $input, id, ret;
	var defaults = {
		type: 'text',
		value: null,
		div: {
			'class': null
		},
		label: {
			'for': null
		}
	};
	options = $.extend(defaults, options);
	if (!fieldName && options.type !== 'submit') {
		return false;
	}
	if (fieldName) {
		if (this.isCreated) {
			nameObj = this._splitFieldName(fieldName);
			model = nameObj.model || this.model;
			name =	'data' + '[' + model + ']' + '[' + nameObj.name + ']';
		} else {
			name = fieldName;
		}
	}
	if (!options.id) {
		options.id = this.model ? this.model + fieldName : '';
	}
	if (options.type === 'submit') {
		options.id = null;
		options.name = null;
		options.label = false;
	}
	$input = $('<input>', {
		type: options.type,
		name: name,
		value: options.value,
		id: this.model ? this.model + fieldName : ''
	});
	ret = $input;
	if (options.div !== false) {
		$div = $('<div>', {
			'class': options.div ? options.div['class'] : options.div
		});
		$div.append($input);
		ret = $div;
	}
	if (options.label !== false) {
		options.label['for'] = options.label['for'] || options.id;
		$label = $('<label>', {
			text: options.label || fieldName,
			'for': options.label['for']
		});
		if ($div) {
			$div.prepend($label);
		} else {
			ret = $input.before($label);
		}
	}
	// append input to form
	if (this.isCreated) {
		this.DOMElement.append(ret);
	}
	return ret;
};

CakePHP.JQuery.Helper.Form.end = function end(options) {
	var value, input, ret;
	var defaults = {
		type: 'submit'
	};
	if (typeof options === 'string') {
		value = options;
		options = {};
		options.value = value;
	}
	options = $.extend(defaults, options);
	input = this.input(null, options);
	if (this.isCreated) {
		// reset
		ret = this.DOMElement;
		this.DOMElement = null;
		this.model = null;
		this.isCreated = false;
		return ret;
	} else {
		return input;
	}
};

/*
CakePHP.JQuery.Helper.Form.get = function(){
	return this.form;
};

CakePHP.JQuery.Helper.Form.setModel(model){
};
*/
// utility methods
CakePHP.JQuery.Helper.Form._splitFieldName = function _splitFieldName(fieldName) {
	var matches, fieldNameObj = {};
	if (typeof fieldName == 'string') {
		// check if fieldName has dot in it
		if (/\./.test(fieldName)) {
			// grep string before first appearance of dot
			matches = fieldName.match(/(.*?)\./);
			fieldNameObj.model = matches[0].substr(0, matches[0].length-1);
			fieldNameObj.name = fieldName.substr(matches[0].length);
		} else {
			fieldNameObj.name = fieldName;
		}
	}
	return fieldNameObj;
};
