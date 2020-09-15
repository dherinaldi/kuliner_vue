<template>
	<div class="card shadow card-product">
		<div class="card-body">
			<h5 class="card-title">Pesanan : {{ pesanan.id }}</h5>
			<p class="card-text">Nama : {{ pesanan.nama }}</p>
			<p class="card-text">No Meja : {{ pesanan.noMeja }}</p>
			<p class="card-text">Jumlah Pesanan : {{ pesanan.keranjangs.length }}</p>

			<p class="card-text" v-for="keranjang in pesanan.keranjangs" :key="keranjang.id">
				<img :src=" require(`@/assets/images/`+ keranjang.products.gambar) " class="card-img-top" alt="..." />
				{{ keranjang.products.nama }} ({{ keranjang.jumlah_pemesanan }}) x {{ keranjang.products.harga }} : {{ keranjang.jumlah_pemesanan * keranjang.products.harga}}
			</p>

			<p class="card-text">
				Total harga
				{{ total }}
				<!-- total with computed -->
				{{ totalAmount }}
			</p>
			<router-link to="/" class="btn btn-success">Home</router-link>
			<b-icon-trash @click="hapusPesanan(pesanan.id)"></b-icon-trash>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "CardPesanan",
	props: ["pesanan"],
	data() {
		return {
			keranjangs : [],
			total :0
		};
	},
	methods:{
		setKeranjangs(data){
			this.keranjangs = data;
		},

		async load(){
			const response = await axios.get("http://localhost:3000/pesanans");
			this.setKeranjangs(response.data)
			//return response.data;
		},
		hapusPesanan(id){
			console.log(id);
			axios
			.delete("http://localhost:3000/pesanans/" + id)
			.then(() => {
				this.$toast.error("Sukses Hapus Keranjang", {
					type: "error",
					position: "top-right",
					duration: 3000,
					dismissible: true,
				});
          
          // Update Data keranjang
          this.load();
          /*axios
          .get("http://localhost:3000/pesanans")
          .then((response) => {
          	this.setKeranjangs(response.data);
          })
          .catch((error) => console.log(error));*/
      })
      .catch((error) => console.log(error));
  },
  subtotal(){
  	this.keranjangs.map( res =>{
  		this.total = this.total + (res.jumlah_pemesanan * res.products.harga);
  	})
  }

},
mounted(){
	this.setKeranjangs(this.pesanan.keranjangs);
	console.log(this.keranjangs);
    //this.subtotal();

},
computed: {
	totalAmount: function () {
		this.keranjangs.map( res =>{
			this.total = this.total + (res.jumlah_pemesanan * res.products.harga);
		})
		return this.total;
	}
}
};
</script>

<style>
</style>