import { useEffect, useState } from "react"
import Header from "../components/Header/Header"
import axios from "axios"

function Home() {
  const [uid, setUid] = useState("")
  const [cadastros, setCadastros] = useState([])
  const [cadastrado, setCadastrado] = useState(true)  //função para recuperar os Uid do fiware
  const [usuario, setUsuario] = useState(false)  //função para recuperar os Uid do fiware
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
      verificaTag(cadastros, uid)
      
      if(!cadastrado){
        console.log(cadastrado)
        window.open("/cadastro", "_blank")
      }
      else{
        console.log(usuario)
        window.open(`/${usuario.username}`)
      }
    }catch(erro){
      console.error(erro);
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
  
  //Função que verifica se a tag está cadastrada no json
  const verificaTag = (cadastros, uid) =>{
    cadastros.forEach((cadastro)=>{
      if (cadastro.id == uid){
        setCadastrado(true)
        setUsuario(cadastro)
      }
      else{
        setCadastrado(false)
      }
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

export default Home
