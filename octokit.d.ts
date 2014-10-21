declare module Octokit {
    interface Meta {
        "X-RateLimit-Limit": string;
        "X-RateLimit-Remaining": string;
        "X-RateLimit-Reset": string;
        "X-OAuth-Scopes": string;
        "X-Accepted-OAuth-Scopes": string;
        "Cache-Control": string;
        "Vary": string;
        "ETag": string;
        "X-GitHub-Media-Type": string;
        "Link": any[];
        status: number;
    }

    interface IssueEventQuery {
        meta: Meta;
        data: IssueEvent[];
    }

    interface IssueQuery {
        meta: Meta;
        data: Issue[];
    }

    interface CommitQuery {
        meta: Meta;
        data: Commit[];
    }

    interface Label {
        url: string;
        name: string;
        color: string;
    }

    interface AuthorTime {
        name: string;
        email: string;
        date: string;
    }

    interface User {
        login: string;
        id: number;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    }

    interface Milestone {
        url: string;
        labels_url: string;
        id: number;
        number: number;
        title: string;
        description: string;
        creator: User;
        open_issues: number;
        closed_issues: number;
        state: string;
        created_at: string;
        updated_at: string;
        due_on: string;
    }

    interface Issue {
        url: string;
        labels_url: string;
        comments_url: string;
        events_url: string;
        html_url: string;
        id: number;
        number: number;
        title: string;
        user: User;
        labels: Label[];
        state: string;
        assignee: User;
        milestone: Milestone;
        comments: number;
        created_at: string;
        updated_at: string;
        closed_at: string;
        body: string;
        pull_request?: {
            url: string;
            html_url: string;
            diff_url: string;
            patch_url: string;
        }
    }

    interface IssueEvent {
        id: number;
        url: string;
        actor: User;
        event: string;
        commit_id: string;
        created_at: string;
        issue: Issue;
    }

    interface Commit {
        commit: {
            author: AuthorTime;
            commiter: AuthorTime;
            message: string;
        }
        html_url: string;
        author: User;
        commiter: User;
    }
}
