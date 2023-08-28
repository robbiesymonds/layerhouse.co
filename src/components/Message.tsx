import { Loader } from '@components/Loader'
import classNames from 'classnames'

type Props = {
  content: string
  loading?: boolean
  sent?: boolean
}

export const Message = ({ content, loading, sent }: Props) => {
  const cn = classNames('message', { sent })

  if (loading) {
    return (
      <div className={cn} style={{ whiteSpace: 'normal' }}>
        <Loader />
      </div>
    )
  }

  return <div className={cn} dangerouslySetInnerHTML={{ __html: content }} />
}
