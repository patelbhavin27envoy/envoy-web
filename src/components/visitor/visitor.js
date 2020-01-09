import React, {Component} from 'react';
import entryService from '../../services/entryService';
import './visitor.scss';

class Visitor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            signOutText : 'Sign Out',
            visitor : this.props.visitor,
            loading : false,
            error: false
        };
        this.signOut = this.signOut.bind(this);
        this.callService = this.callService.bind(this);
    }

    signOut() {

        // set state for the button
        this.setState({
            loading: true,
            error: false
        });

        setTimeout(this.callService(), 100000);
    }

    callService() {

        entryService()
            .signOutVisitor(this.state.visitor._id)
            .then((data) => {

                if(data && data.status === true) {
                    return this.setState({
                        loading: false,
                        visitor: data.visitor,
                        error: false
                    });
                } else {
                    this.setState({
                        error: true,
                        'loading' : false
                    })
                }
                // This is for Redux
                // this.props.venuesReceived(data);

            })
            .catch((error) => {

                return this.setState({
                    error: true,
                    'loading' : false
                })
            });
    }

    render() {

        let { visitor : { name, notes, signOutTime, _id, signedOut, signedIn}, error} = this.state;

        let signOutColumnElement = <button className="btn btn-smaller btn--outline" onClick={this.signOut}>
                                        Sign out
                                    </button>;
        if(signedOut === true && signedIn === true) {
            signOutColumnElement = signOutTime;
        }

        if(this.state.loading === true) {
            signOutColumnElement = "loading ...";
        }

        return (
                    <tr>
                        <td className="p-2 border-t border-grey-light font-mono text-xs one">{name} </td>
                        <td className="p-2 border-t border-grey-light font-mono text-xs two">{notes}</td>
                        <td className="p-1 border-t border-grey-light font-mono text-xs three">
                            {signOutColumnElement}

                            {this.state.error && (
                                    <div className='error red'>
                                            <div>Error Updating!!</div>
                                            <div >Try later!!</div>
                                    </div>
                                )
                            }
                        </td>
                    </tr>
        )
    }
}

export default Visitor;
