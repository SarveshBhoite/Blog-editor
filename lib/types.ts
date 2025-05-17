export interface BlogPost {
  id: string
  title: string
  content: string
  tags: string[]
  published: boolean
  createdAt: Date
  updatedAt: Date
}
