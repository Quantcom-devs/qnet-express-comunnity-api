
interface IPermission {
    create: boolean;
    read: boolean;
    write: boolean;
    delete: boolean;
    roleId: string;
    resourceId: string;
}