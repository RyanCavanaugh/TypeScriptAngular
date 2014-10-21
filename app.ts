/// <reference path="jquery.d.ts" />
/// <reference path="angular.d.ts" />
/// <reference path="octokit.d.ts" />

// "https://api.github.com/repos/Microsoft/TypeScript/issues?callback=?"

angular.module('myApp', []).controller('CommitController', ($http: ng.IHttpService) => {
    $http.jsonp("https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK")
        .success((data: Octokit.CommitQuery) => {
            $('#commits').html(data.data.map(c => c.commit.message).join('<br>'));
      });
});
