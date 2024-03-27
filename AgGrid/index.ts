import { IInputs, IOutputs } from "./generated/ManifestTypes";
import MyAgGrid from './components/AgGrid'
import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import { ContextMenuRegistry } from "ag-grid-enterprise/dist/lib/ag-charts-community/module-support";

export class AgGrid implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    public width: number;
    public height: number;
    private con: HTMLDivElement;
    private apiUrl: string | null;
    private enableRowGroupColumns: string | null;
    private pivotColumns: string | null;
    private aggFuncColumns: string | null;
    private theme: string;// | null;
    private data: { rows: any[] } | undefined;
    private columnDef: { rows: any[] } | undefined;
    private sideBar: boolean;
    private editable : boolean;
    private resizable : boolean;
    private filter : boolean;
    private autoDefinationName : string;
   /**
     * Empty constructor.
     */
    constructor() {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        // Add control initialization code
        // Add control initialization code
        this.con = container;

        const height = context.mode.allocatedHeight;
        const width = context.mode.allocatedWidth;
        this.theme = context.parameters.theme.raw;
        this.apiUrl = context.parameters.ApiUrl.raw;
        this.enableRowGroupColumns = context.parameters.enableRowGroupColumns.raw;
        this.pivotColumns = context.parameters.pivotColumns.raw;
        this.aggFuncColumns = context.parameters.aggFuncColumns.raw;
        this.data = context.parameters.data && context.parameters.data.raw ? context.parameters.data.raw : undefined;
        this.columnDef = context.parameters.columnDef && context.parameters.columnDef.raw ? context.parameters.columnDef.raw : undefined;
        this.sideBar = context.parameters.sideBar.raw;
        this.editable = context.parameters.editable.raw;
        this.resizable = context.parameters.resizable.raw;
        this.filter = context.parameters.filter.raw;
        this.autoDefinationName = context.parameters.autoDefName.raw? context.parameters.autoDefName.raw:"";
        
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.apiUrl = context.parameters.ApiUrl.raw;
        this.enableRowGroupColumns = context.parameters.enableRowGroupColumns.raw;
        this.pivotColumns = context.parameters.pivotColumns.raw;
        this.aggFuncColumns = context.parameters.aggFuncColumns.raw;
        this.theme = context.parameters.theme.raw;
        this.data = context.parameters.data && context.parameters.data.raw ? context.parameters.data.raw : undefined;
        this.columnDef = context.parameters.columnDef && context.parameters.columnDef.raw ? context.parameters.columnDef.raw : undefined;
        this.sideBar = context.parameters.sideBar.raw;
        this.editable = context.parameters.editable.raw;
        this.resizable = context.parameters.resizable.raw;
        this.filter = context.parameters.filter.raw;
        this.autoDefinationName = context.parameters.autoDefName.raw? context.parameters.autoDefName.raw:"";
       
        ReactDOM.render(
            React.createElement(MyAgGrid, {apiUrl : this.apiUrl,enableRowGroupColumns : this.enableRowGroupColumns,pivotColumns : this.pivotColumns,aggFuncColumns : this.aggFuncColumns, theme : this.theme, data: this.data,columnDef:this.columnDef,sideBar:this.sideBar,editable:this.editable,resizable:this.resizable,filter:this.filter,autoDefinationName:this.autoDefinationName }),
            // React.createElement(MyAgGrid, {apiUrl : this.apiUrl}),
            this.con
            );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
        ReactDOM.unmountComponentAtNode(this.con);
    }
}
