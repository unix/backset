## Backset

An **easy to use** React state management tool.

- Very few APIs.
- Based on React Hooks and Context.
- Tracking and eliminate unnecessary re-renders.
- No redundant template code.
- Nothing to learn.


### Quick start

1. Run `yarn add backset` or `yarn i backset` install it.
2. Create a store and use it:

```jsx
import { create } from 'backset'
const { useStores, useUpdates, withContext } = create({ title: 'Hello World' })

const Child = () => {
  const updates = useUpdates()
  return <button onClick={() => updates.title('Hello Backset')}>Edit</button>
}

const App = () => {
  const { title } = useStores()
  return <div>{title} <Child /></div>
}

export default withContext(App)
```

[Edit this example on codesandbox](https://codesandbox.io/s/backset-quick-start-xj1p9?file=/src/index.js).

### Documentation

 - [Document Site](https://backset.now.sh)

### LICENSE

[MIT](https://github.com/unix/backset/blob/master/LICENSE)
