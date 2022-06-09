<<<<<<< HEAD
import { Card } from "native-base";
import React from "react";

export default function HomeCard(props) {
  return <Card width={"xs"}>{props.children}</Card>;
=======
import { Card} from "native-base";
import React from "react";

export default function HomeCard(props) {
  return (
    <Card>
      {props.children}
    </Card>
  );
>>>>>>> 50f849129b07feff822bd9689e1943985a76fa48
}
