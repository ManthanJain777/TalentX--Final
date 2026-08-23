import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import api from '../api/api';

const OnboardingGuard = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isComplete, setIsComplete] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkPassport = async () => {
            try {
                const res = await api.get('/passports/me');
                if (res.data && res.data.profileCompleteness > 0) {
                    setIsComplete(true);
                } else {
                    setIsComplete(false);
                }
            } catch (err) {
                console.error("Failed to check passport completeness", err);
                setIsComplete(false);
            } finally {
                setLoading(false);
            }
        };
        
        // Skip check if already on passport page to avoid loops
        if (location.pathname === '/candidate/passport' || location.pathname === '/candidate/passport/edit') {
            setLoading(false);
        } else {
            checkPassport();
        }
    }, [location.pathname]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen text-cover animate-pulse">Initializing Talent Passport...</div>;
    }

    if (!isComplete && location.pathname !== '/candidate/passport' && location.pathname !== '/candidate/passport/edit') {
        return <Navigate to="/candidate/passport" replace />;
    }

    return children;
};

export default OnboardingGuard;
