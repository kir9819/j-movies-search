export default [
	{
		name: 'Home',
		path: '/',
		component: () => import('Pages/Home'),
	},
	{
		name: 'The404',
		path: '*',
		component: () => import('Pages/The404'),
		meta: {
			title: 'Страница не найдена',
		},
	},
]