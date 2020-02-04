const StructuredLogger = require('./structuredLogger');

const logger = new StructuredLogger('virtual-test-stack', {});

logger.setSilentMode(true);

const metaData = {
  entityId: '123'
};

test('Info log', () => {
  const log = logger.info('My name is Bond, James Bond.', metaData);
  expect(log).toEqual(
    '{"Message":"My name is Bond, James Bond.","Level":"INFO","Stack":"virtual-test-stack","entityId":"123"}'
  );
});

test('Warn log', () => {
  const log = logger.warn('My name is Bond, James Bond.', metaData);
  expect(log).toEqual(
    '{"Message":"My name is Bond, James Bond.","Level":"WARN","Stack":"virtual-test-stack","entityId":"123"}'
  );
});

test('Debug log', () => {
  const log = logger.debug('My name is Bond, James Bond.', metaData);
  expect(log).toEqual(
    '{"Message":"My name is Bond, James Bond.","Level":"DEBUG","Stack":"virtual-test-stack","entityId":"123"}'
  );
});

test('Error log', () => {
  const log = logger.error('My name is Bond, James Bond.', metaData);
  expect(log).toEqual(
    '{"Message":"My name is Bond, James Bond.","Level":"ERROR","Stack":"virtual-test-stack","entityId":"123"}'
  );
});

test('Should handle metadata', () => {
  const log = logger.debug('My name is Bond, James Bond.', {
    memberId: 123,
    orderId: 321
  });
  expect(log).toEqual(
    '{"Message":"My name is Bond, James Bond.","Level":"DEBUG","Stack":"virtual-test-stack","memberId":123,"orderId":321}'
  );
});

test('Should handle missing metadata', () => {
  const log = logger.debug('My name is Bond, James Bond.');
  expect(log).toEqual(
    '{"Message":"My name is Bond, James Bond.","Level":"DEBUG","Stack":"virtual-test-stack"}'
  );
});

test('Should handle non-object metadata', () => {
  const log = logger.debug('My name is Bond, James Bond.', 'Mrs. Moneypenny');
  expect(log).toEqual(
    '{"Message":"My name is Bond, James Bond.","Level":"DEBUG","Stack":"virtual-test-stack"}'
  );
});

test('Should write metric string as is', () => {
  const log = logger.metric('metric 123 xy.');
  expect(log).toEqual('metric 123 xy.');
});
