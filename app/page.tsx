import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PenLine } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog Editor Application",
  description: "A modern blog editor with auto-save functionality",
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold">Blog Editor</h1>
          <nav className="flex items-center gap-4">
            <Link href="/blogs">
              <Button variant="ghost">All Blogs</Button>
            </Link>
            <Link href="/editor">
              <Button>
                <PenLine className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold">Welcome to Your Blog Editor</h1>
            <p className="text-muted-foreground">Create, edit, and manage your blog posts with ease</p>
          </div>
          <div className="grid gap-6">
            <div className="p-6 border rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Create New Content</h2>
              <p className="text-muted-foreground mb-4">Start writing a new blog post with our powerful editor</p>
              <Link href="/editor">
                <Button>
                  <PenLine className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </Link>
            </div>
            <div className="p-6 border rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Manage Your Content</h2>
              <p className="text-muted-foreground mb-4">View, edit, and publish your drafts and published posts</p>
              <Link href="/blogs">
                <Button variant="outline">View All Blogs</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Blog Editor Application
        </div>
      </footer>
    </div>
  )
}
