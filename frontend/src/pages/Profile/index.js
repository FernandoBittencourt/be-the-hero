import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';


import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const ngoId = localStorage.getItem('ngoId');
    const ngoName = localStorage.getItem('ngoName');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ngoId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ngoId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incident/${id}`, {
                headers: {
                    Authorization: ngoId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert("ERROR!")
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Welcome, {ngoName}</span>

                <Link className="button" to="/incidents/new">Create a new incident</Link> 
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Recorded Incidents</h1>
            <ul>
                { incidents.map(incident =>(
                    <li key={incident.id}>
                        <strong>INCIDENT:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIPTION:</strong>
                        <p>{incident.description}</p>
                        
                        <strong>VALUE:</strong>
                        <p>{ Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#A8A8B3" />
                        </button>
                    </li> 
                ))}               
            </ul>
            <p></p>
        </div>
    );
}