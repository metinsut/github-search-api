import React from 'react';
import GithubRepoItemList from './components/GithubRepoItemList';
import SearchComponent from './components/SearchComponent';

function App() {
  return (
    <main className="grid gap-4 p-6">
      <SearchComponent></SearchComponent>
      <GithubRepoItemList />
    </main>
  );
}

export default App;
