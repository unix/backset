import React from 'react'
import Backset from 'backset'
const { useStores, useUpdates, withContext } = Backset.create({
  title: 'Hello World',
})

const Child = () => {
  const updates = useUpdates()
  return (
    <>
      <button onClick={() => updates.title('Hello Backset')}>
        Edit
      </button>
      <button onClick={() => updates.title('Hello World')}>
        Reset
      </button>
    </>
  )
}

const App = () => {
  const { title } = useStores()
  return (
    <div>
      <p>{title}</p>
      <Child />
    </div>
  )
}

export default withContext(App)
