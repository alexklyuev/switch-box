import { matchAsync } from "../../";


describe('async matcher, ', () => {

  it('first async case', done => {
    matchAsync(42)
    .case<number>(
      (value, matcher) => {
        setTimeout(() => {
          matcher(typeof value === 'number');
        }, 160);
      },
      value => done(),
    )
    .case<string>(
      (value, matcher) => {
        setTimeout(() => {
          matcher(typeof value === 'string');
        }, 160);
      },
      value => done.fail(),
    );
  });

  it('second async case', done => {
    matchAsync('42')
    .case<number>(
      (value, matcher) => {
        setTimeout(() => {
          matcher(typeof value === 'number');
        }, 160);
      },
      value => done.fail(),
    )
    .case<string>(
      (value, matcher) => {
        setTimeout(() => {
          matcher(typeof value === 'string');
        }, 160);
      },
      value => done(),
    );
  });

});