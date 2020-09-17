<template>
	<div>
		<Navbar />
		<div class="container">				
			<div class="row mt-4">
				<div class="col">
					<h2>
						Quran
						<strong>App Fathimah</strong>
					</h2>
				</div>				
			</div>
			<b-row>	
				<b-col>			
					{{ surah }}
					{{ this.$route.params.surah }}
				</b-col>
			</b-row>
			
		</div>
	</div>
</div>
</template>
<script>
	import Navbar from "@/components/Navbar.vue";
	import axios from 'axios';
	
	export default {
		name:'QuranFathimahDetail',
		components:{
			Navbar			
		},
		data(){
			return {				
				url : 'https://api.banghasan.com/quran/format/json/surat/'+this.$route.params.surah,
				surah :{}
			}
		},
		methods:{
			setSurah(data) {
				this.surah = data;				
			},
			load(){
				axios
				.get(this.url)
				.then((response) => {
					this.setSurah(response.data.hasil)					
					console.log(response.data.hasil)						
				})
				.catch((error) => console.log(error));
			}

		},		
		mounted(){
			console.log(this.$route.params.surah);
			console.log(this.url)
			this.load();
		}
	};

	
</script>
<style>

</style>