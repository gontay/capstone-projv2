import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth"
import { UserRole } from "@prisma/client";

const AdminDashboardPage = async() => {
    const role = await currentRole();
    return(
        <div>
        <RoleGate allowedRole={UserRole.ADMIN} mode="redirect">
            something
        </RoleGate>
        </div>
    )
}
export default AdminDashboardPage