import React from 'react';
import Appbar from '../Appbar/Appbar';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <div>
            <header>
                <Appbar />
            </header>
            <main className="container-fluid">
                {children}
            </main>
        </div>
    );
};

export default Layout;