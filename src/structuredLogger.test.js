const StructuredLogger = require('./structuredLogger');

const metadataKnown = ['entityid'];
const logger = new StructuredLogger('virtual-test-stack', metadataKnown);

logger.setSilentMode(true);

const metaData = {
  entityId: '123'
};

test('Info log', () => {
  const log = logger.info('You have been informed.', metaData);
  expect(log).toEqual(
    '[INF] [{"Stack":"virtual-test-stack","entityId":"123"}]You have been informed.'
  );
});

test('Warn log', () => {
  const log = logger.warning('You have been warned.', metaData);
  expect(log).toEqual(
    '[WARN] [{"Stack":"virtual-test-stack","entityId":"123"}]You have been warned.'
  );
});

test('Error log', () => {
  const log = logger.error('You have been in error.', metaData);
  expect(log).toEqual(
    '[ERR] [{"Stack":"virtual-test-stack","entityId":"123"}]You have been in error.'
  );
});

test('Debug log', () => {
  const log = logger.debug('You have been debugged.', metaData);
  expect(log).toEqual(
    '[DEBUG] [{"Stack":"virtual-test-stack","entityId":"123"}]You have been debugged.'
  );
});

test('Should handle missing metadata', () => {
  const log = logger.debug('You have been debugged.');
  expect(log).toEqual(
    '[DEBUG] [{"Stack":"virtual-test-stack"}]You have been debugged.'
  );
});

test('Should write metric string as is', () => {
  const log = logger.metric('metric 123 xy.');
  expect(log).toEqual('metric 123 xy.');
});
