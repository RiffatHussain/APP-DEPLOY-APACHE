
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
   const navigate = useNavigate();

   const handleClose = () => {
    navigate('/');
   }

  return ( 
    <div className="login-page vh-100 bg-white d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <button type="button" className="btn-close position-absolute top-0 end-0 bg-white me-2 mt-2" onClick={handleClose}></button>
        <div className="card bg-dark text-white p-4 shadow" style={{ width: "100%", maxWidth: "300px"}}>
            <h3 className="text-center mb-4">Login</h3>
            <form>
                <div className="mb-3">
                    <label for="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter your username" />
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <p className="text-center mt-3">
                Not registered? <a href="/" className="text-decoration-none">Create an account</a>
            </p>
        </div>
    </div>
    </div>
  );
};

export default LoginPage;
