import { Role } from "../roles.service";
import { User } from "../users.service";

export interface RoleView {
    id: number;
    name: string;
    colour: string;
    users: string[];
}

const roleToUserNames = (roleId: number, users: User[]): string[] =>
    users && users
        .filter(u => u.roles && u.roles.includes(roleId))
        .map(x => x.name)
        .sort();

const orderByName = (roleViews: RoleView[]) =>
    roleViews.sort((x, y) => x.name > y.name ? 1 : x.name < y.name ? -1 : 0);

export const rolesToRoleViews = (roles: Role[], users: User[]): RoleView[] =>
    orderByName(roles.map<RoleView>(role => ({
        id: role.id,
        name: role.name,
        colour: role.colour,
        users: roleToUserNames(role.id, users)
    })));
