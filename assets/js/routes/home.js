
import dom from 'dom'
import smoothScrollTo from 'scroll-to'

import router from '../lib/router'

const isHome = path => /^\/$/g.test(path)
const isSchedule = path => /schedule/g.test(path)
const animationOpts = {
	ease: 'outExpo',
	duration: 800
}

const scrollTo = el => smoothScrollTo(0, el.offset().top, animationOpts)
const jumpTo = el => window.scrollTo(0, el.offset().top)

export default function (ctx) {

	const nav = dom('.nav')
	const intro = dom('.section-intro')
	const schedule = dom('.section-schedule')
	const prev = router.prev

	if ((isHome(prev.path) || isSchedule(prev.path)) && isSchedule(ctx.path) && !ctx.init) {
		scrollTo(schedule)
		nav.find('.active').removeClass('active')
		nav.find('[data-id="schedule"]').addClass('active')
	} else if ((isHome(prev.path) || isSchedule(prev.path)) && isHome(ctx.path) && !ctx.init) {
		scrollTo(intro)
		nav.find('.active').removeClass('active')
		nav.find('[data-id="home"]').addClass('active')
	} else if (isSchedule(ctx.path) && !ctx.init) {
		jumpTo(schedule)
	}

}
