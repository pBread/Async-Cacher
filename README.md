# Async Cacher

Simple, zero-dependency utility for caching async functions.

## Examples

```js
import asyncCacher from "@breadman/async-cacher";

async function getRepos(user) {
  return fetch(`https://api.github.com/orgs/${user}/repos`);
}

async function main() {
  const a = asyncCacher(getRepos, "pBread"); // calls api
  const b = asyncCacher(getRepos, "pBread"); // returns previous call

  a === b; // true
}
```
