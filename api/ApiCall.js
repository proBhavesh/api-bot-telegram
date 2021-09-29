const axios = require("axios");

const categories = async () => {
	const url = await axios(`https://api.publicapis.org/categories`);
	return await url.data;
};
//axios the requests by the user
const userQuery = async (query) => {
	const url = await axios(
		`https://api.publicapis.org/entries?category=${query}&https=true`
	);
	const userQueryResponse = await url;
	return userQueryResponse;
};
//axios everything
const allAPIs = async () => {
	const url = await axios(`https://api.publicapis.org/entries`);
	const allAPIs = await url.data;
	return allAPIs;
};
//random APIs
const randomAPI = async () => {
	const url = await axios(`https://api.publicapis.org/random`);
	const randomAPI = await url.data;
	return randomAPI;
};

module.exports = {
	categories,
	userQuery,
	allAPIs,
	randomAPI,
};
