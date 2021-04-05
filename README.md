# Async Cacher

Simple, zero-dependency utility for caching async functions.

## Contents

- [Features](#features)
- [Install](#install)
- [Examples](#examples)

## Features

- [x] Memory safe weak-caching
- [x] Typescript support

## Install

```bash
yarn add @breadman/async-cacher
```

## Examples

```js
import asyncCacher from "@breadman/async-cacher";

async function getRepos(user) {
  return fetch(`https://api.github.com/users/${user}/repos`);
}

async function main() {
  const a = await asyncCacher(getRepos, "pBread"); // calls api
  const b = await asyncCacher(getRepos, "pBread"); // returns previous call

  a === b; // true
}
```

```ts
import { createAsyncCacher } from "@breadman/async-cacher";
import fetch from "isomorphic-fetch";

interface Repo {
  id: number;
  name: string;
}

class GithubApi {
  cacher = createAsyncCacher();

  constructor(public user: string) {}

  async getRepos() {
    return this.cacher<Repo[]>(
      fetch,
      `https://api.github.com/users/${this.user}/repos`
    );
  }

  async getRepoCount() {
    const repos = await this.getRepos(); // getRepos is cached thus no
    return repos.length;
  }
}
```
