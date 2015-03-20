/**
 * Created by Ravikant on 2/1/14.
 */
'use strict';

angular.module('educationMediaApp').directive('toggle', function() {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			if (attrs.toggle == "tooltip") {
				$(element).tooltip();
			}
			if (attrs.toggle == "popover") {
				$(element).popover();
			}
		}
	};
});
