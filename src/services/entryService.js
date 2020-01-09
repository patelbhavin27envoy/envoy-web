export function entryService() {

    const endPoint = 'http://localhost:8080/api/visitors';


    function getEntries() {

        return fetch(endPoint)
            .then((res) => {
                return res.json()
            })
            .then((data) => {

                if(!data || !data.status) {
                    throw new Error('Please try again later!!');
                }
                return data.visitor;
            });
    }

    function searchEntries(searchByName) {

        const searchEndPoint = endPoint + "?name=" + searchByName;

        return fetch(searchEndPoint)
            .then((res) => {
                return res.json()
            })
            .then((data) => {

                if(!data || !data.status) {
                    throw new Error('Please try again later!!');
                }
                return data.visitor;
            });
    }


    function create (visitor) {

        return fetch(endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(visitor) // body data type must match "Content-Type" header
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {

                if(!data || !data.status) {
                    throw new Error('Please try again later!!');
                }
                return data.visitor;
            });
    }


    function signOutVisitor(id) {

        return fetch(endPoint + '/' + id, {
            method: 'put'
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(!data || !data.status) {
                    throw new Error('Please try again later!!');
                }
                return data;
            });
    }

    return {
        signOutVisitor : signOutVisitor,
        create : create,
        getEntries: getEntries,
        searchEntries : searchEntries
    };

};

export default entryService;
