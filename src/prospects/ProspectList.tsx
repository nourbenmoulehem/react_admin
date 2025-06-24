// ProspectList.tsx
import { usePermissions } from "react-admin";
import { ProspectListDefault } from "./ProspectListDefault";
import { ProspectListChargeeOp } from "./ProspectListChargeeOp";

export const ProspectList = () => {
    const { permissions } = usePermissions();
    console.log("🚀 ~ ProspectList ~ permissions:", permissions)

    if (permissions === "CHARGEE_OP") {
        return <ProspectListChargeeOp  />;
    }
    return <ProspectListDefault  />;
};
