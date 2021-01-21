import  Router  from './Routes.js';

class App {
    HTML = document.querySelector('#Main');
    // @TODO should export to .env config
    API_URL = 'http://localhost:4001/backend/';
    ERROR = null;
    Router = new Router(this);

    /**
     * @TODO should use javascript PROXY here amd implement setState, getState ech..
     */
    state = {
        USER: null,
    }

    async render() {
        if(!this.state.USER) {
            await this.Router.dispatch('login');
        }
    }

    async setPage(callback) {
        callback = await callback();
        const page = new callback.default(this);
        return await page.render();
    }
}

const app = new App();
app.render();



