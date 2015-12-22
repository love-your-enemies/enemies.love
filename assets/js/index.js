
import ready from 'domready'
import select from 'dom-select'
import on from 'dom-event'
import classes from 'dom-classes'

const valid = /^.+@.+\..+$/gi

ready(() => {

	const $form = select('.signup-form')
	const $email = select('.signup-email')
	const $button = select('.signup-submit')
	const $honeypot = select('.signup-gotcha')
	const $details = select('.signup-details p')

	let hasError = false

	on($form, 'submit', submit)

	/**
	 * Event Handlers
	 */
	function submit (e) {
		e.preventDefault()
		if (hasError) return
		const date = new Date()
		const email = $email.value
		// VALIDATE: did they get caught in the honeypot?
		if ($honeypot.value.length > 0) {
			$details.textContent = 'Sorry, something went wrong.'
			return
		}
		// VALIDATE: is the email a real email?
		if (!valid.test(email)) {
			hasError = true
			if (email.length < 1) {
				$details.textContent = 'Enter an email address'
			} else {
				$details.textContent = 'This email address is not valid'
			}
			classes.add($form, 'error')
			setTimeout(() => {
				classes.remove($form, 'error')
				hasError = false
			}, 800)
			return
		}
		$email.setAttribute('readonly', '')
		$button.setAttribute('disabled', '')
		$details.textContent = 'Saving...'
		classes.add($form, 'loading')
		subscribe({ date,  email })
			.then(checkStatus)
			.then(parseJSON)
			.then(res => {
				classes.add($form, 'submitted')
				$details.textContent = 'Thanks! We’ll let you know when you’re able to register.'
			})
			.catch(err => {
				setTimeout(() => {
					$details.textContent = 'Sorry, something went wrong. Try again later.'
				}, 150)
			})
	}

	function parseJSON (res) {
		return res.json()
	}

	function checkStatus (res) {
		if (res.status >= 200 && res.status < 300) {
			return res
		} else {
			var error = new Error(res.statusText)
			error.res = res
			throw error
		}
	}

	/**
	 * Helper Functions
	 */
	function subscribe (params) {
		return fetch('https://sheetsu.com/apis/v1.0/8186a1cb', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'Date': toDateString(params.date),
				'Email': params.email
			})
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
})
