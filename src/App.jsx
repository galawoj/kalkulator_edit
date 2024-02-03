

import ContextProvider from './store/app-cart-context'
import Intro from "./components/Intro/Intro";

import Login from "./components/Login/Login";
import NavigationPanel from './components/Navigation/NavigationPanel';
import MainContainer from './components/Container/MainContainer';
import CalculatorModule from './components/Container/CalculatorModule';


function App() {


  return (

    <ContextProvider>

      <MainContainer>

        <Login />
        <Intro />
        <CalculatorModule />

      </MainContainer>


      <NavigationPanel />

    </ContextProvider>

  )
}

export default App;
