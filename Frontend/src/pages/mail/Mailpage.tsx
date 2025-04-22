import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const Mailpage = () => {
    const [emails, setEmails] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const navigate = useNavigate();

    const fetchEmails = async (pageToken = null) => {
        setLoading(true);
        try {
            const response = await gapi.client.gmail.users.messages.list({
                userId: 'me',
                maxResults: 50,
                pageToken: pageToken,
            });
            if (response.status === 200) {
                const messages = response.result.messages || [];
                setNextPageToken(response.result.nextPageToken || null);

                const emailDetails = await Promise.all(
                    messages.map(async (message) => {
                        const email = await gapi.client.gmail.users.messages.get({
                            userId: 'me',
                            id: message.id,
                        });
                        const headers = email.result.payload.headers;
                        const subject = headers.find(header => header.name === 'Subject')?.value || 'Sans objet';
                        const from = headers.find(header => header.name === 'From')?.value || 'Inconnu';
                        return { id: message.id, threadId: message.threadId, subject, from };
                    })
                );

                setEmails(prevEmails => [...prevEmails, ...emailDetails]);
            } else {
                console.error('Erreur lors de la récupération des emails :', response);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des emails :', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const authInstance = gapi.auth2.getAuthInstance();
            await authInstance.signIn({ prompt: 'select_account' });
            const isSignedIn = authInstance.isSignedIn.get();
            if (isSignedIn) {
                fetchEmails();
            } else {
                console.error('Utilisateur non connecté.');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion Google :', error);
        }
    };

    const handleGoogleSignOut = () => {
        const authInstance = gapi.auth2.getAuthInstance();
        authInstance.signOut().then(() => {
            authInstance.disconnect();
            setIsSignedIn(false);
            setEmails([]);
            setNextPageToken(null);
            console.log('Utilisateur déconnecté et autorisation révoquée.');
        }).catch(error => {
            console.error('Erreur lors de la déconnexion :', error);
        });
    };

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                apiKey: 'AIzaSyCtFRSeZcqKNmmCzqMixnczP_8xDq6do40',
                clientId: '647602570641-0k81fdfm2n38rlb97ahilteksl1t6ftc.apps.googleusercontent.com',
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
                scope: 'https://www.googleapis.com/auth/gmail.readonly',
            }).then(() => {
                const authInstance = gapi.auth2.getAuthInstance();
                const isSignedIn = authInstance.isSignedIn.get();
                setIsSignedIn(isSignedIn);
                if (isSignedIn) {
                    fetchEmails();
                }
            }).catch(error => {
                console.error('Erreur lors de l\'initialisation de gapi :', error);
            });
        };

        gapi.load('client:auth2', initClient);
    }, []);

    const loadMoreEmails = () => {
        if (nextPageToken) {
            fetchEmails(nextPageToken);
        }
    };

    const handleEmailClick = (id) => {
        navigate(`/maildetail/${id}`);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Emails" />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="max-w-7xl mx-auto">
                        {!isSignedIn ? (
                            <button
                                type="button"
                                className="btn btn-primary text-sm btn-sm px-12 py-12 w-100 radius-8 d-flex align-items-center gap-2 mb-16"
                                onClick={handleGoogleSignIn}
                            >
                                <Icon
                                    icon="mdi:google"
                                    className="icon text-lg line-height-1"
                                />
                                Se connecter avec Google
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-danger text-sm btn-sm px-12 py-12 w-100 radius-8 d-flex align-items-center gap-2 mb-16"
                                onClick={handleGoogleSignOut}
                            >
                                <Icon
                                    icon="mdi:logout"
                                    className="icon text-lg line-height-1"
                                />
                                Se déconnecter
                            </button>
                        )}
                        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {emails.map((email) => (
                                <li
                                    key={email.id}
                                    className="p-4 border rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => handleEmailClick(email.id)}
                                >
                                    <h3 className="text-lg font-bold">{email.subject}</h3>
                                    <p className="text-sm text-gray-600">{email.from}</p>
                                    <p className="text-xs text-gray-400">Thread ID: {email.threadId}</p>
                                </li>
                            ))}
                        </ul>
                        {nextPageToken && (
                            <div className="text-center py-16">
                                <button
                                    onClick={loadMoreEmails}
                                    className="btn btn-secondary text-sm px-16 py-8"
                                    disabled={loading}
                                >
                                    {loading ? 'Chargement...' : 'Charger plus'}
                                </button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Mailpage;