import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [whitelistEmail, setWhitelistEmail] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [receiverEmail, setReceiverEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [loadingWhitelist, setLoadingWhitelist] = useState(false);
    const [loadingSend, setLoadingSend] = useState(false);
    const [whitelistMessage, setWhitelistMessage] = useState('');
    const [sendMailMessage, setSendMailMessage] = useState('');

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const handleWhitelistSubmit = async (e) => {
        e.preventDefault();
        setLoadingWhitelist(true);
        setWhitelistMessage('');
        try {
            const response = await axios.post(`${apiBaseUrl}/api/whitelist`, { email: whitelistEmail });
            console.log('Whitelist response:', response.data);
            setWhitelistMessage('Whitelisting email sent to address successfully, accept it to proceed further');
        } catch (error) {
            console.error('Error whitelisting email:', error);
            setWhitelistMessage('Failed to whitelist email.');
        } finally {
            setLoadingWhitelist(false);
        }
    };

    const handleSendMail = async (e) => {
        e.preventDefault();
        setLoadingSend(true);
        setSendMailMessage('');
        try {
            const response = await axios.post(`${apiBaseUrl}/api/send-mail`, {
                senderEmail: senderEmail,
                recipientEmail: receiverEmail,
                subject: subject,
                body: body
            });
            console.log('Send mail response:', response.data);
            setSendMailMessage('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            setSendMailMessage('Failed to send email.');
        } finally {
            setLoadingSend(false);
        }
    };

    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
            <div className="bg-white shadow-md rounded p-4 mb-6 w-[60vw]">
                <h2 className="text-xl font-bold mb-4">Whitelist an Email</h2>
                <form onSubmit={handleWhitelistSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={whitelistEmail}
                            onChange={(e) => setWhitelistEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={loadingWhitelist}
                    >
                        {loadingWhitelist ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
                {whitelistMessage && (
                    <p className="mt-4 text-green-500">{whitelistMessage}</p>
                )}
            </div>

            <div className="bg-white shadow-md rounded p-4 w-[60vw]">
                <h2 className="text-xl font-bold mb-4">Send an Email</h2>
                <form onSubmit={handleSendMail}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Sender Email</label>
                        <input
                            type="email"
                            value={senderEmail}
                            onChange={(e) => setSenderEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Receiver Email</label>
                        <input
                            type="email"
                            value={receiverEmail}
                            onChange={(e) => setReceiverEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Body</label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={loadingSend}
                    >
                        {loadingSend ? 'Sending...' : 'Send'}
                    </button>
                </form>
                {sendMailMessage && (
                    <p className="mt-4 text-green-500">{sendMailMessage}</p>
                )}
            </div>
        </div>
    );
};

export default Home;
