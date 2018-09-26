FROM takatost/docker-nginx-node-apidoc:latest

MAINTAINER JohnWang <i@takato.st>

RUN apk update && \
	apk add --no-cache yarn && \
	yarn global add apidoc-markdown-vuepress vuepress vuepress-theme-feie-api@0.2.9 && \
	apk del yarn
