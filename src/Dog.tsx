import { text } from 'node:stream/consumers'
import { FC, useState, useEffect, useMemo, useCallback } from 'react'

export interface IDog {
  id: string
  name: string
  image: string
  likes: number
}

const containerStyles: any = {
  alignItems: 'center',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  height: '0',
  paddingBottom: '20%',
  width: '20%'
}

const textStyle: any = {
  color: '#fff'
}

interface Props extends IDog {
  key: string
  updateBreed: any
}

const Dog: FC<Props> = ({ id, name, likes, image, updateBreed }) => {
  const [bgImage, setBgImage] = useState(image)

  useEffect(() => {
    setBgImage(image)
  }, [image])

  return (
    <button
      onClick={() => {
        updateBreed({ id, likes: likes + 1 })
      }}
      style={{ ...containerStyles, backgroundImage: `url(${bgImage})` }}
    >
      <h3 style={{ ...textStyle, fontSize: '1.5em', fontWeight: 600 }}>{name}</h3>
      <p style={{ ...textStyle, fontSize: '3.25em', fontWeight: 700 }}>{likes}</p>
    </button>
  )
}

export default Dog
