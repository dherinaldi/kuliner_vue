<template>
	<div>
		<Navbar />
		<div class="container">
			<b-row>
				<b-col cols="3">
					<router-link to="/appquran">
						<b-button variant="outline-primary">
							<b-icon icon="book" aria-hidden="true"></b-icon> App Quran 1
						</b-button>
					</router-link>
				</b-col>
				<b-col cols="3">
					<router-link to="#">
						<b-button variant="outline-success">
							<b-icon icon="book" aria-hidden="true"></b-icon> App Quran Fathimah
						</b-button>
					</router-link>
				</b-col>				
			</b-row>
			<div class="row mt-4">
				<div class="col">
					<h2>
						Quran
						<strong>App Fathimah</strong>
					</h2>
				</div>				
			</div>			
			<b-row>				
				<b-col cols="4" v-for ="(surah,index) in surahs" :key="index">					
					<div class="card shadow card-product">    
						<div class="card-body">      
							<h5 class="card-title"> {{ surah.asma }} ( {{ surah.nama }} )</h5>
							<h5 class="card-title"> {{ surah.nomor }}. {{ surah.arti }} </h5>
							<p class="card-text" v-if="!show" v-html="$options.filters.subStr(surah.keterangan)"> </p>
							<p class="card-text" v-else v-html="surah.keterangan"> </p>
							<p class="card-text"> {{ surah.ayat }} ayat <b-button pill variant="outline-info" size="sm" @click="load_det">load</b-button> </p>
							<router-link :to="'/appquranfathimah/'+surah.nomor">							
								<b-button pill variant="outline-success" size="sm">Selengkapnya</b-button>
							</router-link>
						</div>      
					</div>
				</b-col>
			</b-row>
		</div>
	</div>

</template>

<script>	
	import Vue from 'vue'
	import Navbar from "@/components/Navbar.vue";

	import axios from "axios";

	const link = "https://api.banghasan.com/quran/format/json/surat";

	export default {
		name:'AppQuranFathimah',
		components:{
			Navbar			
		},
		data(){
			return {
				surahs :[],
				show :false			

			}

		},
		async created(){
			const res  = await this.load();
			this.surahs = res.data.hasil;
			console.log(this.surahs);

		},
		methods:{			
			async load(){
				return axios.get(link);

			},
			load_det(){
				console.log(`det`);
				this.show = true;
			}
		},
		filters: {			
			subStr: function(string) {
				return string.substring(0,150) + '...';
			}

		}

	};

</script>
<style>

</style>