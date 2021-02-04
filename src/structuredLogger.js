let stack = 'default-stack';
let silentMode = false;

function write(logData) {
  if (silentMode) {
    return;
  }

  process.stdout.write(`${logData}\n`);
}

function createlogData(message, args, logLevel, baseMetadata) {
  const safeArgs = args instanceof Object ? args : {};
  const metadata = { ...safeArgs, ...baseMetadata };

  const data = {
    Message: message,
    Level: logLevel,
    Stack: stack
  };

  Object.keys(metadata).forEach((key) => {
    if (!data[key]) {
      data[key] = metadata[key];
    }
  });

  return JSON.stringify(data);
}

const info = (message, metadata, baseMetadata) => {
  const logData = createlogData(message, metadata, 'INFO', baseMetadata);
  write(logData);

  return logData;
};

const warn = (message, metadata, baseMetadata) => {
  const logData = createlogData(message, metadata, 'WARN', baseMetadata);
  write(logData);

  return logData;
};

const error = (message, metadata, baseMetadata) => {
  const logData = createlogData(message, metadata, 'ERROR', baseMetadata);
  write(logData);

  return logData;
};

const debug = (message, metadata, baseMetadata) => {
  const logData = createlogData(message, metadata, 'DEBUG', baseMetadata);
  write(logData);

  return logData;
};

function StructuredLogger(stackName) {
  stack = stackName;
  silentMode = false;
  const baseMetadata = {};

  this.pushProperty = (name, value) => {
    baseMetadata[name] = value;
  };

  this.setSilentMode = (silent) => {
    silentMode = silent;
  };

  this.debug = (message, metadata) => debug(message, metadata, baseMetadata);
  this.error = (message, metadata) => error(message, metadata, baseMetadata);
  this.info = (message, metadata) => info(message, metadata, baseMetadata);
  this.warn = (message, metadata) => warn(message, metadata, baseMetadata);
}

module.exports = StructuredLogger;
