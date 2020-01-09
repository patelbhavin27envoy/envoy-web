import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import { entryService } from '../../services/entryService';


import './visitorForm.scss';

// In future I will try to use 'react-hook-form'
// import userForm from 'react-hook-form';

class VisitorForm extends Component {

    constructor(props) {

        super(props);

        this.state = {
            'generalError' : null,
            'firstName' : '',
            'firstNameError' : null,
            'lastName' : '',
            'lastNameError' : null,
            'note' : '',
            'noteError' : null,
            'error': null,
            'loading' : false
        };

        // For fields and related error state
        this.updateFirstName = this.updateFirstName.bind(this);
        this.updateLastName = this.updateLastName.bind(this);
        this.updateNote = this.updateNote.bind(this);

        // create new entry
        this.createNewEntry = this.createNewEntry.bind(this);
        this.updateStateBeforeSendingRequest = this.updateStateBeforeSendingRequest.bind(this);

        // To reset the form
        this.resetForm = this.resetForm.bind(this);
        this.goBack = this.goBack.bind(this); // i think you are missing this
    }

    goBack(event){

        if(event) {
            event.preventDefault();
        }
        // if(window && window.history) {
        //     window.history.back();
        // }

        // This is not working
        // So, I will have to introduce a specific route for homepage.
        if(this.props.history && this.props.history.length === 2) {
            this.props.history.go("/");
        }
        this.props.history.goBack();
    }

    resetForm(event) {
        if(event) {
            event.preventDefault();
        }
        this.setState ({
            'generalError' : null,
            'firstName' : '',
            'firstNameError' : null,
            'lastName' : '',
            'lastNameError' : null,
            'note' : '',
            'noteError' : null,
            'error': null
        });
    }

    createNewEntry(event) {

        if(event) {
            event.preventDefault();
        }

        // do the validations
        this.updateStateBeforeSendingRequest();

        if(this.state.error ||
            this.state.firstName.trim() === "" ||
            this.state.lastName.trim() === "" ||
            this.state.note.trim() === "") {
            return;
        }

        const visitor = {
            name : this.state.firstName + " " + this.state.lastName,
            notes: this.state.note
        };

        this.setState({
            loading: true
        });

        return entryService()
            .create(visitor)
            .then((data) => {
                // if(window && window.history) {
                //     window.history.back();
                // }
                this.goBack();
            })
            .catch((error) => {

                this.setState({
                    error: 'Sorry! we had some problem with your request.',
                    'loading' : false
                })
            });
    }

    updateStateBeforeSendingRequest() {
        if(this.state.firstName === '' ) {
            this.setState({
                firstNameError : true,
                error : true
            });
        }

        if(this.state.lastName === '' ) {
            this.setState({
                lastNameError : true,
                error : true
            });
        }

        if(this.state.note === '' ) {
            this.setState({
                noteError : true,
                error : true
            });
        }
    }

    updateFirstName(e) {
        this.setState({
            'firstName' :e.target.value
        });
    }
    updateLastName(e) {
        this.setState({
            'lastName' :e.target.value
        });
    }
    updateNote(e) {
        this.setState({
            'note' :e.target.value
        });
    }

    isLoading() {
        return this.state.error === null && this.state.venues === null;
    }

    render() {

        const errorText = {
            firstName : 'Please fill out first name.',
            lastName : 'Please fill out last name.',
            note : 'Please fill out note.'
        };

        const { firstName, firstNameError, lastName, lastNameError,
                    note,      noteError,    error, generalError} = this.state;

        return (<React.Fragment>
                <div className="header">

                    <img
                        src="https://dashboard.envoy.com/assets/images/logo-small-red-ba0cf4a025dd5296cf6e002e28ad38be.svg"
                        alt="Envoy Logo" width="31" className="py3 block logo"/>

                    <div className="form-name ml-2">
                        Welcome to Envoy!!
                    </div>

                </div>

                { this.isLoading() && 
                    <div className="resultset" >
                        <div className={"loader"}></div>
                    </div> 
                }

                <div className="new-visitor">

                    <h3 className="details">
                        Add Details For Your Visit.
                    </h3>


                    <form className="field">

                        {firstNameError &&
                            <div className="element-container redLighter">
                                <span className="tag"></span>
                                <span className="error firstName w-full">{errorText.firstName}</span>
                            </div>
                        }
                        <div className="element-container">
                            <span className="tag">First Name </span>
                            <input type="text" className="firstName p-2 text-sm border  w-full"
                                   placeholder="First Name" value={this.state.firstName} name='firstName' onChange={this.updateFirstName} />
                        </div>


                        {lastNameError &&
                        <div className="element-container redLighter">
                            <span className="tag"></span>
                            <span className="error lastName w-full">{errorText.lastName}</span>
                        </div>
                        }

                        <div className="element-container">
                            <span className="tag">Last Name </span>
                            <input type="text" className="lastName p-2 text-sm border  w-full"
                               placeholder="Last Name" value={this.state.lastName} name='lastName' onChange={this.updateLastName} />
                        </div>


                        {noteError &&
                        <div className="element-container redLighter">
                            <span className="tag"></span>
                            <span className="error note w-full">{errorText.note}</span>
                        </div>
                        }

                        <div className="element-container">
                            <span className="tag">Note</span>
                            <textarea rows="4" cols="40" className="note p-2 text-sm border w-full"
                               placeholder="What brings you here today?" value={this.state.note} name='lastName' onChange={this.updateNote} />

                        </div>

                        <div className="btn-container">

                            <a href='#' className="float-left go-back redLighter" onClick={this.goBack} > Back </a>

                            <button className="btn  btn--brand ml-2 float-right save" onClick={this.createNewEntry}><i
                                className="fas fa-user"></i>&nbsp;&nbsp;Save
                            </button>
                            <button className="btn  btn--brand ml-2 float-right reset" onClick={this.resetForm}>
                                reset
                            </button>
                        </div>

                    </form>
                </div>
                </React.Fragment>
        );
    }
}

export default withRouter(VisitorForm);
