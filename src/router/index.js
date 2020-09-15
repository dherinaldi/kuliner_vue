import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../views/Home.vue'
import Foods from '../views/Foods.vue'
import FoodDetail from '../views/FoodDetail.vue'
import Keranjang from '../views/Keranjang.vue'
import SubmenuLain from '../views/SubmenuLain.vue'
import Crud from '../views/Crud.vue'
import PesananSukses from '../views/PesananSukses.vue'
import AppQuran from '../views/AppQuran.vue'

Vue.use(Router)

export default new Router({
	routes: [
	{
		path: '/',
		name: 'Home',
		component: Home

	},
	{
		path: '/hello',
		name: 'HelloWorld',
		component: HelloWorld
	},
	{
		path: '/foods',
		name: 'Foods',
		component: Foods
	},
	{
		path: '/foods/:id',
		name: 'FoodDetail',
		component: FoodDetail
	},
	{
		path: '/keranjang',
		name: 'Keranjang',
		component: Keranjang
	},
	{
		path: '/submenulain',
		name: 'SubmenuLain',
		component: SubmenuLain
	},
	{
		path: '/crud',
		name: 'Crud',
		component: Crud
	},
	{
		path: '/pesanan-sukses',
		name: 'PesananSukses',
		component: PesananSukses
	},
	{
		path: '/appquran',
		name: 'AppQuran',
		component: AppQuran
	},
	]
})
