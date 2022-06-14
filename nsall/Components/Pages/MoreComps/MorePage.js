import { Box, Button, Text } from "native-base";
import React from "react";

const moreData = [{
  id:1,
  directory:"Emart",
  title:"Emart"
},{
  id:2,
  directory:"Videos",
  title:"Videos"
},{
  id:3,
  directory:"Tips",
  title:"Tips"
}]

export default function MorePage({navigation}) {
  const handleNav = (directory) => {
    navigation.navigate(directory)
  }
  return (
    <Box safeArea>
      {moreData.map(({id,directory,title})=>{
        return(<Button key={id} onPress={()=>handleNav(directory)}>{title}</Button>)
      })}
    </Box>
  );
}
