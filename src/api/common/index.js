import { httpRes } from '../index';

export default {
	login(username, password) {
		return httpRes({
      		url: '/admin/login',
			method: 'post',
			data: {
				account: username,
				password: password
			},
	    });
	}
}