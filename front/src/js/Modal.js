import Component from "./Component.js";

class Modal extends Component{

    componentId = 'Modal';

    constructor(APP, props) {
        super(APP);
        this.props = props;
    }

    render() {
        const div = this._createDivObj();
        this.APP.HTML.appendChild(div);
        this._addCloseEventHandler();
    }

    getHTML() {
        return (
           `<div id=${this.props.modalID}>
               <div class="Backdrop" id="close-${this.props.modalID}"></div>
               <div
                   class='Modal'
                   style={{
                       transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                       opacity: this.props.show ? '1' : '0'
                   }}
               >
                   ${this.props.html}
               </div>
           </div>`
        );
    }

    _addCloseEventHandler() {
        const modalCloseHandler = () => {
            document.querySelector(`#${this.props.modalID}`).remove();

            if(this.props.modalCloseCallback) {
                this.props.modalCloseCallback();
            }
        }
        document.querySelector(`#close-${this.props.modalID}`).addEventListener('click', modalCloseHandler);
    }

    _createDivObj() {
        const div = document.createElement('div');
        div.innerHTML = this.getHTML();
        return div;
    }
}

export default Modal;