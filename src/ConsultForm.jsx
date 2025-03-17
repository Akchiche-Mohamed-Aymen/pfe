import { useState } from 'react';
import notify from "./reusableCode";
function ConsultationForm({hide}) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        consultationType: '',
        details: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        hide()
        // تحقق من ملء جميع الحقول
        if (!formData.fullName || !formData.email || !formData.consultationType || !formData.details) {
            notify('Error' ,'error' , 'Please fill in all the required fields.');
            return;
        }

        // محاكاة نجاح الإرسال
        notify('Succes' , 'success' , `✅ Request submitted successfully! Type: ${formData.consultationType}`);
       
    };

    return (
        
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10" onClick={ e=> e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Request a Consultation</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Consultation Type</label>
                    <select
                        name="consultationType"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a type</option>
                        <option value="Financial Audit">Financial Audit</option>
                        <option value="Marketing Advice">Marketing Advice</option>
                        <option value="Financial Advice">Financial Advice</option>
                    </select>
                </div>

              
                <div>
                    <label className="block text-gray-700">Details</label>
                    <textarea
                        name="details"
                        rows="4"
                        placeholder="Describe your request"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                >
                    Submit Request
                </button>
            </form>
        </div>
       
    );
}

export default ConsultationForm;