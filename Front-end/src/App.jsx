import {Container,Navbar,Nav} from "react-bootstrap"
import {Route,Routes,Link} from "react-router-dom"
import Home from "./pages/Home"
import logo from './imagens/logo.png';
import ListaSalva from "./componentes/listaSalva"
import SalvarMaterial from "./componentes/salvarMaterial"





function App() {
  

  return (
    
    <>
    <Container className="d-flex justify-content-center" > <img src={logo} alt="planeta verde" style={{  width: '250px', height: '250px'  }}/></Container>

    <Navbar className="bg-dark" variant="dark">
      
      <Container>
      <Navbar.Brand as={Link} to ="/">
      <h1 >Planeta Verde</h1>
      </Navbar.Brand>
      <Nav className="me-auto">

        
        <Nav.Link as={Link} to ="/adicionar"> <i className="bi bi-plus-circle"></i>Adicionar Material</Nav.Link>
        
        <Nav.Link as={Link} to ="/listar"> Lista de Materiais</Nav.Link>

        
        

      </Nav>
      </Container>
    </Navbar>
      
      <Container className="mt-4" >
        <Routes>
          <Route path="/" element ={<Home/>}></Route>
          <Route path="/listar" element ={<ListaSalva/>}></Route>
          <Route path="/adicionar" element ={<SalvarMaterial/>}></Route>

        </Routes>
        </Container>  

        
 
         


  </>  
  )
}

export default App
