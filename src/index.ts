import { writeFile, readdir, readFile, stat } from 'fs/promises'
import { join } from 'path'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import { fetch } from 'undici'
import RaindropClient from './client'
import { RaindropsResponse } from './types'

yargs(hideBin(process.argv))
  .command('metadata', 'backup the metadata of bookmarks', () => {}, async () => {
    if (!process.env.RAINDROP_TOKEN) {
      throw new Error('token not found')
    }
    const client = new RaindropClient(process.env.RAINDROP_TOKEN)
    const collectionsResp = await client.getCollections()
    await writeFile(join('data', 'collections.json'), JSON.stringify(collectionsResp), { encoding: 'utf-8' })

    for (const collection of [...collectionsResp.items.map(collection => collection._id), -1]) {
      let total = 0
      let page = 0
      do {
        const raindropsResp = await client.getRaindrops(collection, page)
        total = raindropsResp.count
        const filename = `raindrops_${collection}_${page + 1}.json`
        await writeFile(join('data', filename), JSON.stringify(raindropsResp), { encoding: 'utf-8' })
        console.log(`${filename} saved.`)
        page += 1
      } while (page * 50 < total)
    }
  })
  .command('cache', 'backup permanent copy of bookmarks', () => {},async () => {
    if (!process.env.RAINDROP_TOKEN) {
      throw new Error('token not found')
    }
    const client = new RaindropClient(process.env.RAINDROP_TOKEN)
    const files = await readdir('data')
    for (const file of files) {
      if (!file.match(/^raindrops_[-\d]+_\d+\.json$/)) {
        continue
      }

      const raindropsResp = JSON.parse(await readFile(join('data', file), { encoding: 'utf-8' })) as RaindropsResponse

      for (const item of raindropsResp.items) {
        const filename = join('cache', `${item._id}.html`)
        try {
          await stat(filename)
          continue
        } catch {}

        const blob = await client.getPermanentCopy(item._id)
        await writeFile(filename, new DataView(await blob.arrayBuffer()))
        console.log(`${filename} saved.`)
      }
    }
  })
  .command('cover', 'backup covers of bookmarks', () => {},async () => {
    if (!process.env.RAINDROP_TOKEN) {
      throw new Error('token not found')
    }
    const files = await readdir('data')
    for (const file of files) {
      if (!file.match(/^raindrops_[-\d]+_\d+\.json$/)) {
        continue
      }

      const raindropsResp = JSON.parse(await readFile(join('data', file), { encoding: 'utf-8' })) as RaindropsResponse

      for (const item of raindropsResp.items) {
        if (item.cover && new URL(item.cover).hostname === 'rdl.ink') {
          const resp = await fetch(item.cover)
          const filename = join('cover', `${item._id}_cover.jpg`)
          try {
            await stat(filename)
            continue
          } catch {}
          await writeFile(filename, new DataView(await resp.arrayBuffer()))
          console.log(`${filename} saved.`)
        }
      }
    }
  })
  .demandCommand()
  .parse()