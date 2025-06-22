"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, ArrowRight } from "lucide-react"

export default function EmailSignup() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email submitted:", email)
  }

  return (
    <div className=" flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="relative bg-white rounded-full border border-gray-300 p-1 flex items-center">
          <div className="flex items-center flex-1 pl-4 pr-2">
            <Mail className="w-5 h-5 text-gray-400 mr-3" />
            <Input
              type="email"
              placeholder="Join Our Community"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-0 outline-0 bg-white shadow-none text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 px-2 h-auto text-base"
            />
          </div>
          <Button
            type="submit"
            size="icon"
            className="rounded-full cursor-pointer mr-1 bg-gray-800 hover:bg-gray-700 w-10 h-10 flex-shrink-0"
          >
            <ArrowRight className="w-5 h-5 text-white" />
            <span className="sr-only">Submit</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
