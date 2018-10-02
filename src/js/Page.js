import React from 'react'
import AcceptProject from './AcceptProject'
import User from './User'
import AddProject from './AddProject'
import CompleteProject from './CompleteProject'
import ProjectStatus from './ProjectStatus'
import TokenStatus from './TokenStatus'
import VerifyProject from './VerifyProject'
import ProjectAdminStatus from './ProjectAdminStatus'
import PublicProjects from './PublicProjects'
import MyProjects from './MyProjects'

	class Page extends React.Component{

		render(){
		return(	<div>
				<div className='container'>
					
					{(() => {
				        switch (this.props.currentPage) {
				          case "home":   return <User addUser={this.props.addUser} />;
				          case "about": return <AddProject addProject={this.props.addProject} user={this.props.user}/>;
				          case "contact": return <AcceptProject acceptProject={this.props.acceptProject}/>;
				          case "completeProject": return <CompleteProject completeProject={this.props.completeProject} user={this.props.user}/>;
				          case "verifyProject": return <VerifyProject verifyProject={this.props.verifyProject} />;
				          case "projectAdminStatus": return <ProjectAdminStatus verifyProject={this.props.verifyProject} user={this.props.user} candidates={this.props.candidates} />;
				          case "projectStatus": return <ProjectStatus candidates={this.props.candidates} />;
				          case "myProjects": return <MyProjects candidates={this.props.candidates} user={this.props.user}/>;
				          case "publicProjects": return <PublicProjects acceptProject={this.props.acceptProject} user={this.props.user} candidates={this.props.candidates} />;
				          case "tokenStatus": return <TokenStatus tokenStatus={this.props.tokenStatus} token={this.props.token}/>;
				    	}
				    })()}
					 
				</div>
			</div>
			)
		}
	}
export default Page