/// <reference path="jquery.d.ts" />
/// <reference path="angular.d.ts" />
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

angular.module('myApp', [])
    .controller('CommitController', CommitController.Controller)
    .controller('IssueController', IssueController.Controller)
    .service(GitHubService.name, GitHubService)
    .filter('limit', limitFactory);
