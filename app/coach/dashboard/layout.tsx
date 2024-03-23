import SideMenubar from "@/components/coach/side-menubar"

const CoachDashboardLayout =  ({children}: {children: React.ReactNode}) => {
    return(
       
        <div className="flex w-full bg-slate-50">
        <div className="w-1/7">
            <SideMenubar/>
        </div>
            <div className="w-fit items-center justify-center">
                {children}
            </div>

        </div>
    )
}
export default CoachDashboardLayout