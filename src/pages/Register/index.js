import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './styles.css';
import { useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [sus, setSus] = useState('');
    const [road, setRoad] = useState('');
    const [number, setNumber] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [cep, setCep] = useState('');
    const [uf, setUf] = useState('');

        const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data= {
            name,
            email,
            cpf,
            password,
            birthDate,
            phone,
            sus,
            road,
            number,
            district,
            city,
            cep,
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

    useEffect(() => {

        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        
        .then(response => {
          console.log(response)
          setRoad(response.data.logradouro)
          setCity(response.data.localidade)
          setDistrict(response.data.bairro)
          setUf(response.data.uf)
        })
        
        .catch((response)=>{

        })
    }, [cep]);

  
   function _onFocus(e) {
        e.currentTarget.type = "date";
    }
    function _onBlur(e){
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = "Data de Nascimento";
    }

    return (

        <div className="register-container">
            <div className="content">

                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e agende sua vacinação em uma unidade atendimento mais próxima.</p>
              
                </section>

                <form onSubmit={handleRegister}>

                    <input placeholder="Nome Completo" 
                    value={name}
                    onChange = {e => setName(e.target.value)}
                    />
                    
                    <input type="email" placeholder="E-mail"
                     value={email}
                     onChange = {e => setEmail(e.target.value)}
                     />
                     
                     <input type="number" placeholder="CPF"
                     value={cpf}
                     onChange = {e => setCpf(e.target.value)}
                     />
                     <input type="password" placeholder="Senha" 
                    value={password}
                    onChange = {e => setPassword(e.target.value)}
                    />
                     
                    <input type="text" placeholder="Data de Nascimento"
                    value={birthDate}
                    onChange = {e => setBirthDate(e.target.value)}


                    onFocus = {_onFocus} onBlur={_onBlur}/>
                    
                    <input type="number" placeholder="Telefone" 
                    value={phone}
                    onChange = {e => setPhone(e.target.value)}
                     />
                    <input type="number" placeholder="N° Cartão SUS" 
                    value={sus}
                    onChange = {e => setSus(e.target.value)}
                     />
                    <div className="input-group">
                        <input placeholder="Rua" 
                        value={road}
                        onChange = {e => setRoad(e.target.value)}
                         />
                        <input placeholder="Numero" style={{ width: 130 }} 
                        value={number}
                        onChange = {e => setNumber(e.target.value)}
                        />
                        
                    </div>


                    <div className="input-group">
                    <input placeholder="Bairro" style={{ width: 220 }} 
                        value={district}
                        onChange = {e => setDistrict(e.target.value)}
                         />
                     
                        <input placeholder="Cidade" 
                        value={city}
                        onChange = {e => setCity(e.target.value)}
                        />
                        </div>

                    <div className="input-group">
                    <input placeholder="CEP" 
                        value={cep}
                        onChange = {e => setCep(e.target.value)}
                        />
                       
                     
                        <input placeholder="UF" style={{ width: 80 }} 
                        value={uf}
                        onChange = {e => setUf(e.target.value)}
                        />
                        
                    </div>



                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
        


    )

}