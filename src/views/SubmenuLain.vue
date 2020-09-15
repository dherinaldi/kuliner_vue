<template>
	<div>
		<Navbar />
		<div class="container">
			<div class="row mt-4">
				<div class="col">
					<h2>
						Daftar
						<strong>SubmenuLain</strong>
					</h2>
				</div>
			</div>

			<div class="row mt-3">
				<div class="col">
					<div class="input-group mb-3">

						<input
						v-model="search"
						type="text"
						class="form-control"
						placeholder="Cari Pesanan Anda .."
						aria-label="Cari"
						aria-describedby="basic-addon1"
						@keyup="searchPesanan"
						/>

						<div class="input-group-prepend">
							<span class="input-group-text" id="basic-addon1">
								<b-icon-search></b-icon-search>
							</span>
						</div>
					</div>
				</div>
			</div>

			<!-- 
			manual without component
			<div class="row mb-4">
				<div class="col-md-4 mt-4" v-for="pesanan in pesanans" :key="pesanan.id">

					pesanan : {{ pesanan.id }} <br> nama : {{ pesanan.nama }} <br> meja {{ pesanan.noMeja }}

					<div v-for="keranjang in pesanan.keranjangs" :key="keranjang.id">
						{{ keranjang.id }} {{ keranjang.jumlah_pesanan }} {{ keranjang.keterangan }}
						{{ keranjang.products.id }} {{ keranjang.products.nama }} {{ keranjang.products.gambar }} {{ keranjang.products.harga }}
					</div>
				</div>
			</div> -->

			<div class="row mb-4">
				<div class="col-md-4 mt-4" v-for="pesanan in pesanans" :key="pesanan.id">
					<CardPesanan :pesanan="pesanan" />
				</div>
			</div>

		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import CardPesanan from "@/components/CardPesanan.vue";
import axios from "axios";

export default {
	name: "SubmenuLain",
	components: {
		Navbar,
		CardPesanan

	},
	data() {
		return {
			pesanans: [],
			search: '',
		};
	},
	methods:{
		setPesanans(data){
			this.pesanans = data;
		},
		searchPesanan() {
			axios
			.get("http://localhost:3000/pesanans?q="+this.search)
			.then((response) => this.setPesanans(response.data))
			.catch((error) => console.log(error));
		}
	},
	mounted() {
		axios
		.get("http://localhost:3000/pesanans")
		.then((response) => {
			this.setPesanans(response.data);
			console.log(response.data);
		})
		.catch((error) => console.log(error));
	},

};
</script>
