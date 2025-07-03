# My "GitHub Pages" Website

This repo hosts my GitHub Pages website, started in 2025.

## Developer Setup

...

## Deploying Site

See the `.github/workflows/static.yml` which configures a customized GitHub Action per the official GitHub documentation.

### DNS Setup

See official instructions at: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

Overall configuration that I used

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
| `HTTPS`       | `@`           | `tommypkeane.github.io.`  | `3,600 [sec]`   |

`CAA` Records to get HTTPS functionality via GitHub provided Certificate from `letsencrypt.org`:

| Record Type   | Record Name   | TTL             | Flag | Tag      | Domain             |
| ------------- | ------------- | --------------- | ---- | -------- | ------------------ |
| `CAA`         | `@`           | `600 [sec]`     | `0`  | `issue`  | `letsencrypt.org`  |

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

## License and Copyright

See the `LICENSE` file.

## References

- https://docs.github.com/en/pages
- ...