import { match } from "./src";


match('7')
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
)
;
