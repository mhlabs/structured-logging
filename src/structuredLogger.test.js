const StructuredLogger = require('./structuredLogger');

const defaultLogger = new StructuredLogger('virtual-test-stack', {});

defaultLogger.setSilentMode(true);

const metaData = {
  entityId: '123'
};

test('Should add pushed properties', () => {
  const customLogger = new StructuredLogger('virtual-test-stack', {});
  customLogger.setSilentMode(true);

  customLogger.pushProperty('Common', 'c');
  customLogger.pushProperty('Uncommon', 'u');
  const log = customLogger.debug('Message.', { Name: 'x', Id: 5 });

  expect(log).toEqual(
    '{"Message":"Message.","Level":"DEBUG","Stack":"virtual-test-stack","Name":"x","Id":5,"Common":"c","Uncommon":"u"}'
  );
});

test('Should not reuse pushed properties', () => {
  const customLogger = new StructuredLogger('virtual-test-stack', {});
  customLogger.setSilentMode(true);

  customLogger.pushProperty('New', 'new');
  const log = customLogger.info('Message.', { Name: 'x', Id: 5 });

  expect(log).toEqual(
    '{"Message":"Message.","Level":"INFO","Stack":"virtual-test-stack","Name":"x","Id":5,"New":"new"}'
  );
});

test('Info log', () => {
  const log = defaultLogger.info('My name is Bond, James Bond.', metaData);
  expect(log).toEqual(
    '{"Message":"My name is Bond, James Bond.","Level":"INFO","Stack":"virtual-test-stack","entityId":"123"}'
  );
});

test('Warn log', () => {
  const log = defaultLogger.warn('My name is Bond, James Bond.', metaData);
  expect(log).toEqual(
    '{"Message":"My name is Bond, James Bond.","Level":"WARN","Stack":"virtual-test-stack","entityId":"123"}'
  );
});

test('Debug log', () => {
  const log = defaultLogger.debug('My name is Bond, James Bond.', metaData);
  expect(log).toEqual(
    '{"Message":"My name is Bond, James Bond.","Level":"DEBUG","Stack":"virtual-test-stack","entityId":"123"}'
  );
});

test('Error log', () => {
  const log = defaultLogger.error('My name is Bond, James Bond.', metaData);
  expect(log).toEqual(
    '{"Message":"My name is Bond, James Bond.","Level":"ERROR","Stack":"virtual-test-stack","entityId":"123"}'
  );
});

test('Should handle metadata', () => {
  const log = defaultLogger.debug('My name is Bond, James Bond.', {
    memberId: 123,
    orderId: 321
  });
  expect(log).toEqual(
    '{"Message":"My name is Bond, James Bond.","Level":"DEBUG","Stack":"virtual-test-stack","memberId":123,"orderId":321}'
  );
});

test('Should handle missing metadata', () => {
  const log = defaultLogger.debug('My name is Bond, James Bond.');
  expect(log).toEqual(
    '{"Message":"My name is Bond, James Bond.","Level":"DEBUG","Stack":"virtual-test-stack"}'
  );
});

test('Should handle non-object metadata', () => {
  const log = defaultLogger.debug(
    'My name is Bond, James Bond.',
    'Mrs. Moneypenny'
  );
  expect(log).toEqual(
    '{"Message":"My name is Bond, James Bond.","Level":"DEBUG","Stack":"virtual-test-stack"}'
  );
});
