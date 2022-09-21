import { fetch } from 'undici';
import { CollectionsResponse, RaindropsResponse } from './types';

class RaindropClient {
  #token: string

  constructor(token: string) {
    this.#token = token
  }

  async getCollections() {
    const resp = await fetch('https://api.raindrop.io/rest/v1/collections', {
      headers: {
        'Authorization': `Bearer ${this.#token}`
      }
    })

    return await resp.json() as CollectionsResponse
  }

  async getRaindrops(collectionId: number, page: number) {
    const resp = await fetch(`https://api.raindrop.io/rest/v1/raindrops/${collectionId}?perpage=50&page=${page}`, {
      headers: {
        'Authorization': `Bearer ${this.#token}`
      }
    })

    return await resp.json() as RaindropsResponse
  }

  async getPermanentCopy(raindropId: number) {
    const resp = await fetch(`https://api.raindrop.io/rest/v1/raindrop/${raindropId}/cache`, {
      headers: {
        'Authorization': `Bearer ${this.#token}`
      }
    })
    return await resp.blob()
  }
}

export default RaindropClient