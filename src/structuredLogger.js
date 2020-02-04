let stack = 'default-stack';
let silentMode = false;
const baseMetadata = {};

function write(logData) {
  if (silentMode) {
    return;
  }

  process.stdout.write(`${logData}\n`);
}

function createlogData(message, args, logLevel = 'INFO') {
  const safeArgs = args instanceof Object ? args : {};
  const metadata = Object.assign(safeArgs || {}, baseMetadata);

  const data = {
    Message: message,
    Level: logLevel,
    Stack: stack
  };

  Object.keys(metadata).forEach(key => {
    if (!data[key]) {
      data[key] = metadata[key];
    }
  });

  return JSON.stringify(data);
}

const info = (message, metadata) => {
  const logData = createlogData(message, metadata, 'INFO');
  write(logData);

  return logData;
};

const warn = (message, metadata) => {
  const logData = createlogData(message, metadata, 'WARN');
  write(logData);

  return logData;
};

const error = (message, metadata) => {
  const logData = createlogData(message, metadata, 'ERROR');
  write(logData);

  return logData;
};

const debug = (message, metadata) => {
  const logData = createlogData(message, metadata, 'DEBUG');
  write(logData);

  return logData;
};

const metric = message => {
  write(message);
  return message;
};

// eslint-disable-next-line no-unused-vars
function StructuredLogger(stackName, options = {}) {
  stack = stackName;
  silentMode = false;

  this.setSilentMode = silent => {
    silentMode = silent;
  };

  this.debug = debug;
  this.error = error;
  this.info = info;
  this.metric = metric;
  this.warn = warn;
}

module.exports = StructuredLogger;
