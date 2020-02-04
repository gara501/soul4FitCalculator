const api = require('./index');

test('calculate 1rm using epleyWeldayRM formula', () => {
  expect(api.epleyWeldayRm(2, 80)).toBe(81);
});

test('calculate 1rm using landerRm formula', () => {
  expect(api.landerRm(2, 80)).toBe(83);
});

test('calculate 1rm using oConnorRm formula', () => {
  expect(api.oConnorRm(2, 80)).toBe(86);
});

test('calculate 1rm using lombardiRm formula', () => {
  expect(api.lombardiRm(2, 80)).toBe(89);
});

test('calculate 1rm using brzyckiRm formula', () => {
  expect(api.brzyckiRm(2, 80)).toBe(82);
});

test('calculate 1rm using abadieRm formula', () => {
  expect(api.abadieRm(2, 80)).toBe(83);
});

test('calculate 1rm using wathenRm formula', () => {
  expect(api.wathenRm(2, 80)).toBe(84);
});

test('calculate 1rm using bergerRm formula', () => {
  expect(api.bergerRm(2, 80)).toBe(85);
});

test('calculate 1rm using mayhewRm formula', () => {
  expect(api.mayhewRm(2, 80)).toBe(89);
});

