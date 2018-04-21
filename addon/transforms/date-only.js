import DS from 'ember-data';
const millisecondsInHour = 60000;

export default DS.Transform.extend({
  deserialize(serialized) {
    let type = typeof serialized;

    if (type === 'string') {
      // Taken from http://stackoverflow.com/a/17346406/215086
      let tIndex = serialized.indexOf('T');
      let serializedDateSection = (tIndex >= 0) ? serialized.slice(0, tIndex) : serialized;
      let date = new Date(serializedDateSection);
      let offset = date.getTimezoneOffset();
      return new Date(date.getTime() + offset * millisecondsInHour);
    } else if (type === 'number') {
      return new Date(serialized);
    } else if (serialized == null) {
      // if the value is null return null
      // if the value is not present in the data return undefined
      return serialized;
    } else {
      return null;
    }
  },
  
  // Serialize's a date object into the YYYY-MM-DD format
  serialize(date) {
    if (date instanceof Date && !isNaN(date)) {
      return date.toISOString().split('T')[0];
    } else {
      return null;
    }
  }
});