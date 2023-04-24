# casper-node-launcher

The npm library for makes easy to run casper node for test purpose.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g casper-node-launcher
$ casper-node-launcher COMMAND
running command...
$ casper-node-launcher (--version)
casper-node-launcher/0.0.0 linux-x64 node-v16.15.1
$ casper-node-launcher --help [COMMAND]
USAGE
  $ casper-node-launcher COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`casper-node-launcher hello PERSON`](#casper-node-launcher-hello-person)
- [`casper-node-launcher hello world`](#casper-node-launcher-hello-world)
- [`casper-node-launcher help [COMMANDS]`](#casper-node-launcher-help-commands)
- [`casper-node-launcher plugins`](#casper-node-launcher-plugins)
- [`casper-node-launcher plugins:install PLUGIN...`](#casper-node-launcher-pluginsinstall-plugin)
- [`casper-node-launcher plugins:inspect PLUGIN...`](#casper-node-launcher-pluginsinspect-plugin)
- [`casper-node-launcher plugins:install PLUGIN...`](#casper-node-launcher-pluginsinstall-plugin-1)
- [`casper-node-launcher plugins:link PLUGIN`](#casper-node-launcher-pluginslink-plugin)
- [`casper-node-launcher plugins:uninstall PLUGIN...`](#casper-node-launcher-pluginsuninstall-plugin)
- [`casper-node-launcher plugins:uninstall PLUGIN...`](#casper-node-launcher-pluginsuninstall-plugin-1)
- [`casper-node-launcher plugins:uninstall PLUGIN...`](#casper-node-launcher-pluginsuninstall-plugin-2)
- [`casper-node-launcher plugins update`](#casper-node-launcher-plugins-update)

## `casper-node-launcher hello PERSON`

Say hello

```
USAGE
  $ casper-node-launcher hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/gyroflaw/casper-node-launcher/blob/v0.0.0/dist/commands/hello/index.ts)_

## `casper-node-launcher hello world`

Say hello world

```
USAGE
  $ casper-node-launcher hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ casper-node-launcher hello world
  hello world! (./src/commands/hello/world.ts)
```

## `casper-node-launcher help [COMMANDS]`

Display help for casper-node-launcher.

```
USAGE
  $ casper-node-launcher help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for casper-node-launcher.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `casper-node-launcher plugins`

List installed plugins.

```
USAGE
  $ casper-node-launcher plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ casper-node-launcher plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.4/src/commands/plugins/index.ts)_

## `casper-node-launcher plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ casper-node-launcher plugins:install PLUGIN...

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
  $ casper-node-launcher plugins add

EXAMPLES
  $ casper-node-launcher plugins:install myplugin

  $ casper-node-launcher plugins:install https://github.com/someuser/someplugin

  $ casper-node-launcher plugins:install someuser/someplugin
```

## `casper-node-launcher plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ casper-node-launcher plugins:inspect PLUGIN...

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
  $ casper-node-launcher plugins:inspect myplugin
```

## `casper-node-launcher plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ casper-node-launcher plugins:install PLUGIN...

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
  $ casper-node-launcher plugins add

EXAMPLES
  $ casper-node-launcher plugins:install myplugin

  $ casper-node-launcher plugins:install https://github.com/someuser/someplugin

  $ casper-node-launcher plugins:install someuser/someplugin
```

## `casper-node-launcher plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ casper-node-launcher plugins:link PLUGIN

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
  $ casper-node-launcher plugins:link myplugin
```

## `casper-node-launcher plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ casper-node-launcher plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ casper-node-launcher plugins unlink
  $ casper-node-launcher plugins remove
```

## `casper-node-launcher plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ casper-node-launcher plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ casper-node-launcher plugins unlink
  $ casper-node-launcher plugins remove
```

## `casper-node-launcher plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ casper-node-launcher plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ casper-node-launcher plugins unlink
  $ casper-node-launcher plugins remove
```

## `casper-node-launcher plugins update`

Update installed plugins.

```
USAGE
  $ casper-node-launcher plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

<!-- commandsstop -->
