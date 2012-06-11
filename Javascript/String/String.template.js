/**
 * Create a string from a template.
 *
 * Returns a new string with all "{{variables}}" replaced with their corresponding
 * properties from the given object argument.
 *
 * Example:
 * <code>
 * var data = {
 *     name: 'Scott',
 *     description: 'Ante fermentum interdum porttitor rhoncus sem velit, aenean mus nulla porta volutpat.'
 * };
 * var str = '<div><b>{{name}}</b><p>{{description}}</p>{{will be removed}}</div>'
 * console.log(str.template(data));
 * </code>
 *
 * @param {Object} data The object containing replacement data for the template variables.
 * @returns {String}
 * @author Scott Buchanan <buchanan.sc@gmail.com>
 * @link http://wafflesnatcha.github.com
 */
if (!String.prototype.template) {
	String.prototype.template = function (data) {
		var prop, result = this;
		data = data || {};
		for (prop in data) {
			if(data.hasOwnProperty(prop)) {
				result = result.replace('{{' + prop + '}}', data[prop]);
			}
		}
		return result.replace(/\{\{.+?\}\}/ig, '');
	};
}