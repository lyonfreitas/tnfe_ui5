/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/CalendarType","sap/ui/core/format/DateFormat","sap/ui/model/odata/ODataUtils","sap/ui/model/odata/v4/lib/_Batch","sap/ui/model/odata/v4/lib/_Helper"],function(C,D,B,_,a){"use strict";var d,o,s="\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])",t,T="(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(\\.\\d{1,12})?)?",r=new RegExp("^"+s+"$"),b=new RegExp("^"+s+"T"+T+"(?:Z|[-+](?:0\\d|1[0-3]):[0-5]\\d|[-+]14:00)$","i"),c=new RegExp("^"+T+"$"),O={_setDateTimeFormatter:function(){d=D.getDateInstance({calendarType:C.Gregorian,pattern:"yyyy-MM-dd",strictParsing:true,UTC:true});o=D.getDateTimeInstance({calendarType:C.Gregorian,pattern:"yyyy-MM-dd'T'HH:mm:ss.SSSXXX",strictParsing:true});t=D.getTimeInstance({calendarType:C.Gregorian,pattern:"HH:mm:ss.SSS",strictParsing:true,UTC:true});},compare:function(v,V,e){if(e===true||e==="Decimal"){return B.compare(v,V,true);}if(e==="DateTime"){return B.compare(O.parseDateTimeOffset(v),O.parseDateTimeOffset(V));}return B.compare(v,V);},deserializeBatchResponse:function(e,R){return _.deserializeBatchResponse(e,R);},formatLiteral:function(v,e){return a.formatLiteral(v,e);},parseDate:function(e){var f=r.test(e)&&d.parse(e);if(!f){throw new Error("Not a valid Edm.Date value: "+e);}return f;},parseDateTimeOffset:function(e){var f,m=b.exec(e);if(m){if(m[1]&&m[1].length>4){e=e.replace(m[1],m[1].slice(0,4));}f=o.parse(e.toUpperCase());}if(!f){throw new Error("Not a valid Edm.DateTimeOffset value: "+e);}return f;},parseTimeOfDay:function(e){var f;if(c.test(e)){if(e.length>12){e=e.slice(0,12);}f=t.parse(e);}if(!f){throw new Error("Not a valid Edm.TimeOfDay value: "+e);}return f;},serializeBatchRequest:function(R,e){return _.serializeBatchRequest(R,e);}};O._setDateTimeFormatter();return O;},true);