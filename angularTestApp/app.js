var app = angular.module('myApp', ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider){

    $routeProvider.when('/', {

        templateUrl: 'Git/git.html'

    })
    ;

});

