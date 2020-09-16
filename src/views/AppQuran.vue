<template>
	<div>
		<Navbar />
		<div class="container">
			<div class="row mt-4">
				<div class="col">
					<h2>
						Quran
						<strong>App</strong>
					</h2>
				</div>
				<div class="col">
					<router-link to="#" class="btn btn-success float-right">
						<b-icon-eye></b-icon-eye>Lihat Semua
					</router-link>
				</div>
			</div>

			<div class="row mb-4">				
				<div class="col-md-4 mt-4" v-for="(surah, index) in surahs" :key="index">
					<CardSurah 
					:surah=surah />
					
				</div>
			</div>
			
			
		</div>
	</div>
	
</template>

<script>
	import Navbar from "@/components/Navbar.vue";
	import CardSurah from "@/components/CardSurah.vue";

	import axios from "axios";
	export default {
		name:'AppQuran',
		components:{
			Navbar,
			CardSurah
		},
		data(){
			return {
				surahs :[]
			}

		},
		methods:{
			setSurahs(data) {
				this.surahs = data;
			},
			load(){
				axios
				.get("http://localhost:3000/quran")
				.then((response) => {
					this.setSurahs(response.data);
					//console.log(response.data);
				})
				.catch((error) => console.log(error));

			}			

		},
		mounted(){			
			this.load();			
		}
	};
	
</script>
<style>

</style>