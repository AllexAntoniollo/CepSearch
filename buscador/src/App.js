import {useState} from'react'
import { FiSearch} from 'react-icons/fi'
import './style.css'
import './serives/api'
import api from './serives/api'
function App() {

  const [input,setInput] = useState('') 
  const [cep,setCep] = useState('')

  async function handleSearch(){
    if(input === ""){
      alert("Preencha algum CEP.")
      return 
    }
    try {
      const response = await api.get(input+'/json')
      setCep(response.data)
      setInput('')
      
    } catch (error) {
      alert("Ops erro ao buscar.")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input onChange={(e) => setInput(e.target.value)} type="text" value={input} placeholder="Digite seu cep..."></input>
        <button onClick={handleSearch} className="buttonSearch">
          <FiSearch size={25} color="#FFF"></FiSearch>
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
      <main>
      <h2>CEP: {cep.cep}</h2>
      <span>{cep.logradouro}</span>
      <span>{cep.complemento}</span>
      <span>{cep.bairro}</span>
      <span>{cep.localidade} - {cep.uf}</span>

    </main> 
      )}

    </div>
  );
}

export default App;
