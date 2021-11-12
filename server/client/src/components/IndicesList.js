import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
    Modal, 
    Button
} from 'react-bootstrap'
import JSONInput from 'react-json-editor-ajrm';
import {locale, darktheme} from 'react-json-editor-ajrm/locale/en';

function IndicesList(props) {
    //states
    const [indicesList, setIndicesList] = useState([]) 
    const [show, setShow] = useState(false);
    const [indexSettings, setIndexSettings] = useState({})

    const getIndicesList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/indices')
            return response.data
        } catch(error) {
            console.error(error)
        }
    }

    const getIndexSettings = async index => {
        try {
            const response = await axios.get(`http://localhost:5000/api/indices/${index}`)
            return response.data
        } catch(error) {
            console.error(error)
        }
    }

    const ListItem = props => {
        const { indexName } = props
        return <p>{indexName} <button onClick={() => getIndexSettings(indexName).then(res => {
            setIndexSettings(res.body[indexName].settings.index)
            setShow(true)
        })}>open settings</button></p>
    }

    useEffect(() => {
        getIndicesList()
        .then(res => {
            setIndicesList(res)
        })
    }, [])

    return (
        <div>
           { indicesList.length > 0 ? indicesList.map((item, index) => <ListItem key={index} indexName={item.index}/>) : 'no indices found' }
            {/* Bootstrap Modal */}
            <Modal show={show}>
                <Modal.Header style={{background:'#cccc'}}>
                    <Modal.Title>Preview Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Be sure to santize the json to prevent XSS attacks */}
                    <JSONInput
                        placeholder={ indexSettings }
                        locale={ locale }
                        height={'100%'}
                        colors={{
                            default: 'light',
                            background: 'white',
                            string: 'red',

                        }}
                    />
                </Modal.Body>
                <Modal.Footer style={{background:'#cccc'}}>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setShow(false)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default IndicesList;