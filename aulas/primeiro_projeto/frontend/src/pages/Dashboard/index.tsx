import React from 'react';

import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => (
  <>
    <img src={logoImg} alt="Github Explorer" />
    <Title> Explore Repositorios no Github</Title>
    <Form action="">
      <input placeholder="Digite o nome do repositório" />
      <button>Enviar</button>
    </Form>
    <Repositories>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/1161565?s=460&u=39d8251a7defffbb73343024d4184952b1e205c6&v=4"
            alt="Pedro Moreno"
          />
          <div>
            <strong>rocketseat/unform</strong>
            <p>Easy peasy ...</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      ))}
    </Repositories>
  </>
);

export default Dashboard;
