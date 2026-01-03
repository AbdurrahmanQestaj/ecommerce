import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa"; // ikonat

function Login({ toggle }){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password){
            setError("Ju lutem plotësoni të gjitha fushat");
            return;
        }
        if (!email.includes("@")){
            setError("Email-i nuk është valid");
            return;
        }
        setError("");
        alert("Login i suksesshëm")
    };


    return (
        <div 
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            }}
        >
            <div
            className="card p-5 shadow-lg"
            style={{ width: "400px", borderRadius: "20px"}}
            >
                <h2 className="text-center mb-4 text-primary fw-bold">Login</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 position-relative">
                        <FaEnvelope
                        className="position-absolute"
                        style={{ top: "50%", left: "10px", transform: "translateY(-50%)"}}
                        />
                        <input
                        type="email"
                        placeholder="Email"
                        className="form-control ps-5"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 position-relative">
                        <FaLock
                        className="position-absolute"
                        style={{top: "50%", left: "10px", transform: "translateY(-50%)" }}
                        />
                        <input 
                            type="password"
                            placeholder="Password"
                            className="form-control ps-5"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            />
                    </div>


                    <button
                    type="submit"
                    className="btn btn-primary w-100 fw-bold"
                    style={{ transition: "0.3s"}}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#6a11cb")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "")}
                    >Login
                    </button>
                </form>


                <div className="text-center mt-3">
                    <span>Nuk ke llogari?</span>
                    <button className="btn btn-link p-0" onClick={toggle}>
                        Regjistrohu
                    </button>
                </div>
            </div>
        </div>
    );
}


export default Login;