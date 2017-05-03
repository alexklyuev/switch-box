import { match } from "../../";


describe('Base sync match', () => {

  describe('syncronous matchers, ', () => {

    it('first true case', done => {
      match(42)
      .case<number>(
        (value, matcher) => {matcher(typeof value === 'number')},
        value => done(),
      )
      .case<string>(
        (value, matcher) => {matcher(typeof value === 'string')},
        value => done.fail(),
      )
      .default(
        value => done.fail(),
      )
      ;
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
      )
      .default(
        value => done.fail(),
      )
      ;
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
      )
      ;
    });

  });

  describe('asyncronous mathcers, ', () => {

    it('in case of async matchers, default case would be run if it runs before matcher', done => {
      const vals = [false, false];
      new Promise(resolve => {
        match(42)
        .case<number>(
          (value, matcher) => {
            setTimeout(() => {
              matcher(typeof value === 'number');
            }, 160);
          },
          value => {
            vals[0] = true;
            resolve();
          },
        )
        .case<string>(
          (value, matcher) => {matcher(typeof value === 'string')},
          value => done.fail(),
        )
        .default(
          value => {
            vals[1] = true;
          },
        )
        ;
      }).then(() => {
        expect(vals.every(v => v === true)).toBe(true);
        done();
      });
    });
    
  });

});
