const core = require('@actions/core');
const github = require('@actions/github');

try {
  const token = process.env["GITHUB_TOKEN"] || core.getInput("token");
  const octokit = new github.getOctokit(token);
  const githubContext = github.context;

  const pullRequestNumber = core.getInput('pull-request-number') || githubContext.payload.pull_request.number;
  const reviewers = core.getInput('reviewers').split(" ");
  const reviewersTeam = core.getInput('team-reviewers').split(" ");

  if reviewers {
    console.log(`Request review from ${reviewers}`);
  }
  if reviewersTeam {
    console.log(`Request review from ${reviewersTeam}`);
  }

  octokit.pulls.requestReviewers({
    ...githubContext.repo,
    pull_number: pullRequestNumber,
    reviewers: reviewers,
    team-reviewers: reviewersTeam,
  });
} catch (error) {
  core.setFailed(error.message);
}
