SHELL=/bin/bash
.DEFAULT_GOAL := help


.PHONY: start
start: 
	@docker compose up 

build:
	@docker compose build

stop:
	@docker compose down
