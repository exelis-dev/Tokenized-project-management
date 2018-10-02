import React from 'react'
import AcceptProject from './AcceptProject'
import Theme from './Theme'
import Navbar from './Navbar'
import Page from './Page'
import User from './User'
import AddProject from './AddProject'
import CompleteProject from './CompleteProject'
import ProjectStatus from './ProjectStatus'
import TokenStatus from './TokenStatus'
import VerifyProject from './VerifyProject'
import ProjectAdminStatus from './ProjectAdminStatus'
import PublicProjects from './PublicProjects'
import MyProjects from './MyProjects'

class Content extends React.Component {
  render() {
    return (
      <div>
        <h3>Welcome {this.props.user} </h3> <h3> TOKENS: {this.props.token} </h3>
        <Theme candidates={this.props.candidates}  
        		addUser={this.props.addUser} 
        		token={this.props.token}
                addProject={this.props.addProject} 
                admin={this.props.admin}
                user={this.props.user}
                acceptProject={this.props.acceptProject} 
                completeProject={this.props.completeProject} 
                verifyProject={this.props.verifyProject}
                tokenStatus={this.props.tokenStatus}/>
        <hr/>
        <p> Account: {this.props.account}</p>
        Click Here to Log Out -> <form onSubmit={this.props.change}>
          LOGOUT<input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default Content
