import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import Instruct from '@/view/Instruct'
import End from '@/view/end'
import Bar from '@/view/Bar'
import BarV from '@/view/BarV'
import Pie from '@/view/Pie'
import Point from '@/view/Point'
import Polyline from '@/view/Polyline'
import Radar from '@/view/Radar'

Vue.use(Router)

export default new Router({
  	routes: [
		{path:'/', name:'home', component:Home, meta:{txt:'首页'}},
		{path:'/instruct', name:'instruct', component:Instruct, meta:{txt:'介绍页'}},
		{path:'/bar', name:'wx', component:Bar, meta:{txt:'柱图'}},
		{path:'/barV', name:'product', component:BarV, meta:{txt:'横向柱图'}},
		{path:'/pie', name:'expertTeam', component:Pie, meta:{txt:'饼图'}},
		{path:'/point',name:'expertSuccess', component:Point, meta:{txt:'散点图'}},
		{path:'/polyline', name:'insureWiki', component:Polyline, meta:{txt:'折线图'}},
		{path:'/radar', name:'insureDetail', component:Radar, meta:{txt:'雷达图'}},
		{path:'/end', name:'end', component:End, meta:{txt:'尾页'}}
  	]
})