## Extendable pattern matching library for typescript

### Synchronous match
 - only first successful case would be ran, others would be skipped
 - use only synchronous matching functions, otherwise more then one case could be ran
 - `default` should be the last method in chain, otherwise only it would be ran

```typescript
import { match } from 'switch-box';

match(42)
.case<number>(
  (value, matcher) => {matcher(typeof value === 'number')},
  value => console.info('this is number')
)
.case<string>(
  (value, matcher) => {matcher(typeof value === 'string')},
  value => console.info('this is string')
)
.default(
  value => console.info(`this is ${typeof value}`)
);
```

### Asynchronous match
 - match functions could be asynchronous
 - cases would be run one after another until successful case
 - it could be only one successful case, first would be ran, others would be skipped

```typescript
import { matchAsync } from 'switch-box';

matchAsync(42)
.case<number>(
  (value, matcher) => {
    setTimeout(() => {
      matcher(typeof value === 'number');
    }, 160);
  },
  value => console.info('this is number')
)
.case<string>(
  (value, matcher) => {
    setTimeout(() => {
      matcher(typeof value === 'string');
    }, 160);
  },
  value => console.info('this is string')
)
;
```

### JS
Library is developed for typescript projects specifically, but if you want to use it with JS just `npm run compile`
