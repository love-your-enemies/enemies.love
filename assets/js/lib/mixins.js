
import { List } from 'dom'
import matches from 'dom/lib/matches'

List.prototype.node = function () {
	return this[0]
}

List.prototype.closest = function (selector) {
	const els = []
	for (let i = 0; i < this.length; ++i) {
		els.push(closest(this[i], selector))
	}
	return new List(els)
}

function closest (el, selector) {
	if (typeof el.closest === 'function') {
		return el.closest(selector)
	}
	while (el) {
		if (matches(el, selector)) break
		el = el.parentNode
	}
	return el
}
