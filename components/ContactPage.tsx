
import React from 'react';

const ContactInfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-indigo-400 mb-3">{title}</h3>
        <div className="text-gray-300 space-y-1">
            {children}
        </div>
    </div>
);

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-white">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ContactInfoCard title="Librarian-in-Charge">
            <p>Dr. Rakesh Verma</p>
            <p>Head Librarian</p>
        </ContactInfoCard>

        <ContactInfoCard title="Contact Details">
            <p><strong>Phone:</strong> +91-731-2361116</p>
            <p><strong>Email:</strong> library.iet@davv.ac.in</p>
        </ContactInfoCard>
        
        <ContactInfoCard title="Library Address">
            <p>Institute of Engineering & Technology,</p>
            <p>Devi Ahilya Vishwavidyalaya, Khandwa Road,</p>
            <p>Indore, Madhya Pradesh 452017</p>
        </ContactInfoCard>
        
        <div className="lg:col-span-3">
             <ContactInfoCard title="Operating Hours">
                <div className="grid grid-cols-2 gap-2">
                    <p><strong>Monday - Friday:</strong></p><p>9:00 AM - 6:00 PM</p>
                    <p><strong>Saturday:</strong></p><p>9:00 AM - 2:00 PM</p>
                    <p><strong>Sunday:</strong></p><p>Closed</p>
                    <p><strong>Book Issuance/Return:</strong></p><p>9:00 AM - 5:00 PM (Mon-Fri)</p>
                </div>
            </ContactInfoCard>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
