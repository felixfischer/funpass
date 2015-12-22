#!/usr/bin/env node

"use strict";


var funpass = require('./index')
  , program = require('commander')

var def = require('./config').default

program
  .version(require('./package').version)
  .option('-d, --dict [dict]', 'Use specified dictionary [dict]', def.dict)
  .option('-c, --count [number]', 'Generate so many passwords', def.count)
  .option('-w, --words [number]', 'Number of words to concatenate', def.words)
  .option('-i, --minwordlen [number]', 'Minimum word length', def.minwordlen)
  .option('-x, --maxwordlen [number]', 'Maximum word length', def.maxwordlen)
  .option('-s, --spacer [char]', 'Separator string', def.spacer)
  .option('-l, --len [number]', 'Create passwords of this exact length')
  .option('-C, --capitalize', 'Capitalize words')
  .option('-v, --verbose', 'Be more verbose')
  .parse(process.argv)


console.log(funpass(program).join("\n"))
