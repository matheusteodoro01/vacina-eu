import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profile() {
    const ongName = localStorage.getItem('ongName');
    const [incidents, setIncidents] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [unidadesAtendimento, setUnidadesAtendimento] = useState([]);
    const token = localStorage.getItem('Authorization')
    const email = localStorage.getItem('Email')
    const history = useHistory();
    if (!token) {
        history.push('/')
    }

    function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
    }

    useEffect(async () => {

        await api.get(`usuarios/findByEmail?email=${email}`, {
        })
            .then(async response => {
                console.log(response)
                setUsuario(response.data)
                listarAgendamentos(response.data.id)
            })
            
    }, [token]);

    function listarAgendamentos(id) {
        api.get(`agendamentos/usuario?id=${id}`, {
        }).then(response => {
            setIncidents(response.data);
        })
        api.get(`unidade_atendimento`, {
        }).then(response => {
            console.log(response.data)
            setUnidadesAtendimento(response.data)

        })
    }


    function handleLogout() {
        localStorage.clear();
        history.push('/')

    }
    return (

        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo, {usuario.nome}</span>

                <Link className="button" to="/agendar">Agendar Nova Vacina</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />

                </button>
            </header>

            <h1>Sua Carteira de Vacina</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Vacina</strong>
                        <p>{incident.observações}</p>
                        <strong>Data</strong>
                        <p>{convertDate(incident.data)}</p>
                        <strong>Unidade de Atendimento</strong>
                        <p>{unidadesAtendimento[0].nome}</p>
                        <strong>Status</strong>
                        <p>Agendado</p>

                    </li>
                ))}
            </ul>



        </div>




    )


}