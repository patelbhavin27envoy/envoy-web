import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { entryService } from '../../services/entryService';

import { withRouter } from 'react-router-dom'

import { Visitors } from '../Visitors';
import { VisitorForm } from '../VisitorForm';
import './search.scss';

/* For Redux
* import { connect } from 'react-redux'
* import { actions } from '../../actions'
*/

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'searchItem' : '',
            'visitors' : null,
            'error': null,
            'inputError': false
        };
        this.newVisitor = this.newVisitor.bind(this);
        this.updateSearchItem = this.updateSearchItem.bind(this);
        this.searchVisitorEntries = this.searchVisitorEntries.bind(this);
    }

    componentDidMount() {
        entryService()
            .getEntries()
            .then((data) => {

                this.setState({
                    'visitors': data,
                    'error': null,
                    'loading' : false
                });

                // This is for Redux
                // this.props.venuesReceived(data);
            })
            .catch((error) => {

                this.setState({
                    visitors : null,
                    error: 'Sorry! we had some problem with your request.',
                    'loading' : false
                })
            });
    }

    newVisitor(event) {
        event.preventDefault();
        this.props.history.push('/visitor');
    }

    updateSearchItem (e) {

        this.setState({
            'searchItem' :e.target.value
        });
    }

    handleKeyPress(target) {
        if(target.charCode==13){
            alert('Enter clicked!!!');
        }
    }

    searchVisitorEntries(event) {
        event.preventDefault();

        // get search result from the
        entryService()
            .searchEntries(this.state.searchItem)
            .then((data) => {

                this.setState({
                    'visitors': data,
                    'error': null,
                    'loading' : false
                });

                // This is for Redux
                // this.props.venuesReceived(data);
            })
            .catch((error) => {

                this.setState({
                    visitors : null,
                    error: 'Sorry! we had some problem with your request.',
                    'loading' : false
                })
            });
    }


    isLoading() {
        return this.state.error === null && this.state.venues === null;
    }

    render(){

        const {visitors, error, inputError} = this.state;

        return (
            <React.Fragment>

                     <div className="field" role="search">
                        <div className="space-wrapper"></div>

                         <button className="btn  btn-brand float-right ml-2 new-visitor" onClick={this.newVisitor}>
                            <i className="fas fa-user"></i>&nbsp;&nbsp;New visitor
                         </button>

                         <button className="btn  btn-brand float-right ml-2 search non-mobile" type="submit" onClick={this.searchVisitorEntries}>
                            <i className="fas fa-search"></i>
                         </button>

                        <input type="text" className="search-item-m p-2 text-sm border float-right max-w-xs w-full non-mobile"
                                placeholder="Search" value={this.state.searchItem} name='searchItem' onChange={this.updateSearchItem} />
                         <img src="https://dashboard.envoy.com/assets/images/logo-small-red-ba0cf4a025dd5296cf6e002e28ad38be.svg"
                                  alt="Envoy Logo" width="31" className="py3 block" />

                        <div className="space-wrapper"></div>

                        <div className="mobile">
                                <input type="text" className="search-item-s p-2 text-sm border max-w-xs"
                            placeholder="Search" value={this.state.searchItem} name='searchItem' onChange={this.updateSearchItem} />
                                <button className="btn  btn-brand  p-2 search " type="submit" onClick={this.searchVisitorEntries}>
                                    <i className="fas fa-search"></i>
                                </button>
                        </div>
                    </div>

                    { inputError && <p className='inputError'>We can't search without your input.</p> }

                    { this.isLoading() && <div className="resultset" >
                        <div className={"loader"}></div>
                    </div> }

                    { error && <p className='inputError'>{error}</p> }
                    { visitors && <Visitors visitors={visitors} /> }


            </React.Fragment>
        )
    }

}

/* For Redux
const stateToProps = (state) => {

    return {
        venues : state.venues
    }
}

const dispatchToProps = (dispatch) => {

    return {
        venuesReceived: (venues) => {
            dispatch(actions.venuesReceived(venues));
        }
    }
}

export default connect(stateToProps, dispatchToProps)(Nav);

 */


export default withRouter(Search);
