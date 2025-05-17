"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useBlog } from "@/lib/blog-context"
import type { BlogPost } from "@/lib/types"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { TagInput } from "@/components/tag-input"

export default function EditorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const blogId = searchParams.get("id")
  const { toast } = useToast()
  const { blogs, saveDraft, publishBlog, getBlogById } = useBlog()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isPublished, setIsPublished] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Load blog if editing an existing one
  useEffect(() => {
    if (blogId) {
      const blog = getBlogById(blogId)
      if (blog) {
        setTitle(blog.title)
        setContent(blog.content)
        setTags(blog.tags || [])
        setIsPublished(blog.published)
        setIsEditing(true)
      }
    }
  }, [blogId, getBlogById])

  // Auto-save functionality
  useEffect(() => {
    if (!title && !content) return

    // Auto-save every 30 seconds
    const intervalId = setInterval(() => {
      handleSaveDraft()
    }, 30000)

    return () => clearInterval(intervalId)
  }, [title, content, tags])

  // Debounce function for auto-save after inactivity
  useEffect(() => {
    if (!title && !content) return

    const debounceTimer = setTimeout(() => {
      handleSaveDraft()
    }, 5000)

    return () => clearTimeout(debounceTimer)
  }, [title, content, tags])

  const handleSaveDraft = () => {
    if (!title && !content) return

    const blog: BlogPost = {
      id: blogId || `draft-${Date.now()}`,
      title: title || "Untitled",
      content,
      tags,
      published: isPublished,
      createdAt: isEditing ? getBlogById(blogId!)?.createdAt || new Date() : new Date(),
      updatedAt: new Date(),
    }

    saveDraft(blog)
    setLastSaved(new Date())

    toast({
      title: "Draft saved",
      description: `Last saved at ${new Date().toLocaleTimeString()}`,
      duration: 2000,
    })

    if (!isEditing) {
      router.push(`/editor?id=${blog.id}`)
      setIsEditing(true)
    }
  }

  const handlePublish = () => {
    if (!title) {
      toast({
        title: "Title required",
        description: "Please add a title before publishing",
        variant: "destructive",
      })
      return
    }

    if (!content) {
      toast({
        title: "Content required",
        description: "Please add some content before publishing",
        variant: "destructive",
      })
      return
    }

    const blog: BlogPost = {
      id: blogId || `post-${Date.now()}`,
      title,
      content,
      tags,
      published: true,
      createdAt: isEditing ? getBlogById(blogId!)?.createdAt || new Date() : new Date(),
      updatedAt: new Date(),
    }

    publishBlog(blog)
    setIsPublished(true)
    setLastSaved(new Date())

    toast({
      title: "Blog published",
      description: "Your blog has been published successfully",
    })

    if (!isEditing) {
      router.push(`/editor?id=${blog.id}`)
      setIsEditing(true)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">
              {isEditing ? (isPublished ? "Edit Published Post" : "Edit Draft") : "New Blog Post"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {lastSaved && (
              <span className="text-sm text-muted-foreground">Last saved: {lastSaved.toLocaleTimeString()}</span>
            )}
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handlePublish}>{isPublished ? "Update Published Post" : "Publish"}</Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter blog title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your blog content here..."
              className="min-h-[300px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (optional)</Label>
            <TagInput value={tags} onChange={setTags} placeholder="Add tags and press Enter" />
          </div>
        </div>
      </main>
    </div>
  )
}
