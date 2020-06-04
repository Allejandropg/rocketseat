import React, {useState} from 'react';
import Header from './components/Header'

import montanha from './assets/montanha.jpeg'
import './App.css';
function App(){
  const [ projects, setProjects] = useState(['Desenvolvimento de app', 'Front-end web']);
  function handleAddProject(){
    setProjects([...projects,`Novo projeto ${Date.now()}`]);
    console.log(projects);
  }
  return ( 
    <>
      <Header title="ReactJS" /> 
      <img src={montanha} alt="imagem de uma montanha para teste"/>
      <ul>
        {projects.map(project => <li key={project}>{project}</li>)}
      </ul>
      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}

export default App;