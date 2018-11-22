var $ = require('jquery');
//var Handlebars = require('handlebars');


console.log('inside templateManager..............');

var createTemplateManager = function(){

	var registerHandlebarHelpers = function(){
        
		Handlebars.registerHelper("defaultIfBlank", function(targetStr, defaultStr){
			return targetStr ? targetStr : defaultStr;
		});

        Handlebars.registerHelper("ifEquals", function(conditional, options) {
            if (conditional === options.hash.value) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });

         Handlebars.registerHelper("ifLessThanOrEquals", function(conditional, options) {
            if (conditional <= options.hash.value) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
        Handlebars.registerHelper("parseMoney", function(money){
	        if(money){
	            var moneyVal = money;
	            if(typeof money === 'string') {
	                 moneyVal = money.replace("$", "");
	            }
	            var fixedNum = parseFloat(moneyVal).toFixed(2);
	            var moneyValInt = parseFloat(fixedNum);
	            return moneyValInt;
	        }else{
	            return 0.00;
	        }
        });
        Handlebars.registerHelper("ifNot", function(conditional, options) {
    		if (conditional === options.hash.value) {
    			return options.inverse(this);
    	    } else {
    	    	return options.fn(this);
    	    }
        });
        
	}

	var registerHandlebarPartials = function(){
		Handlebars.registerPartial("expenseSummary", $("#expense-summary-template").html());
		Handlebars.registerPartial("disbursementSummary", $("#disbursement-summary-template").html());
		Handlebars.registerPartial("creditSummary", $('#credit-summary-template').html());
		Handlebars.registerPartial("entitlementSummary", $('#entitlement-summary-template').html());
        Handlebars.registerPartial("dtsIcon", $('#dts-icon-template').html());
        
	}


	var createTemplateContext = function(){
        console.log("createTemplateContext.....");
		var buildTemplate = function(templateId){
			 // Grab the template script
           var templateScript = $(templateId).html();
           // Compile the template
           var template = Handlebars.compile(templateScript);
           // We will call this template on an array of objects
           // Pass our data to the template
           return template;
         
		};
		var setTemplate = function($template, placeholderId){
			$(placeholderId).empty();
			$(placeholderId).append($template);
		};
		registerHandlebarPartials();
		registerHandlebarHelpers();
		return function(templateId, placeholderId) {
			var context = {
				templateId: templateId,
				placeholderId: placeholderId,
				template: null,
				compiledHtml: null
			};
			
			return {
				build: function(data){
					if(!context.template) {
						context.template = buildTemplate(templateId);
					}
					var compiledHtml = context.template(data);
			        context.compiledHtml = $(compiledHtml);
				},
				set: function(initialize, customSetTemplate){
					if(initialize){
						initialize(context.compiledHtml);
					}
					if(customSetTemplate){
						customSetTemplate(context.compiledHtml);
					}else{
						setTemplate(context.compiledHtml, context.placeholderId);
					}
				}
			}
		};
	}();
	return {
		financialSummaryTemplate: createTemplateContext("#financial-summary-template", "#financial-summary-placeholder"),
		expenseSummaryTemplate:  createTemplateContext("#expense-summary-template", "#expense-summary-placeholder"),
        disbursementSummaryTemplate:  createTemplateContext("#disbursement-summary-template", "#disbursement-summary-placeholder"),
        creditSummaryTemplate:  createTemplateContext("#credit-summary-template", "#credit-summary-placeholder"),
        entitlementSummaryTemplate:  createTemplateContext("#entitlement-summary-template", "#entitlement-summary-placeholder"),
        disbursementModalTemplate: createTemplateContext("#adjust-disbursement-template", "#adjust-disbursement-placeholder")
	}
};