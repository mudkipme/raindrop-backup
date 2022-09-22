export interface CollectionsResponse {
  result: boolean
  items: Collection[]
}

export interface Collection {
  title: string
  description: string
  public: boolean
  view: string
  count: number
  cover: unknown[]
  expanded: boolean
  _id: number
  user: UserRef
  creatorRef: CreatorRef
  lastAction: string
  created: string
  lastUpdate: string
  sort: number
  slug: string
  access: Access
  author: boolean
}

export interface UserRef {
  $ref: string
  $id: number
  $db: string
}

export interface CreatorRef {
  _id: number
  name: string
  email: string
  avatar?: string
}

export interface Access {
  for: number
  level: number
  root: boolean
  draggable: boolean
}

export interface Cache {
  status: string
  size?: number
  created?: string
}

export interface Media {
  type: string
  link: string
  screenshot?: boolean
}

export interface CollectionRef {
  $ref: string
  $id: number
  $db: string
}

export interface Raindrop {
  excerpt: string
  note: string
  type: string
  cover: string
  tags: string[]
  removed: boolean
  _id: number
  title: string
  collection: Collection
  link: string
  created: string
  lastUpdate: string
  important?: boolean
  media: Media[]
  user: UserRef
  domain: string
  creatorRef: CreatorRef
  sort: number
  cache: Cache
  highlights: unknown[]
  collectionId: number
  broken?: boolean
}

export interface RaindropsResponse {
  result: boolean
  items: Raindrop[]
  count: number
  collectionId: number
}

export interface FirefoxBookmark {
  title: string
  uri: string
  tags?: string
  dateAdded: string
}