## Extendable pattern matching library for typescript

```typescript
import { match } from './src/match';

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
