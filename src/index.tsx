import { atom, action } from '@reatom/core'

const listAtom = atom([], 'listAtom')
const sumAtom = atom(
  (ctx) =>
    ctx
      .spy(listAtom)
      .reduce((acc, counterAtom) => acc + ctx.spy(counterAtom), 0),
  'sumAtom',
)
const add = action(
  (ctx) =>
    listAtom(ctx, (list) => [...list, atom(0, `listAtom#${list.length}`)]),
  'add',
)

const App = () => (
  <main>
    <button onclick={add}>add</button>
    <br />
    <span>Sum: {sumAtom}</span>
    {atom((ctx) => (
      <ul>
        {ctx.spy(listAtom).map((counterAtom) => (
          <li>
            <button
              onclick={action((ctx, e) => counterAtom(ctx, (s) => s + 1))}
            >
              {counterAtom}
            </button>
          </li>
        ))}
      </ul>
    ))}
  </main>
)
document.getElementById('app').appendChild(<App />)
