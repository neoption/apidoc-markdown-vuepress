# apidoc-markdown-vuepress

Generate API documentation in vuepress markdown from [apidoc](https://github.com/apidoc/apidoc) data.

Transplant from https://github.com/martinj/node-apidoc-markdown

## Installation

	npm install apidoc-markdown-vuepress

## Usage

	Usage: apidoc-markdown-vuepress -p [input path] -o [output path]

	Options:
	  --path, -p      Path to generated apidoc output. Where api_data.json & api_project.json resides.  [required]
	  --output, -o    Output path to write.                                                             [required]
	  --template, -t  Path to EJS template file, if not specified default template will be used.
	  --prepend       Prepend file after TOC.