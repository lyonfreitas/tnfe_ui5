import { ManagedObject } from "sap/ui/base";
import { MessageType } from "sap/fe/core/formatters/TableFormatterTypes";

const getMessagetypeOrder = function(messageType: string): number {
	switch (messageType) {
		case "Error":
			return 4;
		case "Warning":
			return 3;
		case "Information":
			return 2;
		case "None":
			return 1;
		default:
			return -1;
	}
};

/**
 * rowHighlighting
 *
 * @param {object} this The context
 * @param {string|number} CriticalityValue The criticality value
 * @param {number} messageLastUpdate Timestamp of the last message that was created. It's defined as an input value, but not used in the body of the function
 * It is used to refresh the formatting of the table each time a new message is updated
 * @returns {object} The value from the inner function
 */

const rowHighlighting = function(this: ManagedObject, criticalityValue: string | number, aFilteredMessages: any[]): MessageType {
	let iHighestCriticalityValue: number = -1;
	if (aFilteredMessages) {
		const sCurrentContextPath = this.getBindingContext() ? this.getBindingContext().getPath() : undefined;
		aFilteredMessages.forEach((oMessage: any) => {
			if (oMessage.aTargets[0].indexOf(sCurrentContextPath) === 0 && iHighestCriticalityValue < getMessagetypeOrder(oMessage.type)) {
				iHighestCriticalityValue = getMessagetypeOrder(oMessage.type);
				criticalityValue = oMessage.type;
			}
		});
	}

	let criticalityProperty;
	if (typeof criticalityValue === "string") {
		return (criticalityValue as unknown) as MessageType;
	}
	switch (criticalityValue) {
		case 1:
			criticalityProperty = MessageType.Error;
			break;
		case 2:
			criticalityProperty = MessageType.Warning;
			break;
		case 3:
			criticalityProperty = MessageType.Success;
			break;
		case 5:
			criticalityProperty = MessageType.Information;
			break;
		default:
			criticalityProperty = MessageType.None;
	}

	return criticalityProperty;
};
rowHighlighting.__functionName = "sap.fe.core.formatters.TableFormatter#rowHighlighting";

const navigatedRow = function(this: ManagedObject, sDeepestPath: string) {
	if (this.getBindingContext() && sDeepestPath) {
		return sDeepestPath.indexOf(this.getBindingContext().getPath()) === 0;
	} else {
		return false;
	}
};
navigatedRow.__functionName = "sap.fe.core.formatters.TableFormatter#navigatedRow";

// See https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters for more detail on this weird syntax
/**
 * Collection of table formatters.
 *
 * @param {object} this The context
 * @param {string} sName The inner function name
 * @param {object[]} oArgs The inner function parameters
 * @returns {object} The value from the inner function
 */
const tableFormatters = function(this: object, sName: string, ...oArgs: any[]): any {
	if (tableFormatters.hasOwnProperty(sName)) {
		return (tableFormatters as any)[sName].apply(this, oArgs);
	} else {
		return "";
	}
};

tableFormatters.rowHighlighting = rowHighlighting;
tableFormatters.navigatedRow = navigatedRow;
/**
 * @global
 */
export default tableFormatters;
