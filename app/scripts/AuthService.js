'use strict';

/**
 * @ngdoc function
 * @name foodjagatApp.controller:MainCtrl
 * @description
 * # AuthService
 * Controller of the foodjagatApp
 */

app.service('AuthService', ['$state','$http','Restangular','localStorageService',function($state,$http,Restangular,localStorageService) {
	    console.log('AuthService Init');
	    this.uploadMedia=function(files){
			console.log(files);
	        var fd = new FormData();
	        var j=0;
	        files.forEach(function(file){
	        	fd.append('uploadedFile['+j+']',file);
	        	j++;
	        })
	        console.log(fd);
	        var data={promise:null};
	        data.promise =Restangular.one('api/uploadMedia')
	        .withHttpConfig({transformRequest: angular.identity})
	        .customPOST(fd, '', undefined, {'Content-Type': undefined});
	        return data;        
	    };


		

		
}]);