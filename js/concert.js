var concerts = [];



$(document).ready(function()
{
    $(".nav-tabs").on("click", "a", function(e)
    {
        e.preventDefault();
        if (!$(this).hasClass('add-tab'))
        {
            $(this).tab('show');
        }
    })

    //REMOVE
    // .on("click", "span", function () {
    //     var anchor = $(this).siblings('a');
    //     $(anchor.attr('href')).remove();
    //     $(this).parent().remove();
    //     $(".nav-tabs li").children('a').first().click();
    // });

    $('.add-tab').click(function(e)
    {
        e.preventDefault();
        var id = $(".nav-tabs").children().length; //think about it ;)
        var tabId = 'contact_' + id;
        $(this).closest('li').before('<li><a class="href="#contact_' + id + '">New Tab <span class="glyphicon glyphicon-pencil pull-right"></a></span></li>');
        $(".glyphicon-pencil").click(makeEditable);
        $('.tab-content').append('<div class="tab-pane" id="' + tabId + '">Contact Form: New Contact ' + id + '</div>');
        $('.nav-tabs li:nth-child(' + id + ') a').click();
    });

    $(".glyphicon-pencil").click(makeEditable);

});

function makeEditable()
{
    var pen = $(this);
    pen.css("visibility", "hidden");
    $(this).parent().selectText();
    $(this).parent().attr("contenteditable", "true").focusout(function()
    {
        $(this).removeAttr("contenteditable").off("focusout");
        pen.css("visibility", "visible");
    });
}

jQuery.fn.selectText = function(){
   var doc = document;
   var element = this[0];
   console.log(this, element);
   if (doc.body.createTextRange) {
       var range = document.body.createTextRange();
       range.moveToElementText(element);
       range.select();
   } else if (window.getSelection) {
       var selection = window.getSelection();        
       var range = document.createRange();
       range.selectNodeContents(element);
       selection.removeAllRanges();
       selection.addRange(range);
   }
};
/* */
