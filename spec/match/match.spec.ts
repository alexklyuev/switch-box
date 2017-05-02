import { match } from "../../";


describe('Base sync match', () => {

  it('first true case', done => {
    match(42)
    .case<number>(
      (value, matcher) => {matcher(typeof value === 'number')},
      value => done(),
    )
    .case<string>(
      (value, matcher) => {matcher(typeof value === 'string')},
      value => done.fail(),
    );
  });

  it('second true case', done => {
    match('42')
    .case<number>(
      (value, matcher) => {matcher(typeof value === 'number')},
      value => done.fail(),
    )
    .case<string>(
      (value, matcher) => {matcher(typeof value === 'string')},
      value => done(),
    );
  });

  it('default', done => {
    match(true)
    .case<number>(
      (value, matcher) => {matcher(typeof value === 'number')},
      value => done.fail(),
    )
    .case<string>(
      (value, matcher) => {matcher(typeof value === 'string')},
      value => done.fail(),
    )
    .default(
      value => done(),
    );
  });

});
