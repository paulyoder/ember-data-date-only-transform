import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('transform:date-only', 'Unit - Date Only Transform');

test('it exists', function(assert) {
  assert.ok(this.subject())
});

test('#deserialize string', function(assert) {
  let transform = this.subject();

  const date = transform.deserialize('2018-04-20');
  assert.strictEqual(date.getMonth(), 3);
  assert.strictEqual(date.getDate(), 20);
  assert.strictEqual(date.getFullYear(), 2018);
});

test('#deserialize other than string', function(assert) {
  let transform = this.subject();
  let dateString = '2015-01-01T00:00:00.000Z';
  let dateInMillis = Date.parse(dateString);

  // from Number
  assert.equal(transform.deserialize(dateInMillis).valueOf(), dateInMillis);

  // from other
  assert.strictEqual(transform.deserialize({}), null);

  // from none
  assert.strictEqual(transform.deserialize(null), null);
  assert.strictEqual(transform.deserialize(undefined), undefined);
});

test('#serialize', function(assert) {
  let transform = this.subject();

  assert.strictEqual(transform.serialize(null), null);
  assert.strictEqual(transform.serialize(undefined), null);
  assert.strictEqual(transform.serialize(new Date('invalid')), null);

  let date = new Date('2015-01-01T00:00:00.000Z');
  assert.equal(transform.serialize(date), '2015-01-01');
});
