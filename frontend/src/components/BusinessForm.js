import { useState } from "react";
import axios from "axios";

export default function BusinessForm({ darkMode }) {

    const [form, setForm] = useState({
        name: "",
        company: "",
        phone: "",
        email: "",
        website: "",
        image: ""
    });

    const [qr, setQr] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            const res = await axios.post("http://localhost:5000/api/card", form);
            setQr(res.data.qrCode);
            setSuccess(true);
        } catch (error) {
            alert("Something went wrong!");
        }

        setLoading(false);
    };
    const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
    };

    if (file) {
        reader.readAsDataURL(file);
    }
};


    return (
        <div className="row justify-content-center">
            <div className="col-md-6">

                <div className={`card shadow-lg p-4 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className={`form-control ${darkMode ? "bg-dark text-light border-light" : ""}`}

                                placeholder="Enter your name"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                       <label className="form-label">Upload Image</label>
                       <input
                          type="file"
                          className={`form-control ${darkMode ? "bg-dark text-light border-light" : ""}`}

                          accept="image/*"
                          onChange={handleImage}
                       />
                        </div>


                        <div className="mb-3">
                            <label className="form-label">Company</label>
                            <input
                                type="text"
                                name="company"
                                className={`form-control ${darkMode ? "bg-dark text-light border-light" : ""}`}

                                placeholder="Company name"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                className={`form-control ${darkMode ? "bg-dark text-light border-light" : ""}`}

                                placeholder="Phone number"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className={`form-control ${darkMode ? "bg-dark text-light border-light" : ""}`}

                                placeholder="Email address"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Website</label>
                            <input
                                type="text"
                                name="website"
                                className={`form-control ${darkMode ? "bg-dark text-light border-light" : ""}`}

                                placeholder="Website URL"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`btn w-100 ${darkMode ? "btn-info" : "btn-primary"}`}
                             disabled={loading}
                        >
                            {loading ? "Generating..." : "Generate QR Code"}
                        </button>

                    </form>
                    {form.image && (
                       <div className="text-center mt-3">
                         <h6>Image Preview</h6>
                              <img
                               src={form.image}
                               alt="Preview"
                               className="img-thumbnail"
                               style={{ width: "150px" }}
                      />
                    </div>
             )}


                    {success && (
                        <div className="alert alert-success mt-4 text-center">
                            QR Code Generated Successfully!
                        </div>
                    )}

                    {qr && (
                        <div className="text-center mt-3">
                            <h5 className="mb-3">Your QR Code</h5>
                            <img
                                src={qr}
                                alt="QR Code"
                                className="img-fluid border rounded p-2"
                            />
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}
