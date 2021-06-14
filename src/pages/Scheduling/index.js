import React, {useState} from 'react';
import './styles.css';
import { Link,useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api';

export default function Scheduling() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, settelefone] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

        const history = useHistory();

    async function handleScheduling(e) {
        e.preventDefault();
        const data= {
            name,
            email,
            telefone,
            city,
            uf
        }

        try {
        const response = await api.post('ongs',data)
        alert(`Seu ID de acesso: ${response.data.id}`)
        history.push('/')
    } catch(err) {
        alert('Erro no cadastro tente novamente!')
    }

    }

    return (

        <div className="register-container">
            <div className="content">

                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Agendamento</h1>
                    <p>Faça agora seu agendamento, e garanta sua vacina de forma segura e protegida.</p>
                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" />
                        Não tenho Cadastro
                        </Link>
                </section>

                <form onSubmit={handleScheduling}>

                    <input placeholder="Nome Completo" 
                    value={name}
                    onChange = {e => setName(e.target.value)}
                    />
                    <input type="email" placeholder="E-mail"
                     value={email}
                     onChange = {e => setEmail(e.target.value)}
                     />
                    <input type="number" placeholder="Telefone" 
                    value={telefone}
                    onChange = {e => settelefone(e.target.value)}
                     />
                    <input type="number" placeholder="N° Cartão SUS" 
                    value={telefone}
                    onChange = {e => settelefone(e.target.value)}
                     />
                    <div className="input-group">
                        <input placeholder="Cidade" 
                        value={city}
                        onChange = {e => setCity(e.target.value)}
                         />
                        <input placeholder="UF" style={{ width: 80 }} 
                        value={uf}
                        onChange = {e => setUf(e.target.value)}
                        />
                    </div>


                    <button className="button" type="submit">Agendar Vacina</button>
                </form>
            </div>
        </div>


    )

}