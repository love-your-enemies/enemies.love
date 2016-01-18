
import payment from 'payment'

const isEmail = /\S+@\S+\.\S+/

export default {

	ticketType (input) {
		let val = input.trim()
		if (val !== 'student' && val !== 'standard') return false
		return true
	},

	/**
	 * Validate Full Name
	 */
	name (input) {
		let val = input.trim()
		if (val.length < 3) return false
		if (val.length > 140) return false
		return true
	},

	email (input) {
		let val = input.trim()
		if (val.length < 3) return false
		if (!isEmail.test(val)) return false
    return true
	},

	studentId (input) {
		let val = input.trim()
		if (val.length < 3) return false
		return true
	},

	cardName (input) {
		let val = input.trim()
		if (val.length < 3) return false
		return true
	},

	cardNumber (input) {
		let val = input.trim()
		if (val.length < 3) return false
		if (!payment.fns.validateCardNumber(val)) return false
		return true
	},

	expMonth (input) {
		let val = input.trim()
		if (!val.length) return false
		return true
	},

	expYear (input) {
		let val = input.trim()
		if (!val.length) return false
		return true
	},

	cvcNumber (input) {

	}

}
