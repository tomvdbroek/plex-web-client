define(
	[
		'plex/model/AppModel'
	],

	function (appModel) {

		var user = appModel.get('user');

		function onError(xhr, status, error) {
			// Show an alert
			appModel.set({ error: 'This item could not be marked as watched.' });
		}

		return {
			execute: function (item) {
				$.ajax({
					type: 'GET',
					url: '/api/pms/:/scrobble?key=' + encodeURIComponent(item.get('ratingKey')) + '&identifier=' + item.id + '&X-Plex-Token=' + user.get('authentication_token'),
					headers: {
						'X-Plex-Proxy-Host': 'my.plexapp.com',
						'X-Plex-Proxy-Port': 443
					},
					contentType: 'application/xml',
					dataType: 'text',
					processData: false,
					error: onError
				});
			}
		}
	}
);