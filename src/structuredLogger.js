let stack = 'default-stack';
let silentMode = false;
let metadataKnown = [];

function write(logData) {
  if (silentMode) {
    return;
  }
  console.debug(logData);
}

function createLogObject(metadata) {
  const logObject = {
    Stack: stack
  };

  if (!metadata) {
    return logObject;
  }

  Object.keys(metadata).forEach(key => {
    const metaKey = key.toLowerCase();
    if (metadataKnown.includes(metaKey)) {
      logObject[key] = metadata[key];
    }
  });

  return logObject;
}

function createlogData(msg, metadata, logLevel = 'INF') {
  const logObject = createLogObject(metadata);
  const logData = `[${logLevel}] [${JSON.stringify(logObject)}]${msg}`;

  return logData;
}

const info = (msg, metadata) => {
  const logData = createlogData(msg, metadata, 'INF');
  write(logData);

  return logData;
};

const warning = (msg, metadata) => {
  const logData = createlogData(msg, metadata, 'WARN');
  write(logData);

  return logData;
};

const error = (msg, metadata) => {
  const logData = createlogData(msg, metadata, 'ERR');
  write(logData);

  return logData;
};

const debug = (msg, metadata) => {
  const logData = createlogData(msg, metadata, 'DEBUG');
  write(logData);

  return logData;
};

const metric = msg => {
  write(msg);
  return msg;
};

function StructuredLogger(stackName, metadataKnownAttributes = []) {
  stack = stackName;
  silentMode = false;
  metadataKnown = metadataKnownAttributes;

  this.setSilentMode = silent => {
    silentMode = silent;
  };

  this.debug = debug;
  this.error = error;
  this.info = info;
  this.metric = metric;
  this.warning = warning;
}

module.exports = StructuredLogger;
