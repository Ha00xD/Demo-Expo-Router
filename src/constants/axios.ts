import axios from "axios";

const Axios = axios.create({
	baseURL: "https://music.tablemusicmm.com/api",
	timeout: 3000,
	headers: {
		"Content-Type": "application/json",
	},
});

export default Axios;
