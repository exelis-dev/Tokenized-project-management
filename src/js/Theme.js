import React from 'react'
import Navbar from './Navbar'
import Page from './Page'
class Theme extends React.Component{

		constructor(props){
			super(props);
			this.handleChange = this.handleChange.bind(this);
			if(this.props.admin){
			this.state = {
		     currentPage : 'about'
		    };}else{
		    this.state = {
		     currentPage : 'publicProjects'
		    };
		    }
		}

		handleChange(page){
			this.setState({currentPage: page});
		}
		

		render(){
		return(	<div>
				<Navbar currentPage={this.state.currentPage} adminProj={this.props.adminProj} admin={this.props.admin} brand='EXELIS' change={this.handleChange} />
				<Page currentPage={this.state.currentPage} 
					candidates={this.props.candidates}
					token={this.props.token}
					addUser={this.props.addUser} 
					user={this.props.user}
					admin={this.props.admin}
					addProject={this.props.addProject} 
	                acceptProject={this.props.acceptProject} 
	                completeProject={this.props.completeProject} 
	                verifyProject={this.props.verifyProject}
	                tokenStatus={this.props.tokenStatus}/>
			</div>
			)
		}
	}
export default Theme