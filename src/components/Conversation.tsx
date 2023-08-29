import { Group, Message } from '@components/Group'
import { MESSAGE_GROUPS, Status } from '@constants/content'
import { useEffect, useState } from 'react'

type Timeline = {
  group: Message[]
  delay: number
  shown: 1 | -1
  status: Status
}[]

const DELAY = 900

const generateTimeline = (groups: string[][]): Timeline => {
  const shown = sessionStorage.getItem('seen') ? 1 : -1
  const timeline: Timeline = []

  groups.forEach((group, i) => {
    timeline.push({
      group: group.map(
        (m, j) =>
          ({
            content: m,
            delay: m.length * (DELAY / 100) + j * DELAY,
            shown
          } as Message)
      ),
      status: shown ? Status.SEEN : Status.TYPING,
      delay: i * (DELAY / 2),
      shown
    })
  })

  return timeline
}

export const Conversation = () => {
  const [messages, setMessages] = useState(generateTimeline(MESSAGE_GROUPS))

  // Step through the timeline.
  useEffect(() => {
    const group = messages.findIndex((m) => m.shown !== 1 || m.group.some((g) => g.shown != 1))
    if (group === -1) {
      sessionStorage.setItem('seen', 'true')
      return
    }

    // Show this group if it hasn't been shown yet.
    if (messages[group].shown !== 1) {
      setTimeout(() => {
        setMessages((prev) => {
          const next = [...prev]
          next[group].shown = 1
          next[group].group[0].shown = 0
          return next
        })
      }, messages[group].delay)
      return
    }

    // Show the next message in this group.
    const idx = messages[group].group.findIndex((m) => m.shown !== 1)
    if (idx === -1) return

    setTimeout(() => {
      setMessages((prev) => {
        const next = [...prev]
        next[group].group[idx].shown = 1

        if (idx + 1 === messages[group].group.length) {
          next[group].status = Status.SEEN
        }

        return next
      })
      // If there is another message in this group, change it's shown status.
      if (idx + 1 < messages[group].group.length) {
        setTimeout(() => {
          setMessages((prev) => {
            const next = [...prev]
            next[group].group[idx + 1].shown = 0
            next[group].status = Status.TYPING
            return next
          })
        }, DELAY / 4)
      }
    }, messages[group].group[idx].delay + DELAY / 2)
  }, [messages])

  return messages.map((m, i) => (m.shown === 1 ? <Group key={i} messages={m.group} status={m.status} /> : null))
}
