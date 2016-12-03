var concerts = [];
var concert1 = {
    name: "press kit",
    description: "Portfolio Item 1",
    status: "unconfirmed"
};
var concert2 = {
    name: "ep songs",
    description: "Portfolio Item 2",
    status: "confirmed"
};
var concert3 = {
    name: "Photoshooting",
    description: "Portfolio Item 3"
};

concerts.push(concert1);
concerts.push(concert2);
concerts.push(concert3);

//console.log(concerts);


//$('#datetimepicker1').datetimepicker();

var $datePicker = $('<div></div>').addClass('col-xs-3')
    .addClass('vcenter')
    .append(
        $('<div></div>').addClass('input-group')
        .addClass('date')
        .append(
            $('<input />').attr('type', 'text')
            .addClass('form-control')
        )
        .append(
            $('<span></span>').addClass('input-group-addon')
            .append(
                $('<span></span>').addClass('glyphicon-calendar')
                .addClass('glyphicon')
            )
        )
    );


// <div class="form-group">
//                 <div class="input-group date" id="datetimepicker1">
//                     <input type="text" class="form-control" /> <span class="input-group-addon"><span class="glyphicon-calendar glyphicon"></span></span>
//                 </div>
//             </div>

$(document).ready(function() {
    loadConcerts(); //makePanel(concert1,1);

    $('[data-toggle="popover"]').popover();

    var $template = $(".template");
    var hash = concerts.length;
    $(".btn-add-panel").on("click", function() {
        createNewConcertForm($template, hash);
        ++hash;
    });



    $('.collapse').on('shown.bs.collapse', function() {
        $(this).parent().find(".glyphicon-collapse-down").removeClass("glyphicon-collapse-down").addClass("glyphicon-collapse-up");
    }).on('hidden.bs.collapse', function() {
        $(this).parent().find(".glyphicon-collapse-up").removeClass("glyphicon-collapse-up").addClass("glyphicon-collapse-down");
    });

    $('.share').on('click', function() {
        //console.log('click');
        $(this).popover('toggle');
    });

    // $(document).on('click', '.glyphicon-remove-circle', function () {
    //     $(this).parents('.panel').get(0).remove();
    // });

    $(document).on('click', function (e) {
    $('[data-toggle="popover"],[data-original-title]').each(function () {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {                
            (($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false  // fix for BS 3.3.6
        }

    });
});
});

function loadConcerts() {
    var $accordion = $('#accordion');
    var $template = $(".template");
    //var hash = 0;

    for (var i in concerts) {
        createNewPanel($accordion, $template, i, concerts[i]);
    }
}

function createNewPanel($accordion, $template, hash, concert) {
    //console.log('hash', hash);
    var titleString = concert.name;
    var $newPanel = $template.clone();
    $newPanel.removeClass("template")
        .find(".collapse").removeClass("in");
    $newPanel.find(".accordion-toggle").attr("href", "#" + (++hash))
        .text("Dynamic panel #" + hash);
    $newPanel.find(".panel-collapse").attr("id", hash);
    $newPanel.find('.accordion-toggle').attr("data-parent", "#accordion" + hash)
        .html(titleString);
    $newPanel.find('.panel-body').html(concert.description);
    if (concert.status === "confirmed") {
        $newPanel.addClass('panel-success')
    }
    else {
        $newPanel.addClass('panel-warning')
    }

    //_______
    $newPanel.find('.glyphicon-share-alt').on('click', function() {
        //console.log('click');
        $(this).on('click', function() {
            $(this).popover();
        });
    });

    $newPanel.on('click', '.email', function() {
        //console.log('click'); 
       var name = buttonIndex = $(this).parent().parent().parent().parent().find('.accordion-toggle').html();
        //console.log(buttonIndex);
        $('#exampleModal').find('.modal-title').html('Send <b>'+name+'</b>: ')
        $('#exampleModal').modal('show');
    });

    $("#accordion").append($newPanel.fadeIn());
}

function handleSaveClick(e) {
    var $accordion = $('#accordion');
    var $template = $(".template");
    var hash = concerts.length;
    var concert = createNewConcert($(this));
    concerts.unshift(concert);

    turnFormIntoConcertPanel($(this), concert);
}

function turnFormIntoConcertPanel($concertForm, concert) {
    var i = $concertForm.data('no');
    var titleString = concert.date.format("MM/DD/YYYY hh:mm a") + " " +
        concert.eventType + " @ " + concert.venue;

    var $title = $('#event-' + i).parent().siblings('.accordion-toggle');
    $title.siblings().not('.icon').remove();
    $title.html(titleString);

    $('#' + i).find('.panelContent').remove();
    $('#' + i).find('.panel-body').html(concert.description);
    $('#' + i).siblings('.panel-heading').find('.glyphicon-edit')
        .removeClass('hide');

}

function createNewConcert($concertForm) {
    var i = $concertForm.data('no');

    return {
        date: $('#dateTime-' + i).data("DateTimePicker").date(),
        eventType: $('#event-' + i).val(),
        venue: $('#venue-' + i).val(),
        description: $('#description-' + i).val(),
        status: $('#status-' + i).val()
    };
    //console.log(concerts);
}

function createNewConcertForm($template, hash) {
    var $newPanel = $template.clone();
    $newPanel.addClass('panel-warning')
    $newPanel.find(".accordion-toggle").attr("href", "#" + (++hash));
    $newPanel.find(".panel-collapse").attr("id", hash)
        .attr("aria-expanded", "true")
        .addClass("in");
    $newPanel.removeClass("template");
    $newPanel.find('.accordion-toggle')
        .attr("data-parent", "#accordion" + hash)
        .parent().append($datePicker.clone());
    $newPanel.find('.date').datetimepicker({
            allowInputToggle: true,
            defaultDate: new Date().setHours(20, 00, 00, 00)
        })
        .attr('id', 'dateTime-' + hash);
    $newPanel.find('input.form-control').attr('value', 'mm/dd/yyyy hh:mm');
    $newPanel.find(".glyphicon-collapse-down")
        .removeClass("glyphicon-collapse-down")
        .addClass("glyphicon-collapse-up ");
    $newPanel.find(".glyphicon-edit").addClass('hide');
    $newPanel.find(".row")
        .append(
            $('<div></div>').addClass('col-xs-2')
            .addClass('vcenter')
            .append(
                $('<input>').attr('type', 'text')
                .attr('value', 'event')
                .addClass('headerTextInput')
                .attr('id', 'event-' + hash)
            )
        )
        .append(
            $('<div></div>').addClass('col-xs-1 at')
            .addClass('vcenter')
            .append(
                $('<span></span>').html(" @ ")
            ))
        .append(
            $('<div></div>').addClass('col-xs-2')
            .addClass('vcenter')
            .append(
                $('<input>').attr('type', 'text')
                .attr('value', 'venue')
                .addClass('headerTextInput')
                .attr('id', 'venue-' + hash)
            )
        )
        .append(
            $('<div></div>').addClass('col-xs-2')
            .addClass('vcenter')
            .append(
                $('<select></select>').addClass('form-control')
                .attr('id', 'status-' + hash)
                .append($('<option></option>')
                    .html('status')
                    .attr('disabled', '')
                )
                .append($('<option></option>')
                    .html('unconfirmed')
                    .attr('selected', '')

                )
                .append($('<option></option>')
                    .html('confirmed')
                )
            )
        );

    $newPanel.find('div.panel-body')
        .append(
            $('<div></div>').addClass('panelContent')
            .append(
                $('<label></label>')
                .attr('for', 'text-' + hash)
                .html('Description:')
            )
            .append(
                $('<textarea></textarea>')
                .addClass('bigInput')
                .attr('id', 'description-' + hash)
            )
            .append($('<div></div>').addClass('col-sm-6')
                .append(
                    $('<input>').attr('type', 'checkbox')
                    .attr('name', 'checkbox-' + hash)
                )
                .append(
                    $('<label></label>').attr('for', 'checkbox-' + hash)
                    .addClass('checkBoxLabel')
                    .html('Send Availability Request')
                ))
            .append($('<div></div>').addClass('col-sm-6')
                .append(
                    $('<button></button').addClass('btn')
                    .addClass('btn-sm')
                    .addClass('btn-success')
                    .addClass('pull-right')
                    .addClass('saveBtn')
                    .attr('data-no', hash)
                    .html('save')
                ))
        );



    $("#accordion").prepend($newPanel.fadeIn());

    $('.saveBtn').on('click', handleSaveClick);

    //glyphicon
    $('.collapse').on('shown.bs.collapse', function() {
        $(this).parent().find(".glyphicon-collapse-down").removeClass("glyphicon-collapse-down").addClass("glyphicon-collapse-up");
    }).on('hidden.bs.collapse', function() {
        $(this).parent().find(".glyphicon-collapse-up").removeClass("glyphicon-collapse-up").addClass("glyphicon-collapse-down");
    });


}
