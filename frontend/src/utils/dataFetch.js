const config = require('../config');
export const dataFetch = async (url, data = {}, user = null) => {
	if (user) {
		data.token = user.token;
		data.authId = user.userId;
	}

	const apiConfig = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'same-origin',
		body: JSON.stringify(data),
	};

	return fetch(config.API_URL + url, apiConfig)
		.then(function (response) {
			return response.json().then((json) => {
				if (json.status_code === 401) {
					window.location.href = '/home';
					localStorage.clear();
				}
				return json; //Gets cascaded to the next then block
			});
		})
		.catch(function (error) {
			throw error; //gets caught in the higher catch block
		});
};
