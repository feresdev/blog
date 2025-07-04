import Image from 'next/image'

export default function Logo({ width, height, altura, isWhite }) {
  return (
    <Image src={`${!isWhite ? '/lg_blog.png' : '/lg_blog.png'}`} width={width} height={height} alt="Logo Blog" className={`h-${altura}`} />
  )
}
