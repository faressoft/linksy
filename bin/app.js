#!/usr/bin/env node

/**
 * @autor Mohammad Fares <faressoft.com@gmail.com>
 */

import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import opn from 'opn';
import fuzzy from 'fuzzy';
import Conf from 'conf';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import { fileURLToPath } from 'url';
import { Command } from 'commander';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.join(__dirname, '..', 'template.yaml');

const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const config = new Conf({
  projectName: 'linksy',
  fileExtension: 'yaml',
  serialize: yaml.safeDump,
  deserialize: yaml.load,
});

// If links are not set in the config, initialize them
if (!config.get() || Object.keys(config.get()).length === 0) {
  fs.copyFileSync(templatePath, config.path);
}

inquirer.registerPrompt('autocomplete', inquirerPrompt);

function search(keys, input = '') {
  const fuzzyResult = fuzzy.filter(input, keys);
  return fuzzyResult.map((element) => element.original);
}

function getNestedProperty(obj, keys) {
  return keys.reduce((result, key) => (result ? result[key] : undefined), obj);
}

function showLinksList(links) {
  const keys = Object.keys(links);

  inquirer
    .prompt([
      {
        type: 'autocomplete',
        name: 'key',
        message: 'Select a link',
        pageSize: 10,
        source: (answersSoFar, input) => Promise.resolve(search(keys, input)),
      },
    ])
    .then(function (answers) {
      const value = getNestedProperty(links, answers.key.split('.'));

      // Is a list of links not an array
      if (typeof value == 'object' && !Array.isArray(value)) {
        return showLinksList(value);
      }

      // Open in browser
      [].concat(value).forEach((link) => opn(link, { wait: false }));
    });
}

// Filter the links and open the first match
function checkFilterArg(input) {
  const filteredKeys = search(Object.keys(config.get()), input);
  const links = config.get();

  if (filteredKeys.length && typeof getNestedProperty(links, filteredKeys[0].split('.')) === 'string') {
    opn(getNestedProperty(links, filteredKeys[0].split('.')), { wait: false });
    process.exit();
  }
}

const program = new Command();

program
  .name(pkg.name)
  .version(pkg.version)
  .description(pkg.description)
  .option('-c, --config', 'Open the config file in the default editor')
  .arguments('[filter]')
  .usage('[query]')
  .action((filter, options) => {
    if (options.config) {
      console.log(`Config file path: ${config.path}`);
      exec(`open "${config.path}"`);
      return;
    }

    if (filter) {
      checkFilterArg(filter);
    } else {
      showLinksList(config.get());
    }
  });

program.parse(process.argv);
