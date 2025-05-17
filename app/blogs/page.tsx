"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBlog } from "@/lib/blog-context"
import { ArrowLeft, Calendar, Clock, Edit, PenLine, Tag } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function BlogsPage() {
  const { blogs } = useBlog()
  const [activeTab, setActiveTab] = useState("all")

  const publishedBlogs = blogs.filter((blog) => blog.published)
  const draftBlogs = blogs.filter((blog) => !blog.published)

  const displayBlogs = activeTab === "published" ? publishedBlogs : activeTab === "drafts" ? draftBlogs : blogs

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
            <h1 className="text-2xl font-bold">Your Blogs</h1>
          </div>
          <Link href="/editor">
            <Button>
              <PenLine className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All ({blogs.length})</TabsTrigger>
                <TabsTrigger value="published">Published ({publishedBlogs.length})</TabsTrigger>
                <TabsTrigger value="drafts">Drafts ({draftBlogs.length})</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="mt-6">
              <BlogList blogs={displayBlogs} />
            </TabsContent>
            <TabsContent value="published" className="mt-6">
              <BlogList blogs={displayBlogs} />
            </TabsContent>
            <TabsContent value="drafts" className="mt-6">
              <BlogList blogs={displayBlogs} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function BlogList({ blogs }) {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No blogs found</p>
        <Link href="/editor" className="mt-4 inline-block">
          <Button>
            <PenLine className="w-4 h-4 mr-2" />
            Create New Post
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {blogs.map((blog) => (
        <div key={blog.id} className="p-6 border rounded-lg shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatDistanceToNow(new Date(blog.updatedAt), { addSuffix: true })}
                </div>
                {blog.published ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Published
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Draft
                  </span>
                )}
              </div>
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <p className="mt-3 text-muted-foreground line-clamp-2">{blog.content}</p>
            </div>
            <Link href={`/editor?id=${blog.id}`}>
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
