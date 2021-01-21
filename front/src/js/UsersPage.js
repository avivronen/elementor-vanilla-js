import UsersList from "./UsersList.js";
import Modal from "./Modal.js";
import Component from "./Component.js";
import restApiFaker from './restApiFaker/restApiFaker.js';

export default class UsersPage extends Component{

    componentId = 'dashboard';

    state = {
        users : [],
        intervalLoaded : false
    }

    //UsersList module class
    UsersList = null;

    constructor(APP) {
        super(APP);
        this.addEventListeners({name: 'beforeunload', cb: this._setOffline});
    }


    async render() {
        const html = `<h1>Welcome ${this.APP.state.USER.name}</h1>
                ${this.inlineComponentHtml('UsersList', this.UsersList)}
            `;

        await this.updateDom( html, this.componentId );
        await this.refresh();
        return true;
    }

    /**
     * @Todo implement ajax call to set offline.
     * @param e
     * @returns {Promise<null>}
     */
    _setOffline (e) {
        (e || window.event).returnValue = null;
        return null;
    }

    async _getUsers() {
        console.log('called getUsers');
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        };

        try {
            // Faking for now
            //const res = await fetch(this.APP.API_URL + 'users/', settings);
            const users = restApiFaker.fetchFakerUsers();

            this.state.users = users;
            this.UsersList = new UsersList(this.APP, {Users: this.state.users, userClick: this.userClickHandler}, true);


        } catch(e) {
            return [];
        }
    }

    /**
     * @todo not for production, should use sockets, or pushing channels instead.
     * @returns {Promise<void>}
     */
    async refresh() {
        console.log('Starting...');
        if(!this.state.intervalLoaded) {
            await this._refresh();
            this.state.interval = setInterval(async () => {
              await this._refresh();
            }
       , 3000);
            this.state.intervalLoaded = true;
       }
    }

    async _refresh() {
        await this._getUsers();
        await this.UsersList.render();
    }

    _pauseRefresh() {
        console.log('Pausing...');
        clearInterval(this.state.interval);
        this.state.intervalLoaded = !this.state.intervalLoaded;
    }

    async _fetchUserData(username) {
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        };

        try {
            // Faking for now
            const res = await fetch(this.APP.API_URL + 'user/' + username, settings);
            const uData = {
                'username': username,
                'loginTime': 'loginTime3',
                'lastUpdate': '12312321',
                'IP': 'IP3',
                'userAgent': 'sdfsdfdsfsd',
                'registerOn': 'sdfsdfsd',
                'loginsCount': 5
            }
            return uData;
        } catch (e) {
            return false;
        }
    }

    userClickHandler = async (e) => {
        e.preventDefault();
        this._pauseRefresh();
        const uData = await this._fetchUserData(e.target.id.substring(1));

        const html = `
            User Agent, Register time, LoginsCount
            <h3>${uData.username}</h3>
        `;

        //open modal
        const modalObject = new Modal(this.APP, {modalID: 'userInfo', show: true, html: html, modalCloseCallback: this.userModalCloseHandler});
        modalObject.render();
    }

    userModalCloseHandler = () => {
        console.log('refresh starting again');
        this.refresh();
    }
}
