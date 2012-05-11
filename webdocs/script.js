$(window).resize(onResize);
function onResize() {
	var h=$(window).height();
	
	$('#ta_tbl').height(h);
	$('#ta_ifr').height(h-52);
	
	$('textarea').height(h-5);
}

function onEditorReady() {
	try {
		// Defined in ActionScript (bridge)
		onEditorReadyBridge();
	} catch (e) {}
}

function getHTML() {
	return $('textarea').html();
}
function setHTML(s) {
	$('textarea').html(s);
}

var rtl=false;
function getRTL() {
	return rtl;
}
function setRTL(b) {
	rtl=b;
	var ed=$('textarea').tinymce();
	ed.settings['directionality'] = b ? 'rtl' : 'ltr';
	tinyMCE.execCommand('mceRemoveControl', false, 'ta');
	tinyMCE.execCommand('mceAddControl', false, 'ta');
}

var isSourceMode=false;
function getIsSourceMode() {
	return isSourceMode;
}
function setIsSourceMode(b) {
	isSourceMode=b;
	if (b) $('textarea').tinymce().hide();
	else $('textarea').tinymce().show();
}

var editable=false;
function setEditable(b) {
	$('#ta_ifr').contents().find('body').attr('contenteditable', b);
	$('#ta').attr('disabled', !b);
	$('#ta_toolbar1').css('opacity', b ? 1 : .25);
	$('#ta_toolbar1').css('pointer-events', b ? 'auto' : 'none');
}
function getEditable() {
	return editable;
}

$().ready(function() {
	$('textarea').tinymce({
		script_url : 'tiny_mce/tiny_mce.js',
		theme_advanced_resizing : false,
		mode:'none',
		theme:'advanced',
		plugins : "safari,style,advlink,paste",
		theme_advanced_buttons1 : "bold,italic,|,sub,sup,|,undo,redo,|,bullist,numlist,|,cleanup",
		theme_advanced_buttons2 : "",
		theme_advanced_buttons3 : "",
		theme_advanced_statusbar_location : "bottom",
		theme_advanced_toolbar_location : "top",
		
		oninit:onEditorReady
	});
	onResize();
});
