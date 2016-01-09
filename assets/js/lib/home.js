
import monitor from 'scrollmonitor'

export default function () {
	const sidebar = document.querySelector('.sidebar')
	const scrollMarker = document.querySelector('[data-scroll-marker]')
	const waypoint = monitor.create(scrollMarker)

	waypoint.enterViewport(() => sidebar.classList.add('inactive'))
	waypoint.exitViewport(() => sidebar.classList.remove('inactive'))
}
