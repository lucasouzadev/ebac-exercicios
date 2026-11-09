import React from 'react'
import { Link } from 'react-router-dom'

export default function Brand() {
  return <Link to="/" aria-label="efood, início">
    <img className="brand" src={import.meta.env.BASE_URL + 'efood.svg'} width="126" height="58" alt="efood" />
  </Link>
}
