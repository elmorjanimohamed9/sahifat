import React, { PropsWithChildren, useEffect } from 'react';
import { Navbar } from './MainHeader';
import FooterMain from './MainFooter';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    return (
        <div className={`${themeConfig.menu} ${themeConfig.layout} ${themeConfig.rtlClass} main-section antialiased relative font-nunito text-sm font-normal`}>
            <Navbar />
            <main className="min-h-screen pt-[64px] bg-slate-50 dark:bg-black">
                {children}
            </main>
            <FooterMain />
        </div>
    );
};

export default MainLayout;