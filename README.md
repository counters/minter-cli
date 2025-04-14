# minter-cli
Command-line tool for Minter Blockchain

```bash
$ minter-cli -h
Usage: minter-cli [options] [command]

Options:
  -h, --help      Display help for command

Commands:
  version         Show app version
  api             Api v2 for Minter Node
  wallet          Wallet utility functions
  help [command]  display help for command
```

## Features

- Auto-conversion from PIP to BIP
- [JMESPath](https://jmespath.org) support for advanced filtering
- Human-readable and raw output formats
- Mimics the official HTTP API structure
- Cross-platform

## Install

Requires **Node.js ≥ 20**

```bash
npm i -g minter-cli
```

Create a config.yml file in the application directory with the [contents below](#yaml-config)

## Run Without Installation

```bash
npx minter-cli
```

## Basic Usage

```bash
minter-cli api candidate Mp12345bf7d1c833701ea490c2e77430486922a9fbef713b933cc3b32700f27777
```

## Usage in Bash Scripts

```bash
status=$(minter-cli api candidate Mp12345bf7d1c833701ea490c2e77430486922a9fbef713b933cc3b32700f27777 --patch status --pretty false)
echo $status
```

## JMESPath Support

```bash
minter-cli api candidate Mp12345bf7d1c833701ea490c2e77430486922a9fbef713b933cc3b32700f27777 --not_show_stakes false --patch "stakesList[?owner == 'Mx0903ab168597a7c86ad0d4b72424b3632be0af1b']"
```

## YAML Config 

By default, the tool looks for `config.yml` in the working directory. Use `--config` to specify a custom path. [Full config example](example.yml)

```yaml
minter:
  urlapi: 'http://localhost:8843/v2' # https://api-minter.mnst.club/v2
wallet:
  seed_phrase: one two 000 .... # this SECRET !!!
```


## @TODO (Maybe..)

- Install a test, local or master node
- Launching open source applications (example: wallets)
- Support for modules from other developers
