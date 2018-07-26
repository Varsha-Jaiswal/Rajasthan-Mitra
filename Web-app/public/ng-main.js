var app = angular.module('next18',['ngRoute','ngAnimate']).
                config(function($routeProvider){
                    $routeProvider
                        .when('/result',{
                            templateUrl:"views/result.html",
                            controller:"resultCtrl"
                        })

                        .otherwise({
                            redirectTo:"/",
                            templateUrl:"views/home.html",
                            controller:"homeCtrl"
                        })
                })

                .controller('homeCtrl',function($scope){

                })


                .controller('resultCtrl',function($scope){
                    
                })