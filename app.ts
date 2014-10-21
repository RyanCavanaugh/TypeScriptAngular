/// <reference path="jquery.d.ts" />
/// <reference path="angular.d.ts" />
/// <reference path="octokit.d.ts" />

// "https://api.github.com/repos/Microsoft/TypeScript/issues?callback=?"

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
        this.$http.jsonp("https://api.github.com/repos/Microsoft/TypeScript/issues?callback=JSON_CALLBACK").success(c => callback(c.data));
    }

    getCommits(callback: (data: Octokit.Commit[]) => void) {
        this.$http.jsonp("https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK").success(c => callback(c.data));
    }
}


angular.module('myApp', [])
    .controller('CommitController', (GitHubService, $scope: any) => {
        GitHubService.getCommits(data => {
            $scope.commits = data.map(c => c.commit);
        });
    })
    .controller('IssueController', (GitHubService, $scope: any) => {
        GitHubService.getIssues(data => {
            $scope.issues = data;
        });
    })
    .service(GitHubService.name, GitHubService)
    .filter('limit', limitFactory);
