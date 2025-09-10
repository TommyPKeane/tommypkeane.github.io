# My "GitHub Pages" Website

This repo hosts my GitHub Pages website, started in 2025 -- you can visit the site at any one of these equivalent URLs:

- https://tommypkeane.com
- https://www.tommypkeane.com
- https://tommypkeane.github.io

## Table of Contents

<!-- MarkdownTOC -->

- [Developer Setup](#developer-setup)
	- [macOS Setup](#macos-setup)
- [Deploying Site](#deploying-site)
	- [DNS Setup](#dns-setup)
- [Repository Directory Tree](#repository-directory-tree)
- [License and Copyright](#license-and-copyright)
- [References](#references)

<!-- /MarkdownTOC -->

<a id="developer-setup"></a>
## Developer Setup

These subsections are for anyone wanting to understand the tools and development setup used in creating and updating this repository.

<a id="macos-setup"></a>
### macOS Setup

Setup and Install the following tools per https://github.com/TommyPKeane/example-bash-configuration:

- `brew`
- `direnv`
- `git`
- `git-lfs`

<a id="deploying-site"></a>
## Deploying Site

See the `.github/workflows/static.yml` which configures a customized GitHub Action per the official GitHub documentation.

<a id="dns-setup"></a>
### DNS Setup

See official instructions at: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

Overall configuration that I used -- note you will use mostly the same values except, of course, swapping your own `[username].github.io` URL for your GitHub Pages, and you (and I) may have other DNS records for various reasons through your DNS provider:

| Record Type   | Record Name   | Record Value              | TTL             |
| ------------- | ------------- | ------------------------- | --------------- |
| `A`           | `@`           | `185.199.108.153`         | `600 [sec]`     |
| `A`           | `@`           | `185.199.109.153`         | `600 [sec]`     |
| `A`           | `@`           | `185.199.110.153`         | `600 [sec]`     |
| `A`           | `@`           | `185.199.111.153`         | `600 [sec]`     |
| `AAAA`        | `@`           | `2606:50c0:8000::153`     | `600 [sec]`     |
| `AAAA`        | `@`           | `2606:50c0:8001::153`     | `600 [sec]`     |
| `AAAA`        | `@`           | `2606:50c0:8002::153`     | `600 [sec]`     |
| `AAAA`        | `@`           | `2606:50c0:8003::153`     | `600 [sec]`     |
| `CNAME`       | `www`         | `tommypkeane.github.io`   | `3,600 [sec]`   |
| `HTTPS`       | `@`           | `tommypkeane.github.io`   | `3,600 [sec]`   |

And then you'll also need the following `CAA` Records to get HTTPS functionality via GitHub provided Certificate from `letsencrypt.org`:

| Record Type   | Record Name   | TTL             | Flag | Tag      | Domain             |
| ------------- | ------------- | --------------- | ---- | -------- | ------------------ |
| `CAA`         | `@`           | `600 [sec]`     | `0`  | `issue`  | `letsencrypt.org`  |

If you went to the `Settings` menu for your GitHub repo and went to the `Pages` sidebar menu, and you already put in the `Custom Domain` entry before updating the DNS records as listed above, then you will need to remove the domain, and add it again.

After you press `Save`, then it will take like 20-ish minutes for GitHub to generate and provision an HTTPS Certificate for your site, so while your DNS records may get set and propagated relatively quickly, it could take noticeably longer until the HTTPS Certificate is generated.

> ⚠️ Note that you will want to make sure to ___not___ navigate away from the page until all 3 steps of the Certificate deploy are completed, otherwise it might interrupt background services and cause the certificate to fail to be configured.

Note also that you will have to have a `CNAME` file saved into your repository (like you'll see in this repo), and it needs to have the same value as you've put into the `Custom Domain` field in the GitHub `Pages` section under your repository `Settings`.

<a id="repository-directory-tree"></a>
## Repository Directory Tree

- `.github/`
	- `workflows/`
	- `CONTRIBUTING`
- `site/`
	- `index.css`
	- `index.html`
	- `index.js`
- `.envrc`
- `.gitignore`
- `LICENSE`
- `README.md`

<a id="license-and-copyright"></a>
## License and Copyright

See the `LICENSE` file.

<a id="references"></a>
## References

- https://docs.github.com/en/pages
- ...