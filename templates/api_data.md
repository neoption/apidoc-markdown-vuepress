---
title: <%= group %>
---
<Block>
# <%= group %>

<% if (object && object.description) { -%>
<%- object.description -%>
<% } //if success.fields -%>
</Block>

<% if (object && object.success && object.success.fields) { -%>
<Block>
<% Object.keys(object.success.fields).forEach(function(g) { -%>
## <%= object.url %> 对象

| 字段    | 描述                           |
|---------:|:--------------------------------------|
<% object.success.fields[g].forEach(function (param) { -%>
| <%- param.field %><br>`<%- param.type %>` | <%- param.description.replace(/^<p>(.*)<\/p>$/, '$1') -%>
<% if (param.defaultValue) { -%>
<br>默认: <%- param.defaultValue %><% } -%>
<% if (param.size) { -%>
<br>范围: <%- param.size -%><% } -%>
<% if (param.allowedValues) { -%>
<br>可选值: <% param.allowedValues.forEach(function(value, key) { %><%= value.replace('-', ' ') + (key != param.allowedValues.length - 1 ? ',' : '') %> <% }); %><% } %>|
<% }); //forech (group) parameter -%>
<% }); //forech field -%>

<Example>
<% if (object.success.examples && object.success.examples.length) { -%>

<% object.success.examples.forEach(function (example) { -%>
<%= example.title %>

``` json
<%- example.content %>
```
<% }); //foreach success example -%>
<% } //if examples -%>
</Example>
</Block>
<% } //if success.fields -%>

<% Object.keys(data[group]).forEach(function (sub) { -%>

<Block>
## <%= data[group][sub].title.replace(/^\d*\.(.*)$/, '$1') %>

<%-: data[group][sub].description | undef %>

```
<%-: data[group][sub].type | upcase %> <%= data[group][sub].url %>
```

<% if (data[group][sub].header && data[group][sub].header.fields.Header.length) { -%>
### Headers

| 字段    | 描述                          |
|---------:|:--------------------------------------|
<% data[group][sub].header.fields.Header.forEach(function (header) { -%>
| <%- header.field %><br>`<%- header.type %>` <%- header.optional ? '<span class="required">`选填`</span>' : '' %>| <%- header.description %>							|
<% }); //forech parameter -%>
<% } //if parameters -%>

<% if (data[group][sub].header && data[group][sub].header.examples && data[group][sub].header.examples.length) { -%>

### Header 示例

<% data[group][sub].header.examples.forEach(function (example) { -%>
<%= example.title %>

```
<%- example.content %>
```
<% }); //foreach example -%>
<% } //if example -%>

<% if (data[group][sub].parameter) { -%>

<% Object.keys(data[group][sub].parameter.fields).forEach(function(g) { -%>

### <%- g=='Parameter' ? '请求参数' : g %>

| 字段    | 描述                          |
|---------:|:--------------------------------------|
<% data[group][sub].parameter.fields[g].forEach(function (param) { -%>
| <%- param.field %><br>`<%- param.type %>` | <%- param.optional ? '<span class="required">`选填`</span>' : '' %> <%- param.description.replace(/^<p>(.*)<\/p>$/, '$1') -%>
<% if (param.defaultValue) { -%>
<br>默认: <%= param.defaultValue %><% } -%>
<% if (param.size) { -%>
<br>范围: <%- param.size %><% } -%>
<% if (param.allowedValues) { -%>
<br>可选值: <% param.allowedValues.forEach(function(value, key) { %><%= value.replace('-', ' ') + (key != param.allowedValues.length - 1 ? ',' : '') %> <% }); %><% } %>|
<% }); //forech (group) parameter -%>
<% }); //forech param parameter -%>
<% } //if parameters -%>

<% if (data[group][sub].error && data[group][sub].error.fields) { -%>
### 业务错误码

<% Object.keys(data[group][sub].error.fields).forEach(function(g) { -%>

状态码：<%= g %>

| 错误码     | 描述                           |
|---------:|:--------------------------------------|
<% data[group][sub].error.fields[g].forEach(function (param) { -%>
| <%- param.field %> | <%- param.description.replace(/^<p>(.*)<\/p>$/, '$1') -%>
<% }); //forech (group) parameter -%>
<% }); //forech field -%>
<% } //if error.fields -%>

<Example>
<% if (data[group][sub].examples && data[group][sub].examples.length) { -%>

请求示例

<% data[group][sub].examples.forEach(function (example) { -%>
<%= example.title %>

```
<%- example.content %>
```
<% }); //foreach example -%>
<% } //if example -%>

<% if (data[group][sub].success && data[group][sub].success.examples && data[group][sub].success.examples.length) { -%>

<% data[group][sub].success.examples.forEach(function (example) { -%>
<%= example.title %>

``` json
<%- example.content %>
```
<% }); //foreach success example -%>
<% } //if examples -%>
<% if (data[group][sub].error && data[group][sub].error.examples && data[group][sub].error.examples.length) { -%>

异常示例

<% data[group][sub].error.examples.forEach(function (example) { -%>
<%= example.title %>

```
<%- example.content %>
```
<% }); //foreach error example -%>
<% } //if examples -%>
</Example>

</Block>
<% }); //foreach sub  -%>