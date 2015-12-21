
import $ from 'jquery'

const valid = /^.+@.+\..+$/gi

$(() => {

	const $form = $('.signup-form')
	const $email = $('.signup-email')
	const $button = $('.signup-submit')
	const $honeypot = $('.signup-gotcha')
	const $details = $('.signup-details p')

	let hasError = false

	$form.on('submit', submit)

	/**
	 * Event Handlers
	 */
	function submit (e) {
		e.preventDefault()
		if (hasError) return
		const date = new Date()
		const email = $email.val()
		// VALIDATE: did they get caught in the honeypot?
		if ($honeypot.val().length > 0) {
			// Fail silently
			$details.text('Sorry, something went wrong.')
			return
		}
		// VALIDATE: is the email a real email?
		if (!valid.test(email)) {
			hasError = true
			if (email.length < 1) {
				$details.text('Enter an email address')
			} else {
				$details.text('This email address is not valid')
			}
			$form.addClass('error')
			setTimeout(() => {
				$form.removeClass('error')
				hasError = false
			}, 800)
			return
		}
		$email.attr('readonly', '')
		$button.attr('disabled', '')
		$details.text('Saving...')
		$form.addClass('loading')
		subscribe({ date,  email })
			.always(() => { $form.removeClass('loading') })
			.done(() => {
				$form.addClass('submitted')
				$details.text('Thanks! We’ll let you know when you’re able to register.')
			})
			.fail(() => {
				$details.text('Sorry, something went wrong. Try again later.')
			})
	}

	/**
	 * Helper Functions
	 */
	function subscribe (params) {
		return $.ajax({
			method: 'POST',
			url: 'https://sheetsu.com/apis/v1.0/8186a1cb',
			data: {
				'Date': toDateString(params.date),
				'Email': params.email
			}
		})
	}

	function toDateString (now) {
		// 'MM/DD/YYYY hh:mma'
		const pad = n => n < 10 ? `0${n}` : n

		const month = now.getMonth() + 1
		const date = now.getDate()
		const hours = now.getHours()
		const minutes = now.getMinutes()

		const yyyy = now.getFullYear()
		const mm = pad(month)
		const dd = pad(date)
		const hh = hours > 12 ? pad(hours - 12) : hours === 0 ? 12 : pad(hours)
		const nn = pad(minutes)
		const a = hours > 11 ? 'pm' : 'am'

		return `${mm}/${dd}/${yyyy} ${hh}:${nn}${a}`
	}

	global.$ = $
})
