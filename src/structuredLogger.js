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
    Metadata: metadata
  };
  return JSON.stringify(data);
}

const info = (messageTemplate, metadata) => {
  const logData = createlogData(messageTemplate, metadata, 'INFO');
  write(logData);

  return logData;
};

const warn = (messageTemplate, metadata) => {
  const logData = createlogData(messageTemplate, metadata, 'WARN');
  write(logData);

  return logData;
};

const error = (messageTemplate, metadata) => {
  const logData = createlogData(messageTemplate, metadata, 'ERROR');
  write(logData);

  return logData;
};

const debug = (messageTemplate, metadata) => {
  const logData = createlogData(messageTemplate, metadata, 'DEBUG');
  write(logData);

  return logData;
};

const metric = messageTemplate => {
  write(messageTemplate);
  return messageTemplate;
};

// eslint-disable-next-line no-unused-vars
function StructuredLogger(stackName, options = {}) {
  stack = stackName;
  silentMode = false;
  baseMetadata.stack = stack;

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
