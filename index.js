"use strict";

var fs = require('fs')
  , path = require('path')
  , spacers = " _".split('')
  , special = "!?.,/$%&*#<>=".split('')
  , defaults = {
      dict: 'en',
      count: 10,
      words: 4,
      capitalize: false,
      spacer: '_',
      minwordlen: 4,
      maxwordlen: 10
    }


function load(lang){
  var file = path.join(__dirname, 'dict', lang + '.txt')
  return fs.readFileSync(file).toString().split("\n")
}


function filter(dict, minlen, maxlen){
  return dict.filter(function(word){
    return word.length >= minlen && word.length <= maxlen
  })
}


function random(items, count){
  if (count){
    var dict = []
    for (var i = 0; i < count; i++){
      dict.push(items[Math.floor(Math.random()*items.length)])
    }
    return dict
  }
  else return items[Math.floor(Math.random()*items.length)]
}


function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1)
}


function exactLength(dict, len){
  len = parseInt(len)
  if (len < 6) len = 6
  var words = []
  while (words.join(' ').length !== len){
    if (words.join(' ').length < len)
      words.push(random(dict))
    else if (words.join(' ').length > len)
      words = []
  }
  return words
}


function generate(opts){
  opts = opts || defaults
  var dict = load(opts.dict)
  dict = filter(dict, opts.minwordlen, opts.maxwordlen)
  var passlist = []
  if (opts.len)
    opts.len = parseInt(opts.len)
  for (var i = 0; i < opts.count; i++){
    if (typeof opts.len === "number")
      var words = exactLength(dict, opts.len)
    else
      var words = random(dict, opts.words)
    if (opts.capitalize)
      words = words.map(function(word){ return capitalize(word) })
    if (opts.spacer === 'random')
      opts.spacer = random(spacers)
    var pass = words.join(opts.spacer)
    passlist.push(pass)
  }
  return passlist
}


module.exports = generate
