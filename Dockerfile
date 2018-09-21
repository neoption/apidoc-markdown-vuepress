FROM takatost/docker-nginx-node-apidoc:latest

MAINTAINER JohnWang <wangjiajun@vchangyi.com>

RUN apk add yarn && \
	yarn global add apidoc-markdown-vuepress