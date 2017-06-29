app.run([
    '$rootScope',
    '$location',
    '$stateParams', 
    '$anchorScroll',
    function($rootScope,$location,$stateParams, $anchorScroll,ngMeta) {
        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        })
        
    }
    
]);
