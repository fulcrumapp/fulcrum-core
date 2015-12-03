/* eslint no-unused-expressions:0 */

require('babel-core/register')();

global.shouldBeNull = function (value) {
  (value == null).should.be.true;
};

global.shouldBeUndefined = function (value) {
  (typeof value === 'undefined').should.be.true;
};
