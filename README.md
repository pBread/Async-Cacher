# Async Cacher

Simple, zero-dependency utility for caching async functions.

## Contents

- [Features](#features)
- [Install](#install)
- [Examples](#examples)

## Features

- [x] Auto-cache async functions by arguments
- [x] Memory safe, weak-caching
- [x] Typescript support

## Install

```bash
yarn add @breadman/async-cacher
```

## Examples

```ts
import createAsyncCacher from "@breadman/async-cacher";
import fetch from "isomorphic-fetch";

interface Repo {
  id: number;
  name: string;
}

class GithubApi {
  cacher = createAsyncCacher(); // initialize new cache per instance

  async getRepos(user: string) {
    return fetch(`https://api.github.com/users/${user}/repos`).then((res) =>
      res.json()
    );
  }

  async getRepoCount(user: string): Promise<number> {
    const repos = await this.cacher<Repo[]>(this.getRepos, user);
    return repos.length;
  }

  async getRepoNames(user: string): Promise<string[]> {
    const repos = await this.cacher<Repo[]>(this.getRepos, user);
    return repos.map((repo) => repo.name);
  }
}

const api = new GithubApi();

await api.getRepoNames("pBread"); // fetches repos & returns array of names
await api.getRepoCount("pBread"); // retrieves cached repos & returns count
await api.getRepoCount("markerikson"); // fetches repos
```
