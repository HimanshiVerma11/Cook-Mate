import React from 'react'
import Lottie from 'lottie-react';
import LoaderAnimation from './LottieLoader.json';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export default function Animation(){
  return(
  <DotLottieReact
      src="https://lottie.host/db337183-0020-4f16-a04e-73a1781d99e5/d1BvLcfJci.lottie"
      loop
      autoplay
    />
  )
}
