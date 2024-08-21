import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { GlobalStyles } from './App.styled';

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyles />
      <Header></Header>
      <Footer></Footer>
    </div>
  );
};

export default App;
