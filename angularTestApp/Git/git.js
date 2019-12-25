app.service('GitService', function($http, $q) {

    var gitUrl = "https://api.github.com";

    //grab user info from github api
    this.makeUnauthenticatedRequest = function(username) {

        var deffered = $q.defer();
        var target = `${gitUrl}/users/${username}`

        $http.get(target).then(function(response){

            console.log(`Request for ${username} was successful`);
            deffered.resolve(response.data);

        }, function(error) {

            console.log(error);
            mostRecentStatus = error.status;

            deffered.reject();

        });

        return deffered.promise;

    }

    //grab user repo info from github api
    this.grabRepoInfo = function(username) {

        var deffered = $q.defer();
        var repoUrl = `${gitUrl}/users/${username}/repos`

        $http.get(repoUrl).then(function (response) {

            console.log("Grabbed Repos from " + repoUrl);
            deffered.resolve(response.data);

        }, function(error) {

            console.log(error);
            deffered.reject();

        }); 

        return deffered.promise;

    }

});


app.controller('GitController', function($scope, GitService) {

    $scope.search = '123epsilon';
    $scope.repoName = '';
    $scope.repoOwner = '';
    $scope.repoDesc = '';
    $scope.repoLang = '';
    
    $scope.info = {};
    $scope.repos = {};
    
    $scope.$watch('search', function() {

        console.log(`Beginning request to API for ${$scope.search}`);

        GitService.makeUnauthenticatedRequest($scope.search)
            .then(function(response) {

                $scope.info = response;
                
            });
            
        GitService.grabRepoInfo($scope.search)
            .then(function(response) {
                
                $scope.repos = response;
                
            });

    });

});