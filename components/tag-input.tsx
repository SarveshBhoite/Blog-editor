"use client"

import { useState, type KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
}

export function TagInput({ value, onChange, placeholder }: TagInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()])
      }
      setInputValue("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag, index) => (
          <div key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-sm">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="text-gray-500 hover:text-gray-700">
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Type and press Enter to add tags"}
      />
    </div>
  )
}
