/* eslint no-unused-expressions:0 */

require('babel-core/register')();

var chai = require('chai');

chai.should();

global.shouldBeNull = function (value) {
  (value === null).should.eql(true);
};

global.shouldBeUndefined = function (value) {
  (typeof value === 'undefined').should.eql(true);
};
