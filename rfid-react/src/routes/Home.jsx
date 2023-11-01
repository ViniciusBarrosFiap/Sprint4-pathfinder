import { useEffect, useState } from "react"
import Header from "../components/Header/Header"
import axios from "axios"
import Button from 'react-bootstrap/Button';
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
    try {
      const response = await axios.get("http://46.17.108.113:1026/v2/entities/urn:ngsi-ld:Pathfinder/attrs/uid", config);
      setUid(response.data.value);
      verificaTag(cadastros, uid)

      if (!cadastrado) {
        console.log(cadastrado)
        window.open("/cadastro", "_blank")
      }
      else {
        console.log(usuario)
        window.open(`/${usuario.id}`)
      }
    } catch (erro) {
      console.error(erro);
    }
  }

  //Função para recuperar os cadastros do JSON do json-server
  const recuperaCadastros = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tags/")
      setCadastros(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  //Função que verifica se a tag está cadastrada no json
  const verificaTag = (cadastros, uid) => {
    cadastros.forEach((cadastro) => {
      if (cadastro.id == uid) {
        setCadastrado(true)
        setUsuario(cadastro)
      }
      else {
        setCadastrado(false)
      }
    })
  }
  useEffect(() => {
    recuperaCadastros()
  }, [])


  return (
    <section style={{ height: "100vh", backgroundColor: "#0E4B4F", }}>
      <div className="d-flex flex-column align-items-center">
        <Header />
        <h2 className="text-center mt-4 text-white" style={{width:"50%"}}>Aproxime seu cartão no sensor e clique em verificar cadastro</h2>
        <Button onClick={recuperaUid}variant="primary" style={{width:"46%", marginTop:"1em", backgroundColor:"#F7DE09", border:"none", color:"black", fontSize:"15px"}}>Verificar cadastro</Button>{' '}
      </div>
    </section>
  )
}

export default Home
