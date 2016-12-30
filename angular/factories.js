angular.module('factories', []).factory('todoFactory', ['$http', function($http){

var fac = {};

fac.getall = function(){
    alert();
return $http.get('/todo/all');
};

fac.addnew = function(todo){
 return $http({
        method : 'POST',
        url : '/todo/add',
        headers : {
            'Content-Type' : 'application/json'
        },
        data : { newitem : todo}
    });
};

return fac;

}]);