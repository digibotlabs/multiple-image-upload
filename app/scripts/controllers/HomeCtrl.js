app.controller('HomeCtrl',['$scope','$location','AuthService','$filter',function($scope,$location,AuthService,$filter){
    console.log('HomeCtrl init');
    
    function init(){
    	$scope.files=[];
    }

    $scope.getFileDetails = function (e) {

        $scope.files = [];
        $scope.$apply(function () {

            // STORE THE FILE OBJECT IN AN ARRAY.
            for (var i = 0; i < e.files.length; i++) {
                $scope.files.push(e.files[i])
            }

        });

    };



    $scope.uploadMedia=function(){
        $scope.message="Uploading......";
        var uploadMedia=AuthService.uploadMedia($scope.files);
        uploadMedia.promise.then(function(response){
            if(response.message==='mediaUploaded'){
            	console.log('mediaUploaded');
              $scope.message="Uploaded Successfully";

            }else{
              console.log('error');
            }
        },function(error){
              console.log(error);
        });
    };
    
	

    init();	
}]);

app.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
}]);