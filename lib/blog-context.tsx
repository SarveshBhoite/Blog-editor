"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { BlogPost } from "./types"

interface BlogContextType {
  blogs: BlogPost[]
  saveDraft: (blog: BlogPost) => void
  publishBlog: (blog: BlogPost) => void
  getBlogById: (id: string) => BlogPost | undefined
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [blogs, setBlogs] = useState<BlogPost[]>([])

  // Load blogs from localStorage on initial render
  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs")
    if (storedBlogs) {
      try {
        const parsedBlogs = JSON.parse(storedBlogs)
        // Convert string dates back to Date objects
        const formattedBlogs = parsedBlogs.map((blog: any) => ({
          ...blog,
          createdAt: new Date(blog.createdAt),
          updatedAt: new Date(blog.updatedAt),
        }))
        setBlogs(formattedBlogs)
      } catch (error) {
        console.error("Failed to parse blogs from localStorage:", error)
      }
    }
  }, [])

  // Save blogs to localStorage whenever they change
  useEffect(() => {
    if (blogs.length > 0) {
      localStorage.setItem("blogs", JSON.stringify(blogs))
    }
  }, [blogs])

  const saveDraft = (blog: BlogPost) => {
    setBlogs((prevBlogs) => {
      const existingBlogIndex = prevBlogs.findIndex((b) => b.id === blog.id)

      if (existingBlogIndex !== -1) {
        // Update existing blog
        const updatedBlogs = [...prevBlogs]
        updatedBlogs[existingBlogIndex] = blog
        return updatedBlogs
      } else {
        // Add new blog
        return [...prevBlogs, blog]
      }
    })
  }

  const publishBlog = (blog: BlogPost) => {
    setBlogs((prevBlogs) => {
      const existingBlogIndex = prevBlogs.findIndex((b) => b.id === blog.id)

      if (existingBlogIndex !== -1) {
        // Update existing blog
        const updatedBlogs = [...prevBlogs]
        updatedBlogs[existingBlogIndex] = {
          ...blog,
          published: true,
        }
        return updatedBlogs
      } else {
        // Add new published blog
        return [
          ...prevBlogs,
          {
            ...blog,
            published: true,
          },
        ]
      }
    })
  }

  const getBlogById = (id: string) => {
    return blogs.find((blog) => blog.id === id)
  }

  return <BlogContext.Provider value={{ blogs, saveDraft, publishBlog, getBlogById }}>{children}</BlogContext.Provider>
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider")
  }
  return context
}
