export default [
	{
		name: 'Home',
		path: '/',
		component: () => import('Pages/Home'),
	},
	{
		name: 'Movie',
		path: '/movie/:id',
		props: true,
		component: () => import('Pages/Movie'),
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