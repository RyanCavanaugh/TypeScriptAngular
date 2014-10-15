/// <reference path="angular.d.ts" />
/// <reference path="angular-route.d.ts" />
/// <reference path="octokit.d.ts" />

class GitHubDataService {
    static Name = 'GitHubData';
    static Constructor = ['$http', GitHubDataService];
    constructor(public http: ng.IHttpService) { }

    getCommits(callback: (data: CommitInfo[]) => void) {
        this.http.jsonp<CommitData>('https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK').success(data => {
            callback(data.data);
        });
    }

    getUserInfo(username: string, callback: (data: UserInfo) => void) {
        this.http.jsonp<UserData>('https://api.github.com/users/' + username + '?callback=JSON_CALLBACK').success(data => {
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
            authorLink: string;
        }[];
    }

    export var Constructor = ['$scope', GitHubDataService.Name, Controller];
    export function Controller(scope: Scope, commitData: GitHubDataService) {
        commitData.getCommits(commits => {
            scope.commits = commits.map(c => ({
                title: c.commit.message,
                author: c.commit.author.name,
                link: c.html_url,
                authorLink: '#/userView/' + c.author.login
            }));
        });
    }
}

module UserInfoController {
    export interface Scope extends ng.IScope {
        name: string;
        id: string;
        picture: string;
    }

    export interface RouteParameters {
        userId: string;
    }

    export var Constructor = ['$scope', '$routeParams', GitHubDataService.Name, Controller];
    export function Controller(scope: Scope, params: RouteParameters, dataService: GitHubDataService) {
        dataService.getUserInfo(params.userId, data => {
            scope.name = data.name;
            scope.id = data.login;
            scope.picture = data.avatar_url;
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
        .when('/userView/:userId', { templateUrl: 'userView.html', controller: 'UserInfo' })
        .otherwise({ redirectTo: '/commitList' });
}

angular.module('sampleApp', ['ngRoute'])
    .config(route)
    .service(GitHubDataService.Name,  GitHubDataService.Constructor)
    .controller('CommitList',  CommitListController.Constructor)
    .controller('UserInfo', UserInfoController.Constructor)
    .filter('shorten', messageShortenerFilter);

