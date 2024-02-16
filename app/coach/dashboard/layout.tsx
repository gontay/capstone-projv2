import SideMenubar from "@/components/coach/side-menubar"

const CoachDashboardLayout =  ({children}: {children: React.ReactNode}) => {
    return(
       
        <div className="flex w-full bg-slate-50">
         <SideMenubar/>
            <div className="items-center justify-center">
                {children}
            </div>

        </div>
    )
}
export default CoachDashboardLayout