import Image from "next/image"

const Developer = () => {
  return (
    <>
      <Image src={'/assets/img/developer_2.png'} width={750} height={450} alt='image' placeholder="blur" blurDataURL="data:image/png;base64,[IMAGE_CODE_FROM_PNG_PIXEL]"/>
    </>
  )
}

export default Developer;