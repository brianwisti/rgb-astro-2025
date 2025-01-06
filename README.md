# Random Geekery Blog in Astro for 2025

an iteration of the [Random Geekery][rgb] blog built with [Astro][astro]

[rgb]: https://randomgeekery.org
[astro]: https://astro.build

## Integrations

- [astro-expressive-code][a-ec] for very fancy syntax highlighting from [Expressive Code][ec]
- [@astrojs/mdx][a-mdx] for components in Markdown documents and someday maybe proper [MDX][mdx] fanciness
- [astro-mdx-directive][a-mdx-d] to let Astro components handle (nearly) vanilla Markdown syntax, mostly for asides
- [@astrojs/sitemap][a-sitemap] to make the search engines happier
- [@astrojs/markdoc][a-mdoc] for a few posts with sufficiently complex raw HTML to confuse MDX

[a-ec]: https://github.com/expressive-code/expressive-code/blob/main/packages/astro-expressive-code/README.md
[ec]: https://expressive-code.com
[a-mdx]: https://docs.astro.build/en/guides/integrations-guide/mdx/
[mdx]: https://mdxjs.com
[a-mdx-d]: https://github.com/tetracalibers/astro-mdx-directive
[a-sitemap]: https://docs.astro.build/en/guides/integrations-guide/sitemap/
[a-mdoc]: https://docs.astro.build/en/guides/integrations-guide/markdoc/ 

## Non-integration Astro extensions

- [@astrojs/rss][a-rss] to make old bloggers happier by generating an RSS feed
- [astro-breadcrumbs][a-bc] for those nice links back to the top of my site

[a-bc]: https://docs.astro-breadcrumbs.kasimir.dev
[a-rss]: https://docs.astro.build/en/recipes/rss/

## Markdown extensions

To cover what astro-mdx-directive can't.

- [remark-definition-list][rmd] to support Markdown definition list syntax
- [remark-smarty-pants][rsp] for some common typographical niceties like em-dash

[rmd]: https://www.npmjs.com/package/remark-definition-list
[rsp]: https://www.npmjs.com/package/remark-smartypants

## Quality Checks

Got some stuff in there to ensure consistent formatting and valid links.
Honestly "valid links" is a work in progress.
But at least I'll know if I any of my newer links start to rot!

- [vitest][vitest] runs the tests and provides the assertions
- [markdownlint][mdl] ensures my Markdown looks consistent with [my Markdownlint config][mdl-yml]

[vitest]: https://vitest.dev
[mdl]: https://github.com/markdownlint/markdownlint
[mdl-yml]: ./.markdownlint.yml
