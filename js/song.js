//var concerts = [];

var buttonIndex;
var videoIndex = 0;


$(document).ready(function() {
    $(".nav-tabs").on("click", "a", function(e) {
        e.preventDefault();
        if (!$(this).hasClass('add-tab')) {
            $(this).tab('show');
        }
    })

    $('.youtube').on('click', function() {
        //console.log('click');
        buttonIndex = $(this).data('tabindex');
        //console.log(buttonIndex);
        $('#myModal').modal('show');
    });

    $('.youtube-start-search').on('click', function() {

        $('.modal-body').empty();
        var url = "https://youtube.com/embed/"

        var searchString = $(this).siblings('#youtube-search-string').val();
        $.ajax({
            cache: false,
            data: $.extend({
                key: 'AIzaSyCyPN6By6mw1vREdPXpzcbjMz1dt2tDowg',
                q: searchString,
                part: 'snippet'
            }, {
                maxResults: 20,
                pageToken: $("#pageToken").val()
            }),
            dataType: 'json',
            type: 'GET',
            timeout: 5000,
            url: 'https://www.googleapis.com/youtube/v3/search',
            success: function(resp) {
                //console.log(resp.items);
                $.each(resp.items, function(i, item) {
                    if (i < 5) {
                        $('<div class="row videoRow"></div>')
                            .append(
                                $('<div></div>').attr('class', 'col-sm-6').append(
                                    $('<iframe></iframe').attr('src', url + item.id.videoId)
                                    .attr('allowfullscreen', '')
                                    .css('max-width', '100%')
                                ))
                            .append(
                                $('<div></div>').attr('class', 'col-sm-6').append(
                                    $('<h3></h3>').html(item.snippet.title)
                                ))
                            .appendTo($('.modal-body'));
                    }
                    else {
                        return false;
                    }
                });

                $('.videoRow').on('click', function() {
                    var $video = $('<div></div>').attr('id', 'video-' + videoIndex)
                        .addClass('video')
                        .append($(this).find('iframe'))
                        .append('<div class="note" ><h3>Notes: </h3><p contenteditable="true">text</p></div>');
                    $('#tab_' + buttonIndex).find('.tabText').append($video);
                    $('#video-' + videoIndex).draggable({
                        containment: "parent"
                    });
                    $('#video-' + videoIndex).find('p').on('click', function() {
                        $(this).parent().parent().draggable({
                            disabled: false
                        });
                    }).dblclick(function() {
                        
                        $(this).parent().parent().draggable({
                            disabled: true
                        });
                    })

                    $('#myModal').modal('hide');
                    videoIndex++;
                });
            }
        });
    });

    //REMOVE
    // .on("click", "span", function () {
    //     var anchor = $(this).siblings('a');
    //     $(anchor.attr('href')).remove();
    //     $(this).parent().remove();
    //     $(".nav-tabs li").children('a').first().click();
    // });

    $('.add-tab').click(function(e) {
        e.preventDefault();
        var id = $(".nav-tabs").children().length; //think about it ;)
        var tabId = 'contact_' + id;
        $(this).closest('li').before('<li><a class="href="#contact_' + id + '">New Tab <span class="glyphicon glyphicon-pencil pull-right"></a></span></li>');
        $(".glyphicon-pencil").click(makeEditable);
        $('.tab-content').append('<div class="tab-pane" id="' + tabId + '">Contact Form: New Contact ' + id + '</div>');
        $('.nav-tabs li:nth-child(' + id + ') a').click();
    });

    $(".glyphicon-pencil").click(makeEditable);

    $('.add').on("click", function() {
        //console.log($(this).siblings('.icon').get());
        $(this).siblings('.icon').slideToggle("fast");
    });

    //console.log($('.youtube').get());



});

function makeEditable() {
    var pen = $(this);
    pen.css("visibility", "hidden");
    $(this).parent().selectText();
    $(this).parent().attr("contenteditable", "true").focusout(function() {
        $(this).removeAttr("contenteditable").off("focusout");
        pen.css("visibility", "visible");
    });
}

jQuery.fn.selectText = function() {
    var doc = document;
    var element = this[0];
    console.log(this, element);
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    }
    else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};
/* */
