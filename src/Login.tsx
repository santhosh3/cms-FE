import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setAccessToken } from './authStore';

export default function LoginSuccess({ onLogin }: { onLogin: () => void }) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        
        if (token) {
            setAccessToken(token); 
            onLogin();             
            navigate('/', { replace: true }); 
        } else {
            navigate('/login', { replace: true });
        }
    }, [searchParams, navigate, onLogin]);

    return <div>Authenticating...</div>;
}