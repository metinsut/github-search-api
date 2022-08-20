import React from "react";

interface Props {
  repo: any;
}

export default function GithubRepoItem(props: Props) {
  const { repo } = props;
  return (
    <div
      className="grid bg-white border border-1 border-solid justify-between p-4 grid-flow-col rounded"
      key={repo.id}
    >
      <div className="grid gap-2 content-start">
        <div className="grid content-start gap-2 grid-flow-col justify-start">
          <img
            src={repo.owner?.avatar_url}
            alt={repo.owner?.avatar_url}
            className="w-8 h-8 object-cover"
          />
          <p>{repo.full_name}</p>
        </div>
        <p>{repo.description}</p>
      </div>
      <p>{repo.stargazers_count}</p>
    </div>
  );
}
