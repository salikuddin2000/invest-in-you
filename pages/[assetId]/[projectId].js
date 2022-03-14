import React,{useEffect} from 'react'
import {useRouter} from 'next/router'
import { getProjectByDocId } from '../../backend/project';


export async function getServerSideProps(context){
    console.log(context.query) 
    // returns { id: episode.itunes.episode, title: episode.title}
    

    //you can make DB queries using the data in context.query
    return {
        props: { 
           projectRef: context.query/* .projectRef */ //pass it to the page props
        }
    }
}
function ProjectPage(props) {
    // const router = useRouter()
    // const projectId = router.query.projectId
    useEffect(() => {
        console.log(props.projectRef.projectId)
        getProjectByDocId(props.projectRef.projectId)
    }, [props]);
    // console.log(props)
  return (
    <div>Project Page{/* {[projectId]} */}</div>
  )
}

export default ProjectPage;