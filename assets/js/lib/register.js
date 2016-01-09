
/*
Stripe.setPublishableKey('pk_test_VZPVSdywILB4qPH8LYdsw5il');
$(function () {
	$('#payment-form').on('submit', function (e) {
		e.preventDefault()
		var $form = $(this)
		$form.find('button').prop('disabled', true)
		Stripe.card.createToken($form, stripeResponseHandler)
	})
	function stripeResponseHandler(status, response) {
		var $form = $('#payment-form')

		if (response.error) {
			// Show the errors on the form
			$form.find('.payment-errors').text(response.error.message)
			$form.find('button').prop('disabled', false)
		} else {
			// response contains id and card, which contains additional card details
			var token = response.id
			// Insert the token into the form so it gets submitted to the server
			$form.append($('<input type="hidden" name="stripe_token" />').val(token))
			// and submit
			$form.get(0).submit()
		}
	}
})
 */

console.log(process.env)

export default function () {
	const submit = document.querySelector('button[type="submit"]')
	submit.addEventListener('click', e => {
		e.preventDefault()
		submit.classList.add('form-submit--loading')
	})
}
