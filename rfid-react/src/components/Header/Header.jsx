import logo from "../../img/logo1.png"
function Header(){
    return(
        <header className="d-flex flex-column align-items-center">
            <img src={logo} alt="" style={{width:"500px"}} className="mt-5"/>
        </header>
    )
}
export default Header