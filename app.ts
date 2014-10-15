/// <reference path="angular.d.ts" />
/// <reference path="angular-route.d.ts" />
/// <reference path="octokit.d.ts" />

class CommitDataService {
    static Name = 'CommitData';
    static Constructor = ['$http', CommitDataService];
    constructor(public http: ng.IHttpService) { }

    getCommits(callback: (data: CommitInfo[]) => void) {
        this.http.jsonp<CommitData>('https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK').success(data => {
            callback(data.data);
        });
    }
}

module CommitListController {
    export interface Scope extends ng.IScope {
        commits: {
            title: string;
            author: string;
            link: string;
        }[];
    }

    export var Constructor = ['$scope', CommitDataService.Name, Controller];
    export function Controller(scope: Scope, commitData: CommitDataService) {
        commitData.getCommits(commits => {
            scope.commits = commits.map(c => ({
                title: c.commit.message,
                author: c.commit.author.name,
                link: c.html_url
            }));
        });
    }
}

function messageShortenerFilter() {
    return function (s: string): string {
        var max = 80;
        if (s.length > max) {
            return s.substr(0, max - 3) + '...';
        } else {
            return s;
        }
    }
}

function route($routeProvider: ng.route.IRouteProvider) {
    $routeProvider
        .when('/commitList', { templateUrl: 'commitList.html', controller: 'CommitList' })
        .otherwise({ redirectTo: '/commitList' });
}

angular.module('sampleApp', ['ngRoute'])
    .config(route)
    .service(CommitDataService.Name,  CommitDataService.Constructor)
    .controller('CommitList',  CommitListController.Constructor)
    .filter('shorten', messageShortenerFilter);

