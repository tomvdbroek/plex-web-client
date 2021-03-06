define(
	[
		// Globals
		'use!backbone',
		'use!xml2json'
	],

	function () {
		var MediaItemModel = Backbone.Model.extend({
			idAttribute: 'ratingKey',
			
			initialize: function (options) {
				this.url = options.url;
			},

			parse: function (response) {
				var json = $.xml2json(response);

				if (typeof(json) === 'undefined') {
					return response;
				} else if (typeof(json.Video) !== 'undefined') {
					return json.Video;
				} else if (typeof(json.Track) !== 'undefined') {
					return json.Track;
				} else {
					return json.Directory;
				}
			}
		});

		return MediaItemModel;
	}
);