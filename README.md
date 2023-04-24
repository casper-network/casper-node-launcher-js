oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g casper-node-manage
$ casper-node-manage COMMAND
running command...
$ casper-node-manage (--version)
casper-node-manage/0.0.0 linux-x64 node-v16.15.1
$ casper-node-manage --help [COMMAND]
USAGE
  $ casper-node-manage COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`casper-node-manage hello PERSON`](#casper-node-manage-hello-person)
* [`casper-node-manage hello world`](#casper-node-manage-hello-world)
* [`casper-node-manage help [COMMANDS]`](#casper-node-manage-help-commands)
* [`casper-node-manage plugins`](#casper-node-manage-plugins)
* [`casper-node-manage plugins:install PLUGIN...`](#casper-node-manage-pluginsinstall-plugin)
* [`casper-node-manage plugins:inspect PLUGIN...`](#casper-node-manage-pluginsinspect-plugin)
* [`casper-node-manage plugins:install PLUGIN...`](#casper-node-manage-pluginsinstall-plugin-1)
* [`casper-node-manage plugins:link PLUGIN`](#casper-node-manage-pluginslink-plugin)
* [`casper-node-manage plugins:uninstall PLUGIN...`](#casper-node-manage-pluginsuninstall-plugin)
* [`casper-node-manage plugins:uninstall PLUGIN...`](#casper-node-manage-pluginsuninstall-plugin-1)
* [`casper-node-manage plugins:uninstall PLUGIN...`](#casper-node-manage-pluginsuninstall-plugin-2)
* [`casper-node-manage plugins update`](#casper-node-manage-plugins-update)

## `casper-node-manage hello PERSON`

Say hello

```
USAGE
  $ casper-node-manage hello PERSON -f <value>

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

_See code: [dist/commands/hello/index.ts](https://github.com/gyroflaw/casper-node-manage/blob/v0.0.0/dist/commands/hello/index.ts)_

## `casper-node-manage hello world`

Say hello world

```
USAGE
  $ casper-node-manage hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ casper-node-manage hello world
  hello world! (./src/commands/hello/world.ts)
```

## `casper-node-manage help [COMMANDS]`

Display help for casper-node-manage.

```
USAGE
  $ casper-node-manage help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for casper-node-manage.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `casper-node-manage plugins`

List installed plugins.

```
USAGE
  $ casper-node-manage plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ casper-node-manage plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.4/src/commands/plugins/index.ts)_

## `casper-node-manage plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ casper-node-manage plugins:install PLUGIN...

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
  $ casper-node-manage plugins add

EXAMPLES
  $ casper-node-manage plugins:install myplugin 

  $ casper-node-manage plugins:install https://github.com/someuser/someplugin

  $ casper-node-manage plugins:install someuser/someplugin
```

## `casper-node-manage plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ casper-node-manage plugins:inspect PLUGIN...

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
  $ casper-node-manage plugins:inspect myplugin
```

## `casper-node-manage plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ casper-node-manage plugins:install PLUGIN...

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
  $ casper-node-manage plugins add

EXAMPLES
  $ casper-node-manage plugins:install myplugin 

  $ casper-node-manage plugins:install https://github.com/someuser/someplugin

  $ casper-node-manage plugins:install someuser/someplugin
```

## `casper-node-manage plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ casper-node-manage plugins:link PLUGIN

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
  $ casper-node-manage plugins:link myplugin
```

## `casper-node-manage plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ casper-node-manage plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ casper-node-manage plugins unlink
  $ casper-node-manage plugins remove
```

## `casper-node-manage plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ casper-node-manage plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ casper-node-manage plugins unlink
  $ casper-node-manage plugins remove
```

## `casper-node-manage plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ casper-node-manage plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ casper-node-manage plugins unlink
  $ casper-node-manage plugins remove
```

## `casper-node-manage plugins update`

Update installed plugins.

```
USAGE
  $ casper-node-manage plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
