import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../views/Home.vue'
import Foods from '../views/Foods.vue'
import FoodDetail from '../views/FoodDetail.vue'

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
	]
})
