import React, { useState,useEffect } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api';



export default function NewIncident() {

    const [units, setUnits] = useState([]);
    const [unit, setUnit] = useState('');
    const [vaccines, setVaccines] = useState([]);
    const [vaccine, setVacine] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const ongId = localStorage.getItem('ongId')
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            unit,
            description,
            amount,
        }
        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })
            history.push('/profile')
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente!')
        }
    
    }

    useEffect(() => {

        api.get('units', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setUnits(response.data);
        })
    }, [unit]);

    useEffect(() => {

        api.get('vaccines', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setVaccines(response.data);
        })
    }, [vaccine]);

    return (

        <div className="new-incident-container">
            <div className="content">

                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo lote de vacinas</h1>
                    <p>Descreva a quantidade e unidade de vacinação.</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>

                   
                    <input type="text"
                    value={vaccine}
                    placeholder="Tipo de Vacina"
                    list="data"
                    onChange={e => setVacine(e.target.value)} />

                    <datalist id="data">
                        {vaccines.map((item, key) =>
                            <option key={key} value={item.displayValue} />
                           

                        )}
                         <option value="Chrome"/>
                    </datalist>

                    
                    <input type="text"
                    value={unit}
                    placeholder="Unidade de Atendimento"
                    list="data"
                    onChange={e => setUnit(e.target.value)} />

                    <datalist id="data">
                        {units.map((item, key) =>
                            <option key={key} value={item.displayValue} />
                           

                        )}
                         <option value="Chrome"/>
                    </datalist>
                  
                    <input placeholder="Quantidade"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />




                    <button className="button" type="submit">Cadastrar</button>


                </form>
            </div>
        </div>



    )

}