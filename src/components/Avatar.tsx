type Props = {
  src: string
}

export const Avatar = ({ src }: Props) => {
  return (
    <div className="avatar">
      <img src={src} />
    </div>
  )
}
