import { Avatar } from '@components/Avatar'
import { Message } from '@components/Message'
import { Status } from '@constants/content'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

export type Message = {
  content: string
  shown: 1 | 0 | -1
  delay: number
}

type Props = {
  messages: Message[]
  status?: Status
  sent?: boolean
}

export const Group = ({ messages, status, sent }: Props) => {
  const cn = classNames({ sent: sent })
  const listRef = useRef<HTMLDivElement>(null)

  const [maxHeight, setMaxHeight] = useState<number>(messages.some((m) => m.shown === -1) ? 0 : 1000)
  useEffect(() => {
    function handleResize() {
      if (!listRef.current) return
      setMaxHeight((h) => (listRef.current.scrollHeight > h ? listRef.current.scrollHeight : h))
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [JSON.stringify(messages), listRef])

  return (
    <section className={cn}>
      <div>
        {!sent && <Avatar src="/assets/robbie.png" />}
        <div ref={listRef} className="list" style={{ maxHeight }}>
          {messages
            .filter((m) => m.shown >= 0)
            .map((m, i) => (
              <Message key={i} content={m.content} loading={m.shown === 0} sent={sent} />
            ))}
        </div>
      </div>
      {status && <p>{status}</p>}
    </section>
  )
}
