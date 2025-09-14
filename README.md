# My "GitHub Pages" Website

This repo hosts my GitHub Pages website, started in 2025 -- you can visit the site at any one of these equivalent URLs:

- https://tommypkeane.com
- https://www.tommypkeane.com
- https://tommypkeane.github.io

## Table of Contents

<!-- MarkdownTOC -->

- [Developer Setup](#developer-setup)
    - [macOS Setup](#macos-setup)
    - [Setup of Site Hosting on `localhost` for Debugging and Development](#setup-of-site-hosting-on-localhost-for-debugging-and-development)
- [Deploying Site](#deploying-site)
    - [DNS Setup](#dns-setup)
- [Repository Directory Tree](#repository-directory-tree)
- [License and Copyright](#license-and-copyright)
    - [Images, Documents, and Artworks](#images-documents-and-artworks)
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
    - `uv`

And once `uv` is installed, make sure you have `ruff` with:

```bash
uv tool install ruff
```

and then make sure the tools are in your `PATH` with

```bash
uv tool update-shell
```

and then if you're using `bash` you can make sure your shell is updated in the current terminal session with:

```bash
source ~/.bashrc
```

<a id="setup-of-site-hosting-on-localhost-for-debugging-and-development"></a>
### Setup of Site Hosting on `localhost` for Debugging and Development

1. Make sure you have the Python Version installed:
    ```bash
    pyenv install
    ```
1. Create the local Project Environment:
    ```bash
    direnv allow
    ```
1. Confirm your Python executable is in the local `.direnv` directory:
    ```bash
    which python
    ```
1. Make sure the latest version of `pip` is installed:
    ```bash
    pip install --upgrade pip
    ```
1. Install the Python dependencies and setup the local Package with `uv`:
    ```bash
    uv sync --active
    ```

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

<a id="images-documents-and-artworks"></a>
### Images, Documents, and Artworks

Unless otherwise specified, all imagery, documents, and artwork provided in this repository were created by Tommy P. Keane, who retains all copyright per the licensing details in this repository.

<a id="references"></a>
## References

- https://docs.github.com/en/pages
- https://www.aseprite.org/ purchased and used for Pixel Art development
- https://www.sublimetext.com/ purchased and used for coding as a text editor (and lightweight IDE)
- https://www.sublimemerge.com/ purchased and used for interacting with Git as version control for this repository
