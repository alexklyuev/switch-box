interface Matcher {
  (result: boolean): void;
}

interface TestFn {
  (value: any, matcher: Matcher): void;
}

interface OnMatchFn<T> {
  (value: T): void;
}

type MethodFactories<I> = {
  [P in keyof I]: (value: any, futureValue: Promise<void>, methodFactories: MethodFactories<I>) => I[P];
}

interface CaseAsyncMethod {
  <T>(testFn: TestFn, onMatchFn: OnMatchFn<T>): AsyncMatcher
}

interface AsyncMatcher {
  case: CaseAsyncMethod;
}

function _caseAsyncFactory<B>(
  this: void,
  value: any,
  futureValue: Promise<void>,
  methodFactories: MethodFactories<B>,
) {
  return function _caseAsync<T>(
    this: void,
    testFn: TestFn,
    onMatchFn: OnMatchFn<T>,
  ) {
    return _matchAsync<B>(
      value,
      new Promise<void>((resolve, reject) => {
        futureValue.then(
          () => {
            testFn(value, (res: boolean) => {
              if (res) {
                reject();
                onMatchFn(value);
              } else {
                resolve();
              }
            });
          },
          reject,
        );
      }),
      methodFactories,
    );
  };
}

function _matchAsync<B>(
  this: void,
  value: any,
  resolved: Promise<void>,
  methodFactories: MethodFactories<B>,
): B {
  return Object.keys(methodFactories).reduce((acc, key) => {
    acc[key] = methodFactories[key](value, resolved, methodFactories);
    return acc;
  }, {} as B);
}

export function matchAsync(
  this: void,
  val: any
) {
  return _matchAsync<AsyncMatcher>(
    val,
    Promise.resolve(),
    {
      case:_caseAsyncFactory,
    }
  );
};
