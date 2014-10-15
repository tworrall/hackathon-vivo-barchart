<#-- $This file is distributed under the terms of the license in /doc/license.txt$ -->

<#-- Default VIVO individual profile page template (extends individual.ftl in vitro) -->
<#include "individual-setup.ftl">
<#import "lib-vivo-properties.ftl" as vp>

<#assign individualProductExtension>
    <#-- Include for any class specific template additions -->
    ${classSpecificExtension!}
    ${departmentalGrantsExtension!} 
    <!--PREINDIVIDUAL OVERVIEW.FTL-->
    <#include "individual-webpage.ftl">
    <#include "individual-overview.ftl">
    ${affiliatedResearchAreas!}
	${graduateFieldDepartments!}
        </section> <!-- #individual-info -->
    </section> <!-- #individual-intro -->
    <!--postindividual overview ftl-->
    ${departmentalGraduateFields!}
</#assign>
<#if individual.mostSpecificTypes?seq_contains("Cornell College or Professional School") >
    <#if grantsDeptSchoolResults?has_content >
		<a id="showTheChart" href="#" style="position:absolute;right:12%;top:470px;z-index:1000">Departmental Grant History</a>
    </#if>
</#if>

<#include "individual-vitro.ftl">

<#if individual.mostSpecificTypes?seq_contains("Cornell College or Professional School") >
	${scripts.add('<script type="text/javascript" src="${urls.base}/js/hackathon.js"></script>')}

	<div id="overlay-bg"><div id="vis" class="overlay-content"></div><div></div></div>

<script type="text/javascript">
var grantsOne = [
	<#assign lastOne = grantsDeptSchoolResults?last />
	<#assign rowCount = 0 />
	<#assign posnCount = 0 />
	<#assign label = "" />
	<#assign prevLabel = "" />
	<#list grantsDeptSchoolResults as resultRow >
		<#if resultRow["label"]?contains("(") >
		<#assign label = resultRow["label"]?substring(resultRow["label"]?index_of("(")+1,resultRow["label"]?last_index_of(")")) />
		<#if label != prevLabel >
			<#assign posnCount = 0 />
		</#if>
			{"category":"${label?replace('amp;','')}", 		
			"position":${resultRow["sYear"]},
			"value":${resultRow["ct"]}}<#if rowCount < (grantsDeptSchoolResults?size - 1) >,</#if>
			<#assign posnCount = posnCount + 1 />
			<#assign prevLabel = label />
			<#assign rowCount = rowCount + 1 />
		<#else>
			<!-- ${resultRow["label"]} -->
		</#if>
	</#list>]
// parse a spec and create a visualization view
</script>
</#if>
<script>
    var individualLocalName = "${individual.localName}";
</script>
<script>
var i18nStrings = {
    displayLess: '${i18n().display_less}',
    displayMoreEllipsis: '${i18n().display_more_ellipsis}',
    showMoreContent: '${i18n().show_more_content}',
    verboseTurnOff: '${i18n().verbose_turn_off}',
};
</script>

${stylesheets.add('<link rel="stylesheet" href="${urls.base}/css/individual/individual-vivo.css?vers=1.5.1" />',
				  '<link rel="stylesheet" href="${urls.base}/css/hackathon.css" />')}

${headScripts.add('<script type="text/javascript" src="${urls.base}/js/jquery_plugins/jquery.truncator.js"></script>',
				  '<script src="http://trifacta.github.io/vega/lib/d3.v3.min.js"></script>',
				  '<script src="http://trifacta.github.io/vega/vega.js"></script>',
                  '<script type="text/javascript" src="${urls.base}/js/json2.js"></script>')}
                  
${scripts.add('<script type="text/javascript" src="${urls.base}/js/individual/individualUtils.js?vers=1.5.1"></script>')}

