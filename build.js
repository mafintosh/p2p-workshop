#!/usr/bin/env node

var fs = require('fs')
var marked = require('marked')
var path = require('path')
var rimraf = require('rimraf')

var css = fs.readFileSync(path.join(__dirname, 'github-markdown.css'), 'utf-8')
var base = path.join(__dirname, 'problems')

rimraf.sync(path.join(__dirname, 'build'))
fs.readdirSync(base).forEach(function (name) {
  var input = path.join(base, name)
  var output = path.join(__dirname, 'build', name.replace('.md', '.html'))
  var html = marked(fs.readFileSync(input, 'utf-8'))
  var file = '<html><head><title>Problem ' +
    name.replace('.md', '') +
    '</title><style>\nbody { padding: 40px; }\n' +
    css +
    '</style></head><body class="markdown-body">' +
    html +
    '</body></html>'

  try {
    fs.mkdirSync(path.join(__dirname, 'build'))
  } catch (err) {
    // do nothing
  }

  fs.writeFileSync(output, file)
})
