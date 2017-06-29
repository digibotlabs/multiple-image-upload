'use strict';
app.directive('footer', directive);

function directive() {
  var dir = {
    restrict: 'A',
    templateUrl:'views/partials/footer.html'
  };
  return dir;

  
}
