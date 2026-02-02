import { config, fields, collection } from '@keystatic/core';

const repo =
    typeof process !== 'undefined' &&
    process.env?.KEYSTATIC_GITHUB_REPO_OWNER &&
    process.env?.KEYSTATIC_GITHUB_REPO_NAME
        ? {
              owner: process.env.KEYSTATIC_GITHUB_REPO_OWNER,
              name: process.env.KEYSTATIC_GITHUB_REPO_NAME,
          }
        : { owner: 'vkoven', name: 'me' };

export default config({
    storage: {
        kind: 'github',
        repo,
    },

    collections: {
        posts: collection({
            label: 'Posts',
            slugField: 'title',
            path: 'src/content/posts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                content: fields.markdoc({
                    label: 'Content',
                }),
            },
        }),
    },
});