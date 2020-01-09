import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from "enzyme";

import configureMockStore from "redux-mock-store";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Visitors } from '../Visitors'

let visitors = [{
    _id: 1,
    name : 'John Doe',
    notes : 'test first',
    signOutTime : new Date('02/09/2019').toDateString()
},
    {
        _id: 2,
        name : 'Esteban Arango',
        notes : 'Frisbee and Vegan food',
        signOutTime : new Date('04/24/2019').toDateString()
    },
    {
        _id: 3,
        name : 'Ryan Labouve',
        notes : 'Everything about Oklahoma',
        signOutTime : null,
        signedOut: null,
        _id :122
    },
    {
        _id: 4,
        name : 'Esteban Arango',
        notes : 'Frisbee and Vegan food',
        signedOut: true,
        signedIn : true,
        signOutTime : new Date('04/24/2019').toDateString()
    },
    {
        _id: 5,
        name : 'Esteban Arango',
        notes : 'Frisbee and Vegan food',
        signedOut: true,
        signedIn : false,
        signOutTime : new Date('04/24/2019').toDateString()
    }];

const visitorsWithNull = [];

// For Redux
Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const store = mockStore({
    venues : visitors
});


describe("Visitor Container Component :: ", () => {

    it("for multiple entries", () => {

        // Act
        let component = renderer.create(
            <table>
            <tbody>
                <Visitors visitors={visitors}/>
            </tbody>
            </table>
        );

        // Assert
        expect(component).toMatchSnapshot();

        component = mount(
            <Visitors visitors={visitors}/>
        );

        expect(component.find('.one').length).toEqual(5);
        expect(component.find('.two').length).toEqual(5);
        expect(component.find('.three').length).toEqual(5);

    });


    it("for no visitors", () => {

        // Act
        let component = renderer.create(
            <table>
            <tbody>
             <Visitors visitors={visitorsWithNull}/>
            </tbody>
            </table>
        ).toJSON();
        // snapshot
        expect(component).toMatchSnapshot();


        component = mount(
            <Visitors visitors={visitorsWithNull}/>
        );

        expect(component.find('.flex-grow').text()).toContain('No visitors in system');
    });

});

