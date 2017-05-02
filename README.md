## Extendable pattern matching library for typescript

### Basic usage

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

### JS
Library is developed for typescript projects specifically, but if you want to use it with JS just `npm run compile`
