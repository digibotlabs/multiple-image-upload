'use strict';
app.directive('navigation', directive);

function directive() {
  var dir = {
    restrict: 'A',
    templateUrl:'views/partials/navigation.html'
  };
  return dir;

  
}
