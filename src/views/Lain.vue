<template>
	<div>
		<Navbar />
		<div class="container">			
			<b-row>
				<b-col>
					<autocomplete :items="[ 'Apple', 'Banana', 'Orange', 'Mango', 'Pear', 'Peach', 'Grape', 'Tangerine', 'Pineapple']" />
				</b-col>
				<b-col>
					<v-select :options="options"></v-select>
				</b-col>
				<b-col>
					<router-link to="/bvpagination" class="btn btn-info float-right">
						<b-icon-eye></b-icon-eye> BVPagination
					</router-link>
				</b-col>
				<b-col>3 of 2</b-col>
			</b-row>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Navbar from "@/components/Navbar.vue";
	import Autocomplete from "@/components/Autocomplete.vue";	
	import vSelect from 'vue-select'
	import 'vue-select/dist/vue-select.css';

	Vue.component('v-select', vSelect)

	export default {
		name:'Lain',
		components:{
			Navbar,
			Autocomplete
		},
		data(){
			return {				
				options: ['daniar', 'rinaldi', 'ganteng', 'sekali', 'aja'],
			}

		},
	}

</script>
<style>

</style>