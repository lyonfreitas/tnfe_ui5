/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/command/FlexCommand"],function(F){"use strict";var A=F.extend("sap.ui.rta.command.AddProperty",{metadata:{library:"sap.ui.rta",properties:{index:{type:"int"},newControlId:{type:"string"},bindingString:{type:"string"},entityType:{type:"string"},parentId:{type:"string"},oDataServiceVersion:{type:"string"},oDataServiceUri:{type:"string"},modelType:{type:"string"},relevantContainerId:{type:"string"},propertyName:{type:"string"}}}});A.prototype._getChangeSpecificData=function(){return{changeType:this.getChangeType(),index:this.getIndex(),newControlId:this.getNewControlId(),bindingPath:this.getBindingString(),parentId:this.getParentId(),modelType:this.getModelType(),relevantContainerId:this.getRelevantContainerId(),oDataServiceVersion:this.getODataServiceVersion(),oDataInformation:{oDataServiceUri:this.getODataServiceUri(),propertyName:this.getPropertyName(),entityType:this.getEntityType()}};};return A;},true);
