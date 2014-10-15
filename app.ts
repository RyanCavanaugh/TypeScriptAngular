/// <reference path="angular.d.ts" />
/// <reference path="octokit.d.ts" />

interface CommitListControllerScope extends ng.IScope {
    commits: {
        title: string;
        author: string;
        link: string;
    }[];
}

function commitListController($scope: CommitListControllerScope, commitData: any) {
    commitData.getCommits(commits => {
        $scope.commits = commits.map(c => ({
            title: c.commit.message,
            author: c.commit.author.name,
            link: c.html_url
        }));
    });
}

function commitDataService($http: ng.IHttpService) {
    return {
        getCommits(callback: (data: CommitInfo[]) => void) {
            $http.jsonp<CommitData>('https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK').success(data => {
                callback(data.data);
            });
        }
    };
}
module commitDataService {
    export var ServiceName = 'CommitData';
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

angular.module('sampleApp', [])
    .service(commitDataService.ServiceName,  commitDataService)
    .controller('CommitList',  ['$scope', commitDataService.ServiceName, commitListController])
    .filter('shorten', messageShortenerFilter);

