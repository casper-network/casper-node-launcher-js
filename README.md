# casper-node-launcher-js

The npm library makes easy to run casper node for test purpose.

> Only Linux supported currently

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/casper-network/casper-node-launcher/blob/main/package.json)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/from-referrer/)

## Usage

- Install library

  ```sh
  npm install -g casper-node-launcher-js
  ```

- Run a single node (from the lastest release)

  ```sh
  casper-node-launcher-js node
  ```

## Commands

You can list available commands by running

```sh
casper-node-launcher-js help
```

To get help for specific command run `casper-node-launcher-js help node`

```sh
casper-node-launcher-js help node
```

## Troubleshoot

If you have problems with OpenSSL, you need to install OpenSSL

```sh
wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb # make sure library is compatible with your os.
sudo dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb
```
