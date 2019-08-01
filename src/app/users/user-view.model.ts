import { Role } from "src/app/roles.service";
import { User } from "src/app/users.service";

export interface UserRoleView {
    name: string;
    colour: string;
}

export interface UserView {
    id: number;
    name: string;
    roles: UserRoleView[];
}

const roleToUserViewRole = (role: Role): UserRoleView => ({
    name: role.name,
    colour: role.colour
});

const rolesToUserViewRoles = (roleIds: number[], roles: Role[]): UserRoleView[] =>
    roleIds && roleIds
        .map(roleId => roles.find(r => r.id === roleId))
        .filter(x => x).map<UserRoleView>(roleToUserViewRole);

const orderByName = (userViews: UserView[]) =>
    userViews.sort((x, y) => x.name > y.name ? 1 : x.name < y.name ? -1 : 0);

export const usersToUserViews = (users: User[], roles: Role[]): UserView[] => {
    return orderByName(users.map<UserView>(user => ({
        id: user.id,
        name: user.name,
        roles: rolesToUserViewRoles(user.roles, roles)
    })));
};
