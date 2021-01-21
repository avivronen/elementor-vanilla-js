import Component from "./Component.js";

export default class loginView extends Component{

    componentId = 'login';

    constructor(APP) {
        super(APP);
    }

    async render() {
        this.addEventListeners({selector: '#submit_button', name: 'click', cb: this._submitForm});
        await this.updateDom(this._getHtml(), this.componentId);
    }

     _getHtml() {
        return (
            `<h1>Login</h1>
                    <form id="login">
                        <input class="InputElement" type="text" id="login_username" placeholder="Type your username" required />
                        <input class="InputElement"  type="password" id="login_password" placeholder="Type your password" required />
                        <input class="Button" type="submit" id="submit_button" value="Login" />
             </form>`
        )
    }

    _submitForm = async (event) => {
        event.preventDefault();
        console.log(this);
        if(!this._validate()) {
            alert('form error');
        }

        const user = await this._login();

        if(user) {
            await this._saveUSER(user);
            await this.APP.Router.dispatch('dashboard');
            return true;
        }

        return false;
    }

    /**
     * @TODO save JWT token to local storage and not only state
     * @param user
     * @returns {Promise<void>}
     */
    _saveUSER = async (user) => {
        this.APP.state.USER = user;
    }

    _login = async () => {

        const data = {
            username: this.escape(document.querySelector('#login_username').value),
            password: this.escape(document.querySelector('#login_password').value),
        }

        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        try {
            //Fake request.
            //const res = await fetch(this.APP.API_URL + 'login/', settings);
            //and faking results
            return {
                name: this.escape(data.username),
                JWT: '123123123'
            };
            //const data = await res.json();

        } catch(e) {
            this.APP.Error = e;
            return false;
        }
    }

    /**
     * @TODO implment a generic validation for all forms
     * @returns {boolean}
     */
    _validate() {
        return true;
    }


}
