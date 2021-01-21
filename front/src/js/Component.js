class Component {

    _mounted = false;
    _onBeforeMountCBS = null;
    _eventListeners = [];
    _hasInlineComponent = [];

    constructor(APP) {
        this.APP = APP;
    }

    addEventListeners(event) {
        this._eventListeners.push(event);
    }

    async updateDom(HTML, componentId) {
        if(!componentId) {
            console.log('WARNING, NO COMPONENT ID, not loading!');
            //this.APP.HTML.innerHTML = HTML;
        }
        else {
            if(!this._mounted) {
                console.log('Mounting' + componentId + 'For the first time');
                HTML = this._wrapWithId(HTML, componentId);
                this.APP.HTML.innerHTML = HTML;
                this._addOnBeforeMounts();
                this._mounted = true;
            } else {
                console.log(componentId, 'Already mounted, only changing inner div to save performance');
                document.querySelector(`#${componentId}`).innerHTML = HTML;
            }
        }
        this._addEvents();
        await this._renderInlineComponents();
    }

    onBeforeMount(callback) {
        this._onBeforeMountCBS = callback;
    }

    imInlineComponent(render) {
        this._mounted = true;
        this._hasInlineComponent.push(render.render);
    }

    inlineComponentHtml(componentId) {
        return `<div id="${componentId}"></div>`;
    }

    _addEvents() {
        if (this._eventListeners.length > 0) {
            this._eventListeners.forEach((ev, i) => {
                if(!ev.selector) {
                    window.addEventListener(ev.name, ev.cb);
                }
                else {
                    document.querySelector(ev.selector).addEventListener(ev.name, ev.cb);
                }
            })
            this._eventListeners = null;
            this._eventListeners = [];
        }
    }

    _wrapWithId(HTML, id) {
        return `<div id=${id}>${HTML}</div>`;
    }

    async _renderInlineComponents() {
        if(this._hasInlineComponent.length > 0) {
            this._hasInlineComponent.forEach((comp) => {
                comp;
            });
            this._hasInlineComponent = null;
            this._hasInlineComponent = [];
        }
    }

    _addOnBeforeMounts() {
        if(this._onBeforeMountCBS){
            this._onBeforeMountCBS();
        }
    }

    escape(t) {
        const map = {
            '"': '&quot;',
            "'": '&#039;',
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            ';': ' '
        };

        return t.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
}

export default Component;