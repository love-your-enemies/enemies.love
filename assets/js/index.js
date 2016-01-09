
import ready from 'domready'

import home from './lib/home'
import register from './lib/register'

const noop = () => {}

const router = {
	'home': home,
	'register': register
}

ready(() => {
	const id = document.head.querySelector('[property="page:id"]').content || 'default'
	const fn = router[id] || noop
	fn()
})
