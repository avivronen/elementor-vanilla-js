import Component from "./Component.js";

class Routes extends Component{

    dispatch =  async (route) => {
        let r = this.routing();
        r = await r[route];
        return await this.APP.setPage(r);
    }

    routing =  () => {
        return {
            login: async () => {
                const loginView = await import('./LoginView.js');
                return loginView;
            },
            dashboard: async () => {
                const dashboard = await import('./UsersPage.js');
                return dashboard;
            }
        }
    }
}

export default Routes;
