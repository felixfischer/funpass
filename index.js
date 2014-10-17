"use strict";

var fs = require('fs')
  , path = require('path')

  , dict = fs.readFileSync('dict.txt').toString().split("\r\n")
  , special = "!?.,/$%&+*#-_<>".split('')
  , maxlen = 10
  , minlen = 6


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


function generate(count){
  count = count || 1
  var passlist = []
  for (var i = 0; i < count; i++){
    var data = random(dict, 2)
    var pass = capitalize(data[0]) + random(special) + capitalize(data[1])
    passlist.push(pass)
  }
  return passlist
}


function main(){
  dict = filter(dict, minlen, maxlen)
  var passlist = generate(10)
  console.log(passlist.join("\n"))
}


if (require.main === module) {
  main()
}
