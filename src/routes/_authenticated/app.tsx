// src/routes/app/index.tsx
import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import {getAllCookiesAsString} from "@/lib/cookieHelper.ts";
import LobbyNavbar from "@/components/lobby/LobbyNavbar.tsx";
import LobbySidebar from "@/components/lobby/LobbySidebar.tsx";

export const Route = createFileRoute('/_authenticated/app')({
    beforeLoad: ({context}) => {
        console.log('🔐 App middleware: checking for auth token')

        // Simple token check - just verify token exists
        const getCookies = getAllCookiesAsString();
        console.log(getCookies);
        if (!context.auth.isAuthenticated) {
            console.log('❌ No token found, redirecting to login')
            throw redirect({
                to: '/',
                search: { redirect: location.href },
            })
        }
        console.log('✅ Token found, access granted')
    },
    component: () => (

        <div className="flex h-screen  ">
            {/* LobbySidebar */}
            <LobbySidebar/>

            {/* LobbyNavbar */}
          {/*  <LobbyNavbar />*/}


            {/* Main Content */}

                    {/* Page Content */}
                    <main className="flex-1 overflow-x-hidden overflow-y-auto ">
                        <Outlet />
                    </main>
                </div>
    ),
})