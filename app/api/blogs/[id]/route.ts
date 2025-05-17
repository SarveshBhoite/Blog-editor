import { NextResponse } from "next/server"
import type { BlogPost } from "@/lib/types"

// In a real application, this would be a database
let blogs: BlogPost[] = []

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 })
  }

  return NextResponse.json(blog)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const updatedBlog = await request.json()

  const existingBlogIndex = blogs.findIndex((b) => b.id === id)

  if (existingBlogIndex === -1) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 })
  }

  blogs[existingBlogIndex] = {
    ...blogs[existingBlogIndex],
    ...updatedBlog,
    id,
    updatedAt: new Date(),
  }

  return NextResponse.json(blogs[existingBlogIndex])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  const existingBlogIndex = blogs.findIndex((b) => b.id === id)

  if (existingBlogIndex === -1) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 })
  }

  blogs = blogs.filter((b) => b.id !== id)

  return NextResponse.json({ success: true })
}
