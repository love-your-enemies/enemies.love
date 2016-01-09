
const markdown = require('marked')

module.exports = function (input) {
	return markdown(input)
}
