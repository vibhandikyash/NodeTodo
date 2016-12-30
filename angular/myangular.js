var myapp = angular.module('mymod', ['Alertify' , 'ngRoute']);


myapp.config(function ($httpProvider , $routeProvider){


	$routeProvider.when('/login', { templateUrl : 'my/login'})
	.when('/test',{ templateUrl : 'test'})
	.when('/todo', {templateUrl : '/todo/all' , controller : 'todocontroller'})
	.otherwise({redirectTo : '/'});

		$httpProvider.interceptors.push(function() {
			if(x === undefined)
			{
			var x;
			console.log('x declared');
			}
		return {
		request : function(config){
			console.log('request-config :' +  JSON.stringify(config.headers));
			config.headers['x-access-token'] = x;
			// x = config.headers['Accept'];
			console.log(x);
			return config;
		},
		response : function(data){
			x = data.headers('x-access-token');
			console.log(data.headers('x-access-token'));
			return data;
		}
		}
	});
});

myapp.run(function(Alertify, $http){
	Alertify.success('run executed');
	$http.get('/login').success(function (data, status, headers){
		console.log(headers())
		// $rootScope.token = headers('x-access-token');
		// console.log($rootScope);
	}).error(function(err){
		alert('Error : '+ err);
	});
});


myapp.controller('mycontroller', function ($scope, $http, LoginFactory, Alertify){

Alertify.success('controller');


	$scope.showalert = function(message , type){
		if(type === 'success')
		{
			Alertify.success(message);
		}
		if(type === 'error')
		{
			Alertify.error(message);
		}
	};

	$scope.Message = "dotn3tter";

	$scope.signup = function (user) {
		alert('1 :' + JSON.stringify(user));
			LoginFactory.createuser(user).success(function(resp) {
                if(Boolean(resp.data))
				{
				Alertify.success('User Created Successfully');
				}
				else
				{
				Alertify.error('An Error Occured! Please Try Again');
				}
				// alert(JSON.stringify(resp.data));
			}, function (err) {
					$scope.serverMessage = err;
					alert(err);
			});
	};


	$scope.log = function(user){
		LoginFactory.checkuser(user).then(function(res){
		$scope.Message = JSON.stringify(res.data);
		});
	};
});

myapp.controller('todocontroller', ['todoFactory', 'Alertify', '$http' ,'$scope', function( todoFactory, Alertify, $http, $scope){
$scope.Message = 'Heyya!';

var getalltodos = function(){
	$http.get('/todo/all').success(function(res){
		console.log('res :'+ angular.toJson(res));
	Alertify.success('Refreshed!');	
	$scope.todos = res;
	}).error(function(err){
	Alertify.error('Oppps! Something went terribly wrong!');
	});
	console.log('todos :' + $scope.todos);
}
	getalltodos();

	$scope.addtodo = function(todo){
		todoFactory.addnew(todo).success(function(data){
		(data) ? Alertify.success('Todo Added') : Alertify.error('Couldn\'t add Todo!');
		getalltodos();
		}).error(function(err){
	Alertify.error('Oppps! Something went terribly wrong while adding TODO! Err :' + err);
		});
	}

	$scope.remove = function(todo){
		console.log(todo);	
		todoFactory.remove(todo).success(function(data){
		(data) ? Alertify.success('Todo Removed Successfully') : Alertify.error('Couldn\'t Remove Todo!');
		}).error(function(err){
			Alertify.error('Oppps! Something went terribly wrong while adding TODO! Err :' + err);			
		});
		getalltodos();					
	};
}]);



myapp.factory('LoginFactory', function($http){

var fac = {};

fac.createuser = function(user){
alert(angular.toJson(user));
var httpobj = {
	method : 'POST',
	url : '/signup',
	headers : {
		'Content-Type' : 'application/JSON'
	},
	data : angular.toJson(user)
};

return $http(httpobj);
};

fac.checkuser = function(user){
alert(angular.toJson(user));
var httpobj = {
	method : 'POST',
	url : '/login',
	headers : {
		'Content-Type' : 'application/Json'
		// 'x-access-token' : 
	},
	data : angular.toJson(user)
};

return $http(httpobj);
};

return fac;
});


myapp.factory('todoFactory', function($http){

var fac = {};

fac.getlist = function(){
    alert();
return $http.get('/todo/all');
};




fac.addnew = function(todo){
 return $http({
        method : 'POST',
        url : '/todo/add',
        headers : {
		'Content-Type' : 'application/Json'
        },
		data : angular.toJson({newitem : todo})
    });
};

fac.remove = function(id){
 return $http({
        method : 'POST',
        url : '/todo/remove',
        headers : {
		'Content-Type' : 'application/Json'
        },
		data : angular.toJson({id : id})
    });
};

return fac;

});


myapp.filter('checknull',function(){
	return function(todo){
	var newarray = [];
	angular.forEach(todo, function(item){
		if(item.list != undefined || item.list != null) {  newarray.push(item);}
	});
	return newarray;
}
});


