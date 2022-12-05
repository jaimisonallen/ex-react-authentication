import { ChangeEvent, useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext';

export const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    if (email && password) {
      const isLogged = await auth.signin(email, password);
      if (isLogged) {
        navigate('/');
      } else {
        alert('Tente novamente!');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="text"
        value={email}
        onChange={handleEmailInput}
        placeholder="Digite o email"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordInput}
        placeholder="Digite o senha"
      />

      <button onClick={handleLogin}>Fazer Login</button>
    </div>
  );
};
