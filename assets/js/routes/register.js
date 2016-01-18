
import dom from 'dom'
import payment from 'payment'
import validations from '../lib/validations'
import noop from '../lib/noop'

const pricing = {
	'standard': 40,
	'student': 20
}

export default function (ctx) {
	Stripe.setPublishableKey('pk_test_VZPVSdywILB4qPH8LYdsw5il');

	const $form = dom('.form')
	const $tickets = dom('.ticket-type')
	const $submit = dom('.form-submit-button')
	const $errors = dom('.payment-errors')

	const $inputs = {
		ticketType: dom('input[name="ticket_type"]'),
		name: dom('input[name="name"]'),
		email: dom('input[name="email"]'),
		studentId: dom('input[name="student_id"]'),
		cardName: dom('#card_name'),
		cardNumber: dom('#card_number'),
		expMonth: dom('#exp_month'),
		expYear: dom('#exp_year'),
		cvcNumber: dom('#cvc_number')
	}

	const $show = {
		ticketTypeStudent: dom('[data-show="ticket_type:student"]')
	}

	const $bind = {
		price: dom('[data-bind="price"]')
	}

	payment.formatCardNumber($inputs.cardNumber.node())
	payment.formatCardExpiryMultiple($inputs.expMonth.node(), $inputs.expYear.node())
	payment.formatCardCVC($inputs.cvcNumber.node())

	$tickets.on('click', onSetTicketType)
	$form.on('submit', onSubmit)

	/**
	 * Event Handlers
	 */

	function onSubmit (e) {
		e.preventDefault()
		// TODO: validation
		let isValid = true
		$form.removeClass('form--has-errors')
		Object.keys($inputs).forEach(key => {
			const $input = $inputs[key]
			const $field = $input.closest('.form-field')
			const value = $input.value()
			const validation = validations[key] || noop

			if ($field.hasClass('hidden')) return

			if (validation(value)) {
				$field.removeClass('form-field--error')
				return
			}

			isValid = false
			$field.addClass('form-field--error')
		})

		if (!isValid) {
			$form.addClass('form--has-errors')
			// TODO: trigger button error state
			return
		}

		// TODO: stop router from serving page requests,
		// because we want the processing request to go through
		dom('input[id]').forEach(el => el.setAttribute('disabled', ''))
		$tickets.css('pointer-events', 'none')
		$submit.css('pointer-events', 'none')
		$submit.addClass('form-submit-button--loading')

		Stripe.card.createToken($form.node(), onStripeResponse)
	}

	function onSetTicketType (e) {
		e.preventDefault()
		const $el = dom(this)
		const type = $el.data('value')
		$tickets.removeClass('active')
		$el.addClass('active')
		$inputs.ticketType.value(type)
		$bind.price.text(pricing[type])
		$show.ticketTypeStudent.forEach(el => {
			const $el = dom(el)
			if (type !== 'student') {
				$el.addClass('hidden')
			} else {
				$el.removeClass('hidden')
			}
		})
	}

	function onStripeResponse (status, res) {
		if (res.error) {
			// errors.textContent = res.error.message
			$submit.css('pointer-events', 'auto')
			return
		}
		const token = res.id
		const tokenField = dom(`<input type="hidden" name="stripe_token" value="${token}" />`)
		$form.append(tokenField)
		$form.submit()

		/**
		 * Use localStorage to pass an ticket number to the thanks page
		 */
	}

}
