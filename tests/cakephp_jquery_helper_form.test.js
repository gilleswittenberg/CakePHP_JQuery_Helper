$(function() {
	module('Unittests CakePHP.JQuery.Helper.Form', {
		teardown: function() {
			CakePHP.JQuery.Helper.Form.DOMElement = null;
			CakePHP.JQuery.Helper.Form.model = null;
			CakePHP.JQuery.Helper.Form.isCreated = false;
		}
	});

	test('function form', function() {
		ok(CakePHP.JQuery.Helper.Form.create('Model').is('form'), 'Is form');
	});

	test('function input', function() {
		equal(CakePHP.JQuery.Helper.Form.input(), false);
		ok(CakePHP.JQuery.Helper.Form.input('fieldname').is('div'), 'Is div');
		ok(CakePHP.JQuery.Helper.Form.input('fieldname').find('input').is('input'), 'Is input');
		equals(CakePHP.JQuery.Helper.Form.input('fieldname').find('input').attr('type'), 'text', 'type = text');
		equals(CakePHP.JQuery.Helper.Form.input('fieldname').find('input').val(), '', 'value = ""');
		equals(CakePHP.JQuery.Helper.Form.input('fieldname').find('input').attr('name'), 'fieldname', 'name = fieldname');
		equals(CakePHP.JQuery.Helper.Form.input('data[\'Model\'][\'fieldname\']').find('input').attr('name'), 'data[\'Model\'][\'fieldname\']', 'name = PHP array');
		// options.div
		equals(CakePHP.JQuery.Helper.Form.input('fieldname', {div: {'class': 'test'}}).find('input').attr('name'), 'fieldname', 'name = PHP array');
		ok(CakePHP.JQuery.Helper.Form.input('fieldname', {div: false}).first().is('label'), 'options.div = false');
		ok(CakePHP.JQuery.Helper.Form.input('fieldname', {div: false}).last().is('input'), 'options.div = false');
		// label false
		ok(CakePHP.JQuery.Helper.Form.input('fieldname', {label: false}).children().first().is('input'), 'label = false');
		equals(CakePHP.JQuery.Helper.Form.input('fieldname', {label: {'for': 'input_id'}}, true).children().first().attr('for'), 'input_id', 'label for attr');
	});

	test('function _splitFieldName', function() {
		same(CakePHP.JQuery.Helper.Form._splitFieldName({}), {}, 'not a string');
		equal(CakePHP.JQuery.Helper.Form._splitFieldName('fieldname').name, 'fieldname', 'string');
		equal(CakePHP.JQuery.Helper.Form._splitFieldName('ModelName.fieldname').model, 'ModelName', 'string with dot');
		equal(CakePHP.JQuery.Helper.Form._splitFieldName('ModelName.fieldname').name, 'fieldname', 'string with dot');
		// multiple dots
		equal(CakePHP.JQuery.Helper.Form._splitFieldName('ModelName.fieldname.dot').model, 'ModelName', 'string');
		equal(CakePHP.JQuery.Helper.Form._splitFieldName('ModelName.fieldname.dot').name, 'fieldname.dot', 'string');
	});

	module('Integration test CakePHP.JQuery.Helper.Form', {
	});

	test('integration test', function() {
		CakePHP.JQuery.Helper.Form.create('Model');
		CakePHP.JQuery.Helper.Form.input('fieldname');
		CakePHP.JQuery.Helper.Form.input('fieldname2');
		CakePHP.JQuery.Helper.Form.input('Model2.fieldname');
		console.log(CakePHP.JQuery.Helper.Form.end('Value'));
	});
});
