import tape from 'tape';

import text from '../../src/javascripts/importMe';

tape('Test', (assert) => {
  assert.pass('Just pass');
  assert.notEqual(text, '', `Imported ‘${text}’`);
  assert.end();
});
