import { atom, action } from '@reatom/framework'

const listAtom = atom([], 'listAtom')
const sumAtom = atom(
  (ctx) =>
    ctx
      .spy(listAtom)
      .reduce((acc, counterAtom) => acc + ctx.spy(counterAtom), 0),
  'sumAtom',
)
const add = action((ctx) => {
  listAtom(ctx, (list) => {
    const counterAtom = atom(0, `listAtom#${list.length}`)
    return [...list, counterAtom]
  })
}, 'add')
const clear = action((ctx) => listAtom(ctx, []), 'clear')

export const App = () => (
  <main>
    <button onclick={add}>add</button>
    <br />
    <span>Sum: {sumAtom}</span>
    <br />
    <button onclick={clear}>clear</button>
    <br />
    {atom((ctx) => (
      <ul>
        {ctx.spy(listAtom).map((counterAtom) => (
          <li>
            <button onclick={action((ctx) => counterAtom(ctx, (s) => s + 1))}>
              {counterAtom}
            </button>
          </li>
        ))}
      </ul>
    ))}
  </main>
)
