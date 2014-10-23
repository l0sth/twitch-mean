angular.module('twitch.directives', []).
	directive('yourDirective', function(){
		return {
			restrict: 'E',
			controller: 'SomeCtrl'
		};
	});