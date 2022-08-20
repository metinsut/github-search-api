import React, { useEffect } from 'react';
import {
  getGithubRepoBySearchParam,
  pageUpdated,
  selectIsLoading,
  selectPage,
  selectRepos,
  selectSearchParams,
  selectTotalCount
} from '../store/Slice/appSlice';
import { useTypedDispatch, useTypedSelector } from '../store/store';
import GithubRepoItem from './GithubRepoItem';

export default function GithubRepoItemList() {
  const dispatch = useTypedDispatch();
  const searchParams = useTypedSelector(selectSearchParams);
  const githubRepos = useTypedSelector(selectRepos);
  const totalCount = useTypedSelector(selectTotalCount);
  const loading = useTypedSelector(selectIsLoading);
  const page = useTypedSelector(selectPage);

  useEffect(() => {
    dispatch(getGithubRepoBySearchParam());
  }, [searchParams, page]);

  const handleLoadMore = () => {
    dispatch(pageUpdated());
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {loading ? (
        <p className="grid col-span-full justify-self-center">Loading...</p>
      ) : githubRepos.length === 0 ? (
        <p className="grid col-span-full justify-self-center">Nothing Found</p>
      ) : (
        githubRepos.map((repo) => {
          return <GithubRepoItem repo={repo} key={repo.id} />;
        })
      )}
      {githubRepos.length > 0 && (
        <div className="grid grid-flow-col gap-2 col-span-full items-center justify-center mt-8">
          <p>
            {githubRepos.length} of {totalCount}
          </p>
          <button className=" bg-violet-500 text-white px-2 py-1 rounded" onClick={handleLoadMore}>
            Load more
          </button>
        </div>
      )}
    </section>
  );
}
