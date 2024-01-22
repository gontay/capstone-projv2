import { useSession } from "next-auth/react";

export const useCurrentCoach=() => {
    const session = useSession();

    return session.data?.user.coach;
}