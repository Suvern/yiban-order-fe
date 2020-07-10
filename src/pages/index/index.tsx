import {View} from "@tarojs/components";
import React from "react";
import {AtButton} from "taro-ui";
import {validateCUMT} from "../../util/api_util";

const Index = () => {

  const onTap = async () => {
    let result = await validateCUMT({
      username: '04171180',
      password: 'a821589498wmr'
    })
    console.log(result)
  }

  return (
    <View>
      <AtButton
        onClick={onTap}
      >
        fuck
      </AtButton>
    </View>
  )
}

export default Index
