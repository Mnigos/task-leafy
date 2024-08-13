import {
  today,
  getLocalTimeZone,
  startOfWeek,
  DateFormatter,
  type DateValue,
} from '@internationalized/date'

import type { BoardKeyWithoutOverdue } from '../types'

export const now = today(getLocalTimeZone())
export const yesterday = now.add({ days: -1 })
export const tomorrow = now.add({ days: 1 })
export const nextWeek = startOfWeek(now.add({ weeks: 1 }), 'en-US')

export function formatDateValue(date: DateValue) {
  switch (date.day) {
    case now.day: {
      return 'Today'
    }

    case tomorrow.day: {
      return 'Tomorrow'
    }

    case yesterday.day: {
      return 'Yesterday'
    }

    default: {
      return new DateFormatter('en-US', {
        day: 'numeric',
        month: 'long',
      }).format(date.toDate(getLocalTimeZone()))
    }
  }
}

export function dueDateFactory(
  destinationKey: Exclude<BoardKeyWithoutOverdue, 'done'>
) {
  switch (destinationKey) {
    case 'today': {
      return now.toDate(getLocalTimeZone())
    }
    case 'tomorrow': {
      return tomorrow.toDate(getLocalTimeZone())
    }
    case 'noDate': {
      return null
    }
  }
}

export function boardKeyFactory(date: DateValue) {
  if (date.day === now.day) return 'today'
  if (date.day === tomorrow.day) return 'tomorrow'

  return 'noDate'
}

export function isOverdue(date: DateValue) {
  return date.day < now.day
}
