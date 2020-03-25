import React, {useState} from 'react';
import { Link,useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    
    const history = useHistory();

    const ngoId = localStorage.getItem('ngoId');

    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        };

        try{
            await api.post('incident', data, {
                headers: {
                    Authorization: ngoId
                }
            });
            history.push('/profile');
        } catch(err) {
            alert('Error!')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt= "Be The Hero"></img>
                    <h1>Register new incident</h1>
                    <p>Describe the incident to find a hero to solve it.</p>
                
                    <Link className='back-link' to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Back
                    </Link>
                </section>
                
                <form onSubmit={handleNewIncident}>
                    <input placeholder="Incident Title" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                    <input placeholder="Value" value={value} onChange={e => setValue(e.target.value)} />

                    <button className="button" type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}