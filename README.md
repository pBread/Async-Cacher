# Async Cacher

Simple, zero-dependency utility for caching async functions.

## Contents

- [Features](#features)
- [Install](#install)
- [Examples](#examples)

## Features

- [x] Easily cache async functions
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
  cacher = createAsyncCacher(); // initialize new cache for this instance

  async getRepos(user: string) {
    return this.cacher<Repo[]>(
      fetch,
      `https://api.github.com/users/${user}/repos`
    );
  }

  async getRepoCount(user: string) {
    const repos = await this.getRepos();
    return repos.length;
  }
}

const api = new GithubApi();

await api.getRepos(); // fetches repos
await api.getRepoCount(); // no fetching
```
