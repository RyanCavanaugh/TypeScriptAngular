/// <reference path="angular.d.ts" />
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

interface CommitListControllerScope extends ng.IScope {
    commits: {
        title: string;
        author: string;
        link: string;
    }[];
}

function commitListController($scope: CommitListControllerScope, commitData: CommitDataService) {
    commitData.getCommits(commits => {
        $scope.commits = commits.map(c => ({
            title: c.commit.message,
            author: c.commit.author.name,
            link: c.html_url
        }));
    });
}
module commitListController {
    export var dependencies = ['$scope', CommitDataService.Name];
    export var constructor = dependencies.concat<any>(commitListController);
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
    .service(CommitDataService.Name,  CommitDataService.Constructor)
    .controller('CommitList',  commitListController.constructor)
    .filter('shorten', messageShortenerFilter);

