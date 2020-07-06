import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AsyncSelect from 'react-select/async';
import { Button, Header } from "semantic-ui-react";
import "../../addP.css";

function EditProject(props) {
    const [title, setTitle] = useState(null);
    const [promo, setPromo] = useState(null);
    const [introduction, setIntro] = useState(null);
    const [tags, setTags] = useState(null);
    const [tools, setTools] = useState(null);
    const [details, setDetails] = useState(null);
    //const [keywords, setkw] = useState([]);
    let history = useHistory();
    //const addkeyword = keywords => {
    //  setkw([keywords]);
    //}


    const getProject = async () => {
        const id = props.match.params.id
        let url = 'http://localhost:8000/posts/'+id+'/';
        let token = localStorage.getItem("token")
        let options = {
                    method: 'get',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization' : 'Bearer '+ token
                    },
                };
        let response = await axios(options);
        let responseOK = response && response.status === 200 ;
        if (responseOK) {
            setTitle(response.data.title)
            setPromo(response.data.promo)
            setIntro(response.data.introduction)
            setTools(response.data.tools)
            setTags(response.data.tags)
            setDetails(response.data.details)
        }
    }

    const editProject = async () => {
        const id = props.match.params.id
        let url = 'http://localhost:8000/posts/'+id+'/edit/';
        let token = localStorage.getItem("token")
        let options = {
                    method: 'PUT',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization' : 'Bearer '+ token
                    },
                    data: {title,promo,introduction,tags,tools,details}
                };
        let response = await axios(options);
        let responseOK = response && response.status === 200 ;
        if (responseOK) {
            history.replace('/teacher/MyProjects');
        }
    }
    
    useEffect(()=> {
        if (localStorage.getItem('type')!=='teacher'){
            history.push('/Forbiden')
        }
        getProject();
    },[]);
    return(
        <div className="auth-main">
          <div class="auth-content">
                <div className="auth-card">
                  <Header as="h2" color="black" textAlign="center">
                          Edit project    
                      </Header>
                      <form class="ui form">
                    <input type="text" name="title" value={title} onChange={(event)=>{setTitle(event.target.value)}} /></form><br/>
                    <form class="ui form">
                    <select value={promo} onChange={(event)=>{setPromo(event.target.value)}}>
                        <option>2CPI</option>
                        <option>1CS</option>
                        <option>2CS</option>
                        <option>3CS</option>
                    </select> </form> <br/>
                    <form class="ui form">
                    <textarea rows="4" cols="50" type="text" name="introduction"  value={introduction} onChange={(event)=>{setIntro(event.target.value)}} /> 
                    </form><br/>
                    <form class="ui form">
                    <textarea rows="4" cols="50" type="text" name="tools" value={tools} onChange={(event)=>{setTools(event.target.value)}} />
                    </form><br/>
                    <form class="ui form">
                    <textarea rows="10" cols="50" type="text" name="details" value={details} onChange={(event)=>{setDetails(event.target.value)}} />
                    </form><br/>
                    <form class="ui form">
                    <input type="text" name="keywords" value={tags} onChange={(event)=>{setTags(event.target.value)}} /> <br/>
                    </form><br/>
                    <Button class="ui button" color="blue" size="huge" type="submit" onClick={()=>{editProject()}}>edit</Button>
                  </div>
                  </div>
              </div>
        );
}

export default EditProject;