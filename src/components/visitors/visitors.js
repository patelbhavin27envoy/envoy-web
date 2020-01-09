import React, {Component} from 'react';
import PropTypes from 'prop-types'; 

import { Visitor } from '../Visitor';

class Visitors extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let visitors = this.props.visitors;

        let listOfVisitors =  null;
        if(visitors && visitors.length >0) {

            listOfVisitors = visitors.map((visitor) =>
                <Visitor key={visitor._id} visitor={visitor}/>
            );
        }
        return ( 
            <React.Fragment> 
            
            { visitors && visitors.length === 0 && <div className="flex-grow h-screen overflow-y-scroll error">
                <div className="no-visitors">No visitors in system!! </div>
                </div> }
            { visitors && visitors.length>0 &&<div className="flex-grow h-screen overflow-y-scroll">

            <div className="mx-auto">

                <div className="mt-8">
                    <table className="w-full">

                        <thead>
                            <tr>
                                <th className="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Name</th>
                                <th className="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Notes</th>
                                <th className="text-sm font-semibold text-grey-darker p-1 bg-grey-lightest">Signed out</th>
                            </tr>
                        </thead>

                        <tbody className="align-baseline">
                            {listOfVisitors}
                        </tbody>
                    </table>

                </div>
            </div>
    </div> }
    </React.Fragment> )
    }
}

Visitors.propTypes = {
    visitors: PropTypes.array
};

export default Visitors;
