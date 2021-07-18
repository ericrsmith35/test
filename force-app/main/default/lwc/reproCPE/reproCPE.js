import { LightningElement, track, api } from 'lwc';

export default class ReproCPE extends LightningElement {

    @track openModal = false;

    showModal() {
        this.openModal = true;
    }

    closeModal() {
        this.openModal = false;
    }

    _inputVariables = [];
    _builderContext = [];
    _elementInfo = {};
    _flowVariables;
    _elementType;
    _elementName;

    // These names have to match the input attribute names in your <myLWCcomponent>.js-meta.xml file
    @track inputValues = { 
        inputAttribute: {value: null, valueDataType: null, isCollection: false, label: 'Input Attribute', 
            helpText: 'This is the Help Text',
            isError: false, errorMessage: null},
    }

    @api 
    get builderContext() {
        return this._builderContext;
    }

    set builderContext(context) {
        this._builderContext = context || {};
        if (this._builderContext) {
            const { variables } = this._builderContext;
            this._flowVariables = [...variables];
        }
    }

    @api
    get elementInfo() {
        return this._elementInfo;
    }

    set elementInfo(info) {
        this._elementInfo = info || {};
        if (this._elementInfo) {
            this._elementName = this._elementInfo.apiName;
            this._elementType = this._elementInfo.type;
        }
    }

    @api 
    get inputVariables() {
        return this._inputVariables;
    }

    set inputVariables(variables) {
        this._inputVariables = variables || [];
        this.initializeValues();
    }

    initializeValues() {
        console.log('CPE - initializeValues',this._inputVariables);
    }

    // Input attributes for the Flow
    @api flowParams = [
        {name: 'vInput', type: 'String', value: null},
    ]

    isFlowLoaded = false;

    handleFlowStatusChange(event) {
        console.log('=== handleFlowStatusChange ===');
        if (event.detail.flowStatus == "ERROR") { 
            console.log('Flow Error: ',JSON.stringify(event));
        } else {      
            this.isFlowLoaded = true;
        }
    }

    handleButton1() {
        this.flowName = "Reproduce_CPE_Flow_Errors_No_Section";
        this.showModal();
    }

    handleButton2() {
        this.flowName = "Reproduce_CPE_Flow_Errors_Section";
        this.showModal();
    }

    handleButton3() {
        this.flowName = "Reproduce_CPE_Flow_Errors_Toggle";
        this.showModal();
    }

}