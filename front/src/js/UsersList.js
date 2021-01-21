import Table from "./Table.js";
import Component from "./Component.js";

export default class UsersList extends Component{

    componentId = 'UsersList';

    state = {
        Users: null
    }

    constructor(APP, Props, mounted) {
        super(APP, Props);
        this.Props = Props;
        this.state.Users = this.Props.Users;
        if(mounted) {
            this.imInlineComponent(this.render);
        }
    }

    async render() {
        await this.subscribe();
        await this.updateDom(await this.getHtml(), this.componentId);
    }

    async subscribe() {
        this.state.Users.forEach((u, i) => {
            this.addEventListeners({selector: "#u"+u.username, name: 'click', cb: this.Props.userClick});
        });
    }

    getHtml() {
        if(!this.state.Users) {
            return `None Online or loading`;
        };

        const tHeaders = ['USERNAME','LoginTime','Last Update', 'IP'];
        const tValues = [];
        this.state.Users.forEach((u, i) => {
            tValues.push([
                `<a href="#" id="u${this.escape(u.username)}">${this.escape(u.username)}</a>`,
                `${u.loginTime}`,
                `${u.lastUpdate}`,
                `${u.IP}`
            ]);
        });
        const tableHTML = new Table(tHeaders, tValues);
        return (
            tableHTML.tableHTML
        );
    }
}
