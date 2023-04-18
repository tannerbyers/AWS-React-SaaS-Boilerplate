import React, { FC } from 'react'

interface Props {
  children: JSX.Element
}

const AuthenticatedTemplate: FC<Props> = ({ children }) => {
  return <div>{children}</div>
}

export default AuthenticatedTemplate
