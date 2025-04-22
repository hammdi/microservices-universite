
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gapi } from 'gapi-script';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const Maildetailspage = () => {
    const { id } = useParams(); // Récupère l'ID de l'email depuis l'URL
    const [emailDetails, setEmailDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchEmailDetails = async (emailId) => {
        setLoading(true);
        try {
            const response = await gapi.client.gmail.users.messages.get({
                userId: 'me',
                id: emailId,
            });
            if (response.status === 200) {
                const headers = response.result.payload.headers;
                const subject = headers.find(header => header.name === 'Subject')?.value || 'Sans objet';
                const from = headers.find(header => header.name === 'From')?.value || 'Inconnu';
    
                // Décodage du corps de l'email
                let body = '';
                if (response.result.payload.body?.data) {
                    body = response.result.payload.body.data;
                } else if (response.result.payload.parts) {
                    // Si le corps est divisé en parties, récupérez la partie texte
                    const part = response.result.payload.parts.find(p => p.mimeType === 'text/plain');
                    body = part?.body?.data || '';
                }
    
                // Décodage Base64URL
                const decodedBody = atob(body.replace(/-/g, '+').replace(/_/g, '/'));
    
                setEmailDetails({ subject, from, body: decodedBody });
            } else {
                console.error('Erreur lors de la récupération des détails de l\'email :', response);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des détails de l\'email :', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchEmailDetails(id);
        }
    }, [id]);

    return (

    
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Détails de l'Email" />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <p className="text-center text-gray-500">Chargement des détails de l'email...</p>
                        ) : emailDetails ? (
                            <div className="p-6 bg-white shadow-md rounded-md">
                                <h1 className="text-2xl font-bold mb-4">{emailDetails.subject}</h1>
                                <p className="text-sm text-gray-600 mb-2">
                                    <strong>De :</strong> {emailDetails.from}
                                </p>
                                <div className="mt-4">
                                    <h2 className="text-lg font-semibold mb-2">Contenu :</h2>
                                    <p className="text-gray-700 whitespace-pre-wrap">
    {emailDetails.body}
</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">Aucun détail d'email disponible.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Maildetailspage;