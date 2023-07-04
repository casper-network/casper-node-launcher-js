# casper-node-launcher-js

The npm library for makes easy to run casper node for test purpose.

> Only Linux supported currently

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/gyroflaw/casper-node-launcher/blob/main/package.json)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/from-referrer/)

<!-- toc -->
* [casper-node-launcher-js](#casper-node-launcher-js)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g casper-node-launcher-js
$ casper-node-launcher-js COMMAND
running command...
$ casper-node-launcher-js (--version)
casper-node-launcher-js/1.0.0 linux-x64 node-v16.15.1
$ casper-node-launcher-js --help [COMMAND]
USAGE
  $ casper-node-launcher-js COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`casper-node-launcher-js help [COMMANDS]`](#casper-node-launcher-js-help-commands)
* [`casper-node-launcher-js plugins`](#casper-node-launcher-js-plugins)
* [`casper-node-launcher-js plugins:install PLUGIN...`](#casper-node-launcher-js-pluginsinstall-plugin)
* [`casper-node-launcher-js plugins:inspect PLUGIN...`](#casper-node-launcher-js-pluginsinspect-plugin)
* [`casper-node-launcher-js plugins:install PLUGIN...`](#casper-node-launcher-js-pluginsinstall-plugin-1)
* [`casper-node-launcher-js plugins:link PLUGIN`](#casper-node-launcher-js-pluginslink-plugin)
* [`casper-node-launcher-js plugins:uninstall PLUGIN...`](#casper-node-launcher-js-pluginsuninstall-plugin)
* [`casper-node-launcher-js plugins:uninstall PLUGIN...`](#casper-node-launcher-js-pluginsuninstall-plugin-1)
* [`casper-node-launcher-js plugins:uninstall PLUGIN...`](#casper-node-launcher-js-pluginsuninstall-plugin-2)
* [`casper-node-launcher-js plugins update`](#casper-node-launcher-js-plugins-update)

## `casper-node-launcher-js help [COMMANDS]`

Display help for casper-node-launcher-js.

```
USAGE
  $ casper-node-launcher-js help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for casper-node-launcher-js.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.10/src/commands/help.ts)_

## `casper-node-launcher-js plugins`

List installed plugins.

```
USAGE
  $ casper-node-launcher-js plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ casper-node-launcher-js plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `casper-node-launcher-js plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ casper-node-launcher-js plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ casper-node-launcher-js plugins add

EXAMPLES
  $ casper-node-launcher-js plugins:install myplugin 

  $ casper-node-launcher-js plugins:install https://github.com/someuser/someplugin

  $ casper-node-launcher-js plugins:install someuser/someplugin
```

## `casper-node-launcher-js plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ casper-node-launcher-js plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ casper-node-launcher-js plugins:inspect myplugin
```

## `casper-node-launcher-js plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ casper-node-launcher-js plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ casper-node-launcher-js plugins add

EXAMPLES
  $ casper-node-launcher-js plugins:install myplugin 

  $ casper-node-launcher-js plugins:install https://github.com/someuser/someplugin

  $ casper-node-launcher-js plugins:install someuser/someplugin
```

## `casper-node-launcher-js plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ casper-node-launcher-js plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ casper-node-launcher-js plugins:link myplugin
```

## `casper-node-launcher-js plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ casper-node-launcher-js plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ casper-node-launcher-js plugins unlink
  $ casper-node-launcher-js plugins remove
```

## `casper-node-launcher-js plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ casper-node-launcher-js plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ casper-node-launcher-js plugins unlink
  $ casper-node-launcher-js plugins remove
```

## `casper-node-launcher-js plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ casper-node-launcher-js plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ casper-node-launcher-js plugins unlink
  $ casper-node-launcher-js plugins remove
```

## `casper-node-launcher-js plugins update`

Update installed plugins.

```
USAGE
  $ casper-node-launcher-js plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
