import React, { FC } from 'react'

interface Props {
  title: string
}

const ComponentTemplate: FC<Props> = ({ title }) => {
  return <>{title}</>
}

export default ComponentTemplate
