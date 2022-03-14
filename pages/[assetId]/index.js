import React,{useEffect} from 'react'
import {useRouter} from 'next/router'


export async function getServerSideProps(context){
  console.log(context.query) 
  // returns { id: episode.itunes.episode, title: episode.title}
  

  //you can make DB queries using the data in context.query
  return {
      props: { 
         assetRef: context.query/* .projectRef */ //pass it to the page props
      }
  }
}

function Assetpage(props) {
    // const router =useRouter()
    // const assetId = router.query.assetId
    useEffect(() => {
      console.log(props)
    }, [props]);
  return (
    <div>Assetpage{/*  {[assetId]} */}</div>
  )
}

export default Assetpage