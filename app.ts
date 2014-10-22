/// <reference path="jquery.d.ts" />
/// <reference path="angular.d.ts" />
/// <reference path="angular-route.d.ts" />
/// <reference path="octokit.d.ts" />

function limitFactory() {
    return function (s: string) {
        if (s.length > 80) {
            return s.substr(0, 77) + '...';
        } else {
            return s;
        }
    }
}

class GitHubService {
    static name = 'GitHubService';

    constructor(private $http: ng.IHttpService) { }

    getIssues(callback: (data: Octokit.Issue[]) => void) {
        this.$http.jsonp<Octokit.IssueQuery>("https://api.github.com/repos/Microsoft/TypeScript/issues?callback=JSON_CALLBACK").success(c => callback(c.data));
    }

    getCommits(callback: (data: Octokit.Commit[]) => void) {
        this.$http.jsonp<Octokit.CommitQuery>("https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK").success(c => callback(c.data));
    }

    getUser(username: string, callback: (user: Octokit.User) => void) {
        this.$http.jsonp<{ data: Octokit.User; }>("https://api.github.com/users/" + username + "?callback=JSON_CALLBACK").success(c => callback(c.data));
    }
}

module CommitController {
    export interface Scope extends ng.IScope {
        commits: Octokit.Commit[];
    }

    export function Controller(GitHubService: GitHubService, $scope: Scope) {
        GitHubService.getCommits(data => {
            $scope.commits = data;
        });
    }
}

module IssueController {
    export interface Scope extends ng.IScope {
        issues: Octokit.Issue[];
    }
    export function Controller(GitHubService: GitHubService, $scope: Scope) {
        GitHubService.getIssues(data => {
            $scope.issues = data;
        });
    }
}

module UserInfoController {
    export interface Scope extends ng.IScope {
        user: Octokit.User;
    }

    export interface RouteParams {
        userId: string;
    }

    export function Controller($routeParams: RouteParams, GitHubService: GitHubService, $scope: Scope) {
        GitHubService.getUser($routeParams.userId, (user) => {
            $scope.user = user;
        });
    }
}

function route($routeProvider: ng.route.IRouteProvider) {
    $routeProvider
        .when('/listing', { templateUrl: 'listing.html', controller: 'CommitController' })
        .when('/userView/:userId', { templateUrl: 'userView.html', controller: 'UserInfoController' })
        .otherwise({ redirectTo: '/listing' });
}

angular.module('myApp', ['ngRoute'])
    .config(route)
    .controller('CommitController', CommitController.Controller)
    .controller('UserInfoController', UserInfoController.Controller)
    .controller('IssueController', IssueController.Controller)
    .service(GitHubService.name, GitHubService)
    .filter('limit', limitFactory);
