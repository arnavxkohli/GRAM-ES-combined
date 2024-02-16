all: clean install
	@echo "Running yarn dev..."
	@yarn run dev

clean:
	@echo "Cleaning..."
	@rm -rf .next
	@rm -rf node_modules

install:
	@echo "Installing dependencies..."
	@yarn install
	@yarn add next

.PHONY: clean install dev