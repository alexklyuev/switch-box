interface Matcher {
  (result: boolean): void;
}

interface TestFn {
  (value: any, matcher: Matcher): void;
}

interface OnMatchFn<T> {
  (value: T): void;
}

interface BasicSyncMatcher {
  case: CaseMethod;
  default: DefaultMethod;
}

interface CaseMethod {
  <T>(testFn: TestFn, onMatchFn: OnMatchFn<T>): BasicSyncMatcher
}

interface DefaultMethod {
  (onMatchFn: OnMatchFn<any>): BasicSyncMatcher
}

type MethodFactories<I> = {
  [P in keyof I]: (value: any, resolved: boolean, methodFactories: MethodFactories<I>) => I[P];
}

let x: MethodDecorator


function _caseFactory<B>(
  this: void,
  value: any,
  resolved: boolean,
  methodFactories: MethodFactories<B>,
) {
  return function _case<T>(
    this: void,
    testFn: TestFn,
    onMatchFn: OnMatchFn<T>,
  ) {
    if (resolved) {
      return _match<B>(
        value,
        true,
        methodFactories,
      );
    }
    let _resolved = false;
    testFn(value, (res: boolean) => {
      if (res) {
        _resolved = true;
        onMatchFn(value);
      }
    });
    return _match<B>(
      value,
      _resolved,
      methodFactories,
    );
  };
}

function _defaultFactory<B>(
  this: void,
  value: any,
  resolved: boolean,
  methodFactories: MethodFactories<B>,
) {
  const caseFn = _caseFactory<B>(
    value,
    resolved,
    methodFactories,
  );
  return function _default(onMatchFn: OnMatchFn<any>) {
    return caseFn(
      (_, matcher) => {matcher(true)},
      onMatchFn,
    );
  }
}

function _match<B>(
  this: void,
  value: any,
  resolved = false,
  methodFactories: MethodFactories<B>
): B {
  return Object.keys(methodFactories).reduce((acc, key) => {
    acc[key] = methodFactories[key](value, resolved, methodFactories);
    return acc;
  }, {} as B);
};

export function match(
  this: void,
  val: any,
) {
  return _match<BasicSyncMatcher>(
    val,
    false,
    {
      case: _caseFactory,
      default: _defaultFactory,
    }
  );
}
