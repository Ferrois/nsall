import { Card } from 'native-base'
import React from 'react'

export default function HomeCard(props) {
  return (
    <Card>{props.children}</Card>
  )
}
