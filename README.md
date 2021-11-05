# linkerr-cli

> Parse href, image paths, scripts paths and links from site.

## Install

```sh
npm install linkerr-cli -g
```

## Usage

```
npx linkerr -u https://github.com
```

```
$ linkerr --help

  Usage:
    $ linkerr [options]

  Options:
    --url,    -u  <url>   target url
    --output, -o  <path>  output path
    --name,   -n  <name>  output file name

  Examples:
    $ linkerr -u https://github.com -o logs -n log_github
```

## Related

- [linkerr](https://github.com/crashmax-dev/linkerr) - API for this module