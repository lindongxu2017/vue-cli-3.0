<template>
	<div class="home">
		<input type="text" v-model="username">
		<input type="password" autocomplete="new-password" v-model="password">
		<input type="button" value="提交" @click="submit">
	</div>
</template>

<script>

import common from '@/api/common'

export default {
	name: 'home',
	data () {
		return {
			username: '',
			password: ''
		}
	},
	created () {
		
	},
	methods: {
		submit () {
			common.login(this.username, this.password).then(res => {
				console.log(res)
			})
		}
	},
	components: {

	}
}
</script>
