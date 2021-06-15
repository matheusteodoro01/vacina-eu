import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profile() {
    const ongName = localStorage.getItem('ongName');
    const token = localStorage.getItem('Authorization');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    useEffect(() => {

        api.get('agendamentos', {
             headers: {
               Authorization: token,
            }
        }).then(response => {
            
            setIncidents(response.data);
            console.log(response.data[0].finalizado)
          
        })
    }, [token]);


    async function handleDeleteIncident(id) {

        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: token,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id))

        } catch (error) {
            alert('Erro ao deletar caso, tente novamente!')
        }

    }
    function handleLogout() {
        localStorage.clear();
        history.push('/')

    }
    return (

        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo, {ongName}</span>

                <Link className="button" to="/agendar">Agendar Nova Vacina</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />

                </button>
            </header>

            <h1>Sua Carteira de Vacina</h1>

            <ul>
                { incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Vacina</strong>
                        <p>{incident.observações}</p>
                        <strong>Data</strong>
                        <p>{incident.data}</p>
                        <strong>Unidade de Atendimento</strong>
                        <p>{incident.unidadeAtendimento.nome}</p>
                        <strong>Status</strong>
                        <p>{incident.finalizado}</p>
                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="a8a8b3" />
                        </button>
                    </li>
                ))} 
            </ul>



        </div>




    )


}