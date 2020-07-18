import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Button} from "semantic-ui-react";
import HorNavbar from '../HorNavbar';
import { Link } from "react-router-dom";
function MyProjects() {

    const [posts, setPost] = useState([]);
    //const [approuved, setapr] = useState(null);
    //const [id, setid] = useState(null);
    let history = useHistory();

    const getprojects = async () => {
        let url = 'http://localhost:8000/posts/myprojects/';
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
        await axios(options).then(res => {
            const response = res.data;
            setPost(response)
        })
    }

    const deleteProject = async (index) => {
        let url = 'http://localhost:8000/posts/'+index+'/delete/';
        let token = localStorage.getItem("token")
        let options = {
                    method: 'DELETE',
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
            getprojects();
        }
    }
    const editProject = async (index) => {
        let url = 'http://localhost:8000/posts/'+index+'/edit/';
        let token = localStorage.getItem("token")
        let options = {
                    method: 'PUT',
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
            history.replace('/teacher/MyProjects');
        }
    }

    const EditButton = (props) =>{
        const approuved = props.approuved
        const id = props.id
        console.log(approuved)
        if (approuved!=='true'){
            return <Link
            to={{
              pathname: "/teacher/editProject/"+id+"/",
            }}
            > 
            <Button color='green' >edit topic</Button> </Link>
        }
        else {return null}
    }

    useEffect(()=> {
        if (localStorage.getItem('type')!=='teacher'){
            history.push('/Forbiden')
        }
        getprojects();
    },[]);
    return(
            <React.Fragment>
                <HorNavbar type={localStorage.getItem('type')} islogged={localStorage.getItem('token')}/>
                <header className="App-header">
                  <p>
                    my Projects
                  </p>
                </header>
                <div>
                        {posts.map((post,index) => {
                        //    setapr(post.approuved)
                        //    setid(post.id)
                        return <div>
                                <h2 class="ui top attached header">{post.title}</h2>
                                <div class="ui attached segment">
                                <h3>promo : {post.promo}</h3>
                                <h3>created at : {post.creating_date}</h3>
                                <h3>introduction : {post.introduction}</h3>
                                <h3>tools : {post.tools}</h3>
                                <h3>tags : {post.tags}</h3>
                                <h3>details :{post.details}</h3>
                                <h3>approuved : {String(post.approved)}</h3>
                                <Button color='red' onClick={()=>{deleteProject(post.id)}}>delete topic</Button>
                                <EditButton approuved={String(post.approved)} id={post.id} />
                                </div>
                            </div>
                    })}
                </div>
              </React.Fragment>
        );
    }

export default MyProjects;
