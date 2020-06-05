## Backset

A minimalist state tool for React apps.

- Very few APIs.
- Based on React Hooks and Context.
- Tracking and eliminate unnecessary re-renders.
- No redundant template code.
- Gzipped ≈ `1.5kb`.

<br />

### Easy to use

- `backset` is based on `React.Context`.
- `backset` is designed to let you write less code.

This is the simplest implementation of count under `backset` and `React.Context`,
Obviously, **`backset` is shorter and easier to read**, if you have multiple components or pass more values,
the advantage of `backset` will be more obvious.

You also can see their differences in the [codesandbox editor](https://codesandbox.io/s/backset-vs-context-zi7vd?file=/src/native-context.jsx).

<p align="center">
<b>Count example with <code>backset</code></b>
</p>
<p align="center">
<img align="center" width="620" src="https://user-images.githubusercontent.com/11304944/83858617-59dafc00-a74f-11ea-82b3-de2e46c8173a.png">
</p>
<p align="center">
<b>Count example with Native Context</b>
</p>
<p align="center">
<img align="center" width="620" src="https://user-images.githubusercontent.com/11304944/83858624-5ba4bf80-a74f-11ea-84f0-bede9be1ad3d.png">
</p>

<br />

### Performance & Optimization

We all know that the native React.Context will [render repeatedly](https://github.com/facebook/react/issues/15156#issuecomment-474590693),
unless you use the `React.Memo` wrap component or the `useMemo` wrap render function, this requires a lot of repetitive code.

You don't have to think about these problems when using `backset`, it provides the `useTracked` API to automatically track state,
this means:

  - Better performance without changing any code.
  - Still `hooks`, still your favorite style.
  - Switch at any time, no duplicate code.

**Click to [view this example online](https://codesandbox.io/s/backset-tracked-f3vrw?file=/src/app.js).**

<p align="center">
<b>Automatically avoids unnecessary rendering</b>
</p>
<p align="center">
<img align="center" width="620" src="https://user-images.githubusercontent.com/11304944/83864332-31570000-a757-11ea-9d9b-defcf2decdfd.png">
</p>

<br />

### Experience & API Design

Although `backset` looks magical, it doesn't make any hacks.

`backset` can intelligently provide all types of inference, it can even check your properties by type,
Using `backset` in your project is definitely a pleasure!

<p align="center">
<b>Automatically tips and constraints</b>
</p>
<p align="center">
<img align="center" width="620" src="https://user-images.githubusercontent.com/11304944/83866702-c4de0000-a75a-11ea-947f-0da90e88751c.png">
</p>

<br />

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

<br />

### Documentation

 - [Document Site](https://backset.now.sh)

<br />

### LICENSE

[MIT](https://github.com/unix/backset/blob/master/LICENSE)
