'use client'

import { useEffect, useState } from 'react'
import { Droppable, type DroppableProps } from '@hello-pangea/dnd'

export function CustomDroppable({ children, ...props }: DroppableProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setEnabled(true)
    })

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (!enabled) return null

  return <Droppable {...props}>{children}</Droppable>
}