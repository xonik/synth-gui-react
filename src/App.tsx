import MainPanel from './components/MainPanel';
import Keyboard from './components/Keyboard';
import { SHOW_CUT, SHOW_KEYBOARD, SHOW_MAIN_PANEL } from "./config";
import classNames from "classnames";
import './App.scss';

function App() {
  return (
    <div className={
        classNames("App", {
            'cut': SHOW_CUT
        })
    }>
        {SHOW_MAIN_PANEL && <MainPanel/>}
        {SHOW_KEYBOARD && <Keyboard/>}
    </div>
  );
}

export default App;
