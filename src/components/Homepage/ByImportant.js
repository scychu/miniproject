import React from "react";
import {Link} from "react-router-dom";
import "../../style/sass/Dashboard.scss";
import FormAdd from "./FormAdd";
import TodoList from "./TodoList";
import {FaUserCircle} from "react-icons/fa";
import NoContent from "./NoContent";
import axios from "axios";
import NewTodoApp from "./NewTodoApp";


const baseUrl = "https://team-g-miniproject.herokuapp.com/api/v1/tasks/important"
class ByImportant extends React.Component {
    state={
        newLists:[]
    }
    addNewList = (name,important,completed) => {
        const newTodo = {
            name:name,
            important:important,
            completed:completed
        }
        console.log(newTodo)
        this.setState({
            newLists:[...this.state.newLists, newTodo]
        })
    }
    delLists = async (id) => {
        const token = localStorage.getItem('token')
        try{
            const res = await axios.delete(`https://team-g-miniproject.herokuapp.com/api/v1/tasks/(id)`, {
                headers: {
                    Authorization :token
                }
            })
            this.setState({newLists: this.state.newLists.filter(list => list.id !==id)
            })
            console.log(id)
        }
        catch (err){
            console.log(err)
        }
    }
    logoutClick = e => {
        localStorage.removeItem('token');
        this.props.history.push("/")
    }
    
    getAllTask = async () => {
        const token = localStorage.getItem("token")
        try{
            const res = await axios.get(`${baseUrl}`, {
                headers: {
                    Authorization :token
                }
            })
            this.setState({newLists: res.data.data.tasks})
            console.log(res.data)
        } catch(error){
            console.log(error)
        }
    }
    componentDidMount(){
        this.getAllTask()
    }

    render(){
        return(
            <div className="homepage-wrapper">
                <div className="header">
                    <div className="header-nav">
                    <Link to ="/sign-in" className="link" ><button onClick={()=> {this.logoutClick()}}>SIGN OUT</button></Link>
                    </div>
                </div>
                <div className="content">
                    <div className="left-nav">
                        <div className="user-profile">
                            <FaUserCircle className="user-image"/>
                            <div className="edit-profile">
                                <h3>User Name</h3>  
                                <Link to="/" className="link">Edit profile</Link>
                            </div>
                        </div>
                        <div className="nav-menu">
                            <ul>
                                <li><Link to="/my-day" className="link myday-section" id="my-day">My Day</Link></li>
                                <li><Link to="/important" className="link important-section">Important</Link></li>
                                <li><Link to="/completed" className="link completed-section">Completed</Link></li>
                            </ul>
                        </div>
                    </div>
                    {/* <NewTodoApp/> */}
                    <div className="main-content">
                        <FormAdd add={this.addNewList} todo={this.state.newLists} />
                        <div className="task-list">
                            <div className="todo-title">
                                <h6>Task</h6>
                                <h6>Important</h6>
                            </div>
                            <div className="todo-lists">
                                {!this.state.newLists.length ? <NoContent/> : <TodoList todo={this.state.newLists} delLists={this.delLists}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ByImportant;