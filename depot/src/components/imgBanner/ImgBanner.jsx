import React from 'react'

export default function ImgBanner({src , name}) {
  return (
    <div className='imgBanner'>
      <img src={src} alt={name} />
      <h4>{name}</h4>
    </div>
  )
}
