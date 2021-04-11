import './MainFormComponent.css'
import HeaderComponent from '../header/HeaderComponent'
import BodyFormComponent from '../body-form/BodyFormComponent'
function MainFormComponent(props){

    return (
        <div className="main-app">
            <HeaderComponent/>
            <BodyFormComponent/>
        </div>
    );
}

export default MainFormComponent;