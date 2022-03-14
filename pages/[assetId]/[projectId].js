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
    const {project} = getProjectByDocId(props.projectRef.projectId)
    // const projectId = router.query.projectId
    useEffect(() => {
        console.log(project)
    }, [project]);
    // console.log(props)
  return (
    <div>Project Page{/* {[projectId]} */}</div>
  )
}

export default ProjectPage;