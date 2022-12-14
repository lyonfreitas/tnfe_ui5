// Copies of sap.fe type definitions
export enum Placement {
	After = "After",
	Before = "Before",
	End = "End"
}

export type Position = {
	/**
	 * The key of another column to be used as placement anchor.
	 */
	anchor?: string;
	/**
	 * Define the placement, either before or after the anchor column.
	 */
	placement: Placement;
};

export type Positionable = {
	/**
	 *   Defines the position of the column relative to other columns.
	 */
	position?: Position;
};

export type ActionAfterExecutionConfiguration = {
	/**
	 * By default, a navigation is automatically triggered after an action execution. If applications want to disable the navigation, they can do so using the manifest setting “navigateToInstance”.
	 */
	navigateToInstance?: boolean;
	/**
	 * The "enableAutoScroll" allows you to scroll to the newly created or change item after execution of an action
	 */
	enableAutoScroll?: boolean;
};

export enum Availability {
	"Default" = "Default",
	"Adaptation" = "Adaptation",
	"Hidden" = "Hidden"
}

/**
 * Table Column
 * @isViewNode true
 */
export type TableColumn = {
	/**
	 * A string type that represents CSS size values.
	 * Refer to https://openui5.hana.ondemand.com/api/sap.ui.core.CSSSize.
	 */
	width?: string;
	/**
	 * Defines where the column should be shown.
	 * Default: it will be shown by default in the table.
	 * Adaptation: it will initially not shown in the table but be available via end user adaptation.
	 * Hidden: the column is neither available in the table nor in adaptation.
	 */
	availability?: Availability;
	/**
	 * Settings that are only relevant for actions (associated with a UI.DataFieldForAction annotation)
	 */
	afterExecution?: ActionAfterExecutionConfiguration;
};

/**
 * Custom Column
 * @isViewNode true
 */
export type TableCustomColumn = Positionable & {
	/**
	 * The header is shown on the table as header, as well as in the add/remove dialog.
	 */
	header: string;
	/**
	 * A string type that represents CSS size values.
	 * Refer to https://openui5.hana.ondemand.com/api/sap.ui.core.CSSSize.
	 */
	width?: string;
	/**
	 * Relevant for extension columns; allows the definition of a target fragment.
	 */
	template?: string;
};
