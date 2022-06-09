import { Card } from "native-base";
import React from "react";

export default function HomeCard(props) {
  return <Card width={"xs"}>{props.children}</Card>;
}
