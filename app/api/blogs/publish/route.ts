import { NextResponse } from "next/server"
import type { BlogPost } from "@/lib/types"

// In a real application, this would be a database
const blogs: BlogPost[] = []

export async function POST(request: Request) {
  const blog = await request.json()

  if (!blog.id) {
    blog.id = `post-${Date.now()}`
  }

  blog.createdAt = blog.createdAt || new Date()
  blog.updatedAt = new Date()
  blog.published = true

  const existingBlogIndex = blogs.findIndex((b) => b.id === blog.id)

  if (existingBlogIndex !== -1) {
    // Update existing blog and publish it
    blogs[existingBlogIndex] = blog
  } else {
    // Add new published blog
    blogs.push(blog)
  }

  return NextResponse.json(blog)
}
