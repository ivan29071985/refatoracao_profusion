const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress', `${file}.json`);
  return fs.readJson(pathToConfigFile);
}

module.exports = (on,config) => {
    const file = config.env.configFile || 'staging'

    return getConfigurationByFile(file)
}