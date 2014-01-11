var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('core.css');
(document.head||document.documentElement).appendChild(style);

var divelement =$('<div class="contextMenu" id="topcoder_menu"><ul><li id="mark"> Mark as done !</li><li id="markascouldnotdo"> Mark as not done !</li><li id="unmark"> Unmark</li></ul></div>');
$(document.body).append(divelement);

//////////////////////////////////////////////////////////////////////////////////////////////////////

var problemsTable = $($("table")[6]);
var trs = problemsTable.find("tr").addClass("topcoder_question");

for(var i=0;i<trs.length;i++){
    try{
        var as = $(trs[i]).find("td>a");
        var key = $(as[0]).text().trim()+$(as[1]).text().trim();
        chrome.storage.sync.get(key, function(obj){
            var key = Object.keys(obj)[0];
            var marked = obj[key];
            //console.log("On page load", key, marked);
            if(marked){
                var classToBeApplied = "";
                if(marked==1){
                    classToBeApplied = "question_done";
                }
                else if(marked==2){
                    classToBeApplied = "question_couldnotbedone";
                }
                var problemsTable = $($("table")[6]);
                var trs = problemsTable.find("tr").addClass("topcoder_question");
                for(var i=0;i<trs.length;i++){
                    var as = $(trs[i]).find("td>a");                    
                    var k = $(as[0]).text().trim()+$(as[1]).text().trim();
                    if(k==key){
                        $(trs[i]).addClass(classToBeApplied);
                        break;
                    }
                }
            }
        });
    }
    catch(e){

    }
}

$('.topcoder_question').contextMenu('topcoder_menu', {
    bindings: {
        'mark': function(t) {
            try{
                var ele = $(t);
                var as = ele.find("td>a");
                var key = $(as[0]).text().trim()+$(as[1]).text().trim();
                obj = {}
                obj[key] = 1;
                chrome.storage.sync.set(obj, function(obj){});
                $(ele).addClass("question_done");
            }
            catch(e){
                console.log("Failed to mark!");
            }
        },
        'markascouldnotdo':function(t){
            try{
                var ele = $(t);
                var as = ele.find("td>a");
                var key = $(as[0]).text().trim()+$(as[1]).text().trim();
                obj = {}
                obj[key] = 2;
                chrome.storage.sync.set(obj, function(obj){});
                $(ele).addClass("question_couldnotbedone");
            }
            catch(e){
                console.log("Failed to mark!");
            }
        },
        'unmark': function(t) {
            try{
                var ele = $(t);
                var as = ele.find("td>a");
                var key = $(as[0]).text().trim()+$(as[1]).text().trim();
                obj = {}
                obj[key] = 0;
                chrome.storage.sync.set(obj, function(obj){});
                $(ele).removeClass("question_done").removeClass("question_couldnotbedone");
            }
            catch(e){
                console.log("Failed to unmark!");
            }
        }
    }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	$("tr").css({'background-color':'green'});

    console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the zxczxccc");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });