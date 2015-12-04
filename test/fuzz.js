/* eslint no-undefined:0 */
/* eslint no-new-wrappers:0 */
/* eslint no-new-object:0 */

const madness = [
  null,
  undefined,
  'undefined',
  '',
  NaN,
  new Date(),
  {},
  [],
  /test/,
  true,
  false,
  String,
  Boolean,
  Array,
  Object,
  RegExp,
  Number,
  Date,
  new String(),
  new Boolean(),
  new Array(),
  new Object(),
  new RegExp(),
  new Number(),
  new Date()
];

const partial = (func, ...args) => {
  return () => {
    func.apply(null, args);
  };
};

export default function fuzz(invoker) {
  for (let cause of madness) {
    partial(invoker, cause).should.not.throw();
  }
}
