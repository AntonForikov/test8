import AppBar from './components/AppBar/AppBar';
import {Route, Routes} from 'react-router-dom';
import Add from './containers/Add/Add';
import Home from './containers/Home/Home';
const App = () => {

  return (
    <>
      <AppBar/>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-quote" element={<Add edit={false} />} />
          <Route path="/quote/:id/edit" element={<Add edit={true} />} />
          {/*<Route path="/add" element={<Add edit={false} />} />*/}
          {/*<Route path="/posts/:id" element={<Post/>} >*/}
          {/*  <Route path="edit" element={<Add edit={true} />}/>*/}
          {/*</Route>*/}
          {/*<Route path="/about" element={<About />} />*/}
          {/*<Route path="/contacts" element={<Contacts />} />*/}
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
