export default (function () { // eslint-disable-line
	let loadingElement = null

	return function (el, binding) {
		if (binding.value) {
			if (binding.oldValue) return

			loadingElement = document.createElement('div')
			const loadingItemElement = document.createElement('div')

			loadingElement.className = 'loading'
			loadingItemElement.className = 'loading-item'

			loadingElement.appendChild(loadingItemElement)
			el.appendChild(loadingElement)

			el.classList.add('loading-container')
		} else {
			el.classList.remove('loading-container')

			if (loadingElement) {
				loadingElement.remove()
			}
		}
	}
})()