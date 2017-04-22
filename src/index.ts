interface Matcher {
  (result: boolean): void;
}

interface TestFn {
  (value: any, matcher: Matcher): void;
}

interface OnMatchFn<T> {
  (value: T): void;
}

interface InternalMatcher {
  case: CaseFn;
  default: DefaultFn;
}

interface CaseFn {
  <T>(testFn: TestFn, onMatchFn: OnMatchFn<T>): InternalMatcher
}

interface DefaultFn {
  (onMatchFn: OnMatchFn<any>): InternalMatcher
}


function _caseFactory(
  this: void,
  value: any,
  resolved: boolean,
): CaseFn {
  return function _case<T>(
    this: void,
    testFn: TestFn,
    onMatchFn: OnMatchFn<T>,
  ) {
    if (resolved) {
      return _match(
        value,
        true,
      );
    }
    let _resolved = false;
    testFn(value, (res: boolean) => {
      if (res) {
        _resolved = true;
        onMatchFn(value);
      }
    });
    return _match(
      value,
      _resolved,
    );
  };
}

function _defaultFactory(
  this: void,
  value: any,
  resolved: boolean,
): DefaultFn {
  const caseFn = _caseFactory(
    value,
    resolved,
  );
  return function _default(onMatchFn: OnMatchFn<any>) {
    return caseFn(
      (_, matcher) => {matcher(true)},
      onMatchFn,
    );
  }
}

function _match(
  this: void,
  value: any,
  resolved = false,
): InternalMatcher {
  const caseFn = _caseFactory(
    value,
    resolved,
  );
  const defaultFn = _defaultFactory(
    value,
    resolved,
  );
  return {
    case: caseFn,
    default: defaultFn,
  };
};

export function match(
  this: void,
  val: any,
) {
  return _match(
    val,
    false,
  );
}
