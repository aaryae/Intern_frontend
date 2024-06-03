import { useEffect, useState } from 'react';
import { ToasterType } from 'types/global.types';

interface ToasterProps {
    type: ToasterType;
}

const Toaster = ({ type }: ToasterProps) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`toaster ${visible ? 'fade-in' : 'fade-out'}`}>
            {type === ToasterType.Success && (
                <div className="toaster-content success">
                    Success!
                </div>
            )}
            {type === ToasterType.Error && (
                <div className="toaster-content error">
                    Error!
                </div>
            )}
        </div>
    );
};

export default Toaster
