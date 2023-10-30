import { useEffect, useState } from "react"
import Header from "../components/Header/Header"
import axios from "axios"

function App() {
  const [uid, setUid] = useState("")
  const [cadastros, setCadastros] = useState([])
  const [cadastrado, setCadastrado] = useState(false)  //função para recuperar os Uid do fiware
  const recuperaUid = async () => {
    const config = {
      headers: { 
        'fiware-service': 'smart', 
        'fiware-servicepath': '/', 
        'accept': 'application/json'
      }
    }
    try{
      const response = await axios.get("http://46.17.108.113:1026/v2/entities/urn:ngsi-ld:Pathfinder/attrs/uid", config);
      setUid(response.data.value);

      //Verifica se o uid existe dentro dos cadastros
      cadastros.forEach((cadastro)=>{
        if (cadastro.id === uid){
          setCadastrado(true)
          console.log("cara bom")
        }
        else{
          setCadastrado(false)
          console.log("cara ruim")

        }
      })
      console.log(cadastrado)
    }catch(erro){
      console.error(erro);
      console.log(cadastrado)
    }
  }
  //Função para recuperar os cadastros do JSON do json-server
  const recuperaCadastros = () =>{
    axios.get("http://localhost:3000/tags/")
    .then((resposta)=>{
      setCadastros(resposta.data)
    })
    .catch((erro)=>{
      console.log(erro)
    })
  }
  
  useEffect(()=>{
    recuperaCadastros()
  },[])
  return (
    <>
      <Header />
      <h2>Aproxime seu cartão no sensor e clique em verificar cadastro</h2>
      <button onClick={recuperaUid}>Verificar cadastro</button>
    </>
  )
}

export default App
