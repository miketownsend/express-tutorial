(function () {

	var instruments;

	function renderInstruments () {
		var container = $('.instruments')
		container.empty();

		instruments.forEach(function (instrument) {
			var html = renderInstrument(instrument);
			container.append(html);
		})
	}

	function renderInstrument(instrument) {
		var $instrument = $(`
			<div class="panel panel-default">
			  <div class="panel-heading">${instrument.build}: ${instrument.product}</div>
			  <div class="panel-body">
			    Customer: <input value="${instrument.customer}"/>
			  </div>
			</div>
		`);

		var $input = $instrument.find('input');
		$input.on('change', function (event) {
			instrument.customer = $input.val();
			updateInstrument(instrument);
		});

		return $instrument;
	}

	function updateInstrument(instrument) {
		$.ajax({
			url: '/api/instruments/' + instrument.build,
			method: 'PUT',
			json: true,
			data: instrument, // JSON.stringify(instrument),
		    dataType: 'json',
			success: function (instrument) {
				renderInstruments();
			},
			fail: function (res) {
				console.log(res)
			}
		})
	}

	function fetchInstruments() {
		$.ajax({
			url: '/api/instruments',
			method: 'GET',
			json: true,
			success: function (data) {
				instruments = data;
				renderInstruments();
			},
			fail: function (res) {
				console.log(res)
			}
		})
	}

	fetchInstruments();
})()

