
interface IRouteBase {
    name: string;
    sidebarVisible: boolean;
    breadcrumbVisible: boolean;
    icon?: string;
}

export interface IRoute extends IRouteBase {
    path: string; // href for app outside link
    // pageTitle?: string;
    pageTitleVisible: boolean;
    // permission: () => boolean;
    isMe?: (path: string) => boolean;
}

export interface IRouteParent extends IRouteBase {
    children: Array<IRoute | IRouteParent>;
    link?: string;
}

export type IAppRoute = Array<IRoute | IRouteParent>;

export type TBreadcrumbItem = IRouteParent | (IRoute & { itIsMe: boolean });
export type TBreadcrumb = Array<TBreadcrumbItem>;

export class AppRoute {
    private static readonly routes: IAppRoute = [
        {
            path: '/dashboard',
            name: 'dashboard',
            sidebarVisible: true,
            pageTitleVisible: true,
            breadcrumbVisible: true,
            icon: 'fa fa-dashboard',
            isMe: (path) => {
                if (path.includes('dashboard')) return true;
                return false;
            }
        },
        {
            path: '/profile',
            name: 'profile',
            sidebarVisible: true,
            pageTitleVisible: true,
            breadcrumbVisible: true,
            icon: 'fa fa-picture-o'
        },
        {
            name: 'tools',
            sidebarVisible: true,
            breadcrumbVisible: true,
            icon: 'fa fa-link',
            children: [
                {
                    path: '/blank',
                    name: 'blank',
                    sidebarVisible: true,
                    pageTitleVisible: true,
                    breadcrumbVisible: true,
                    icon: 'fa fa-file-o'
                },
                {
                    name: 'inner1',
                    sidebarVisible: true,
                    breadcrumbVisible: true,
                    icon: 'fa fa-home',
                    children: [
                        {
                            path: '/test1',
                            name: 'test1',
                            sidebarVisible: false,
                            pageTitleVisible: true,
                            breadcrumbVisible: true,
                            icon: 'fa fa-file-o'
                        },
                        {
                            path: '/test2',
                            name: 'test2',
                            sidebarVisible: true,
                            pageTitleVisible: true,
                            breadcrumbVisible: true,
                            icon: 'fa fa-file-o'
                        },
                        {
                            name: 'inner2',
                            sidebarVisible: true,
                            breadcrumbVisible: true,
                            icon: 'fa fa-home',
                            children: [
                                {
                                    path: '/test12',
                                    name: 'test12',
                                    sidebarVisible: true,
                                    pageTitleVisible: true,
                                    breadcrumbVisible: true,
                                    icon: 'fa fa-file-o'
                                },
                                {
                                    path: '/test22',
                                    name: 'test22',
                                    sidebarVisible: true,
                                    pageTitleVisible: true,
                                    breadcrumbVisible: true,
                                    icon: 'fa fa-file-o'
                                },
                            ]
                        }
                    ]
                }
            ]
        },
        {
            path: '/user/manage',
            name: 'user_manage',
            sidebarVisible: true,
            pageTitleVisible: true,
            breadcrumbVisible: true,
            icon: 'fa fa-user'
        },
        {
            name: 'user',
            sidebarVisible: false,
            breadcrumbVisible: true,
            icon: 'fa fa-user',
            link: '/user/manage',
            children: [
                {
                    path: '/user/create',
                    name: 'user_create',
                    sidebarVisible: true,
                    pageTitleVisible: true,
                    breadcrumbVisible: true,
                    icon: 'fa fa-user-plus'
                },
            ]
        }
    ];

    static getRoutes(): IAppRoute {
        return this.routes;
    }

    static getAllChildrenPath(parentRoute: IRouteParent): Array<string> {
        const list: string[] = [];
        const getPath = (children: IRouteParent['children']) => {
            children.forEach(item => {
                if ((item as any).children) {
                    getPath((item as any).children);
                } else {
                    list.push((item as IRoute).path);
                }
            });
        };
        getPath(parentRoute.children);
        return list;
    }

    static getRouteByPath(path: string): IRoute | undefined {
        let rtn: IRoute | undefined;

        const findRoute = (rs: Array<IRouteParent | IRoute>) => {
            for (let i = 0; i < rs.length; i++) {
                const r = rs[i];
                if (r.hasOwnProperty('path')) {
                    const cr = r as IRoute;
                    if (cr.isMe && cr.isMe(path)) {
                        rtn = cr;
                        break;
                    } else if (cr.path === path) {
                        rtn = cr;
                        break;
                    }
                } else if (r.hasOwnProperty('children')) {
                    findRoute((r as IRouteParent).children);
                    if (rtn) break;
                }
            }
        };
        findRoute(this.routes);

        return rtn;
    }

    static getBreadcrumbsByPath(path: string): TBreadcrumb {
        const list: TBreadcrumb = [];
        let found = false;

        const findRoute = (rs: Array<IRouteParent | IRoute>) => {
            for (let i = 0; i < rs.length; i++) {
                const r = rs[i];
                if (r.hasOwnProperty('path')) {
                    const cr = r as IRoute;
                    if (cr.isMe && cr.isMe(path)) {
                        list.push({ ...cr, itIsMe: true });
                        found = true;
                        break;
                    } else if (cr.path === path) {
                        list.push({ ...cr, itIsMe: true });
                        found = true;
                        break;
                    }
                } else if (r.hasOwnProperty('children')) {
                    findRoute((r as IRouteParent).children);
                    if (found) {
                        list.unshift(r as IRouteParent);
                        break;
                    }
                }
            }
        };
        findRoute(this.routes);

        return list;
    }

}
