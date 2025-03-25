import { join } from 'node:path'
import minimist from 'minimist'
import { Plop, run } from 'plop'

const args = process.argv.slice(2)
const argv = minimist(args)

Plop.prepare(
  {
    cwd: process.cwd(),
    configPath: join(import.meta.dirname, 'plopfile.js'),
    preload: argv.preload || [],
    completion: argv.completion,
  },
  (env) => {
    Plop.execute(env, (_env) => {
      const options = {
        ..._env,
        dest: process.cwd(),
      }
      return run(options, undefined, true)
    })
  }
)
