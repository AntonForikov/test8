import AppBar from './components/AppBar/AppBar';
import {Route, Routes} from 'react-router-dom';
import Add from './containers/Add/Add';
import Home from './containers/Home/Home';
import Category from './components/Category/Category';
const App = () => {
  const selectOptions = [
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Motivational', id: 'motivational'},
    {title: 'Saying', id: 'saying'},
    {title: 'Humor', id: 'humor'},
    {title: 'Famous people', id: 'famous-people'},
  ];

  return (
    <>
      <AppBar/>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home selectOptions={selectOptions} />} />
          <Route path="/add-quote" element={<Add edit={false} selectOptions={selectOptions} />} />
          <Route path="/quote/:id/edit" element={<Add edit={true} selectOptions={selectOptions} />} />
          <Route path="/quote/:categoryId" element={<Category selectOptions={selectOptions} />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
