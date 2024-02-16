const AuthLayout =  ({children}: {children: React.ReactNode}) => {
    return(
        <div className=" flex p-3 bg-slate-50 items-center justify-center">
            {children}
        </div>
    )
}
export default AuthLayout