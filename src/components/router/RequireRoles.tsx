import { useAppSelector } from "@app/hooks/reduxHooks";
import { WithChildrenAndRolesProps, WithChildrenProps } from "@app/types/generalTypes";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireRoles: React.FC<WithChildrenAndRolesProps> = ({ children, roles }) => {
    const user = useAppSelector((state) => state.user.user);
    const location = useLocation();
    return roles?.find((role) => user?.userRole === user?.userRole) ? (
        <Outlet />
    ) : (<Navigate to="/rejected" state={{ from: location }} replace />)
}

export default RequireRoles;