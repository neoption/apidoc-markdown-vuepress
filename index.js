#!/usr/bin/env node

"use strict";

var fs = require('fs'),
	path = require('path'),
	ejs = require('ejs'),
	_ = require('underscore');

var argv = require('optimist')
	.usage('Generate documentation from apidoc data.\nUsage: apidoc-markdown -p [path] -o [output path]')
	.demand(['path', 'output'])
	.alias({
		'path': 'p',
		'output': 'o',
		'template': 't'
	})
	.describe({
		'path': 'Path to generated apidoc output. Where api_data.json & api_project.json resides.',
		'output': 'Output path to write.',
		'template': 'Path to EJS template file, if not specified default template will be used.',
		'prepend': 'Prepend file after TOC.'
	}).argv;

ejs.filters.undef = function (obj) {
	return obj ? obj : '';
};

ejs.filters.mlink = function (obj) {
	return (obj || '').toLowerCase().replace(/\s/g, '-');
};

var sync = function (dirname) {
    if(fs.existsSync(dirname)){
        return true;
    }else{
        if(sync(path.dirname(dirname))){
            fs.mkdirSync(dirname);
            return true;
        }
    }
};

var defTmplFile = argv.template ? (argv.template + '/default.md') : (__dirname + '/templates/default.md'),
	apiDataTmplFile = argv.template ? (argv.template + '/api_data.md') : (__dirname + '/templates/api_data.md'),
	apiData = JSON.parse(fs.readFileSync(argv.path + '/api_data.json')),
	projData = JSON.parse(fs.readFileSync(argv.path + '/api_project.json')),
	defTemplate = ejs.compile(fs.readFileSync(defTmplFile).toString()),
	apiDataTemplate = ejs.compile(fs.readFileSync(apiDataTmplFile).toString());

apiData = _.filter(apiData, function (entry) {
	// 仅返回 type 不为空的 API 数据，type 为 http method.
	return entry.type;
});

var apiByGroup = _.groupBy(apiData, function (entry) {
	// 分组所有 group，即获取所有模块分组: 对应对应所有模块下 API 内容.
	return entry.group;
});

var apiByGroupAndName = {},
	apiObjects = {};
Object.keys(apiByGroup).forEach(function (key) {

	if (key == '_object') {
		Object.keys(apiByGroup[key]).forEach(function (objKey) {
			apiObjects[apiByGroup[key][objKey].title] = apiByGroup[key][objKey];
		});
	} else {
		// 模块下根据 API 名称再次分组，API 名称: API 内容
		apiByGroupAndName[key] = _.sortBy(apiByGroup[key], function (entry) {
			return entry.title;
		});
	}
});

sync(argv.output);

var data = {
	project: projData,
	data: apiByGroupAndName
};

data.prepend = argv.prepend ? fs.readFileSync(argv.prepend).toString() : null;
fs.writeFileSync(argv.output + '/README.md', defTemplate(data));

Object.keys(apiByGroupAndName).forEach(function (group) {
	fs.writeFileSync(argv.output + '/' + group + '.md', apiDataTemplate({
		group: group,
		data: apiByGroupAndName,
		object: apiObjects[group]
	}));
});

console.log('Wrote apidoc-markdown template output to: ' + argv.output);