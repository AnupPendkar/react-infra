NODE_VERSION = 14
CONFIG_LOC = public/assets/config.json

.PHONY: install build start test lint clean

serve:
	@read -p "Enter the PORT to serve(Default is 3000): " port; \
	. ~/.nvm/nvm.sh && nvm use $(NODE_VERSION) && PORT=$${port:-3000} npm start

install:
	. ~/.nvm/nvm.sh && nvm use $(NODE_VERSION) && npm install

# build:
# 	@read -p "Enter the build host: " HOST; \
# 	read -p "Enter the build port: " PORT; \
# 	BASEURL="$${HOST}:$${PORT}"; \
# 	jq '.baseUrl = ${BASEURL}' $(CONFIG_LOC) > $(CONFIG_LOC).tmp && mv $(CONFIG_LOC).tmp $(CONFIG_LOC)


