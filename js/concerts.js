var concerts = [];
var concert1 = {
    date: moment("Dec 3 05 pm", "MMM DD hh a"),
    eventType: "concert",
    venue: "venue1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dui massa, ornare ullamcorper porttitor eget, semper ac risus. Vivamus sed turpis ut turpis iaculis consequat. Nulla condimentum neque id tortor vulputate pretium. Cras in arcu interdum, feugiat neque in, volutpat lacus. Suspendisse laoreet libero eros, et posuere ligula ornare vitae. Morbi lacinia, urna non feugiat auctor, quam mauris interdum urna, sit amet luctus tortor eros eu nunc.",
    status: "unconfirmed"
};
var concert2 = {
    date: moment("Dec 17 08 pm", "MMM DD hh a"),
    eventType: "acoustic gig",
    venue: "venue2",
    description: "Phasellus nec interdum lorem. Fusce nibh velit, lacinia et tincidunt et, sollicitudin vel eros. Fusce eleifend aliquam diam sit amet tempus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi venenatis elementum dui non consectetur. Phasellus porta, nunc ultrices varius pulvinar, felis augue gravida enim, nec rutrum nibh tortor lacinia eros.",
    status: "confirmed"
};
var concert3 = {
    date: moment("Jan 23 07:30 pm", "MMM DD hh:mm a"),
    eventType: "gig",
    venue: "venue3",
    description: "In hac habitasse platea dictumst. Fusce eget magna in lorem ullamcorper faucibus id quis ante. Suspendisse euismod mauris a imperdiet feugiat. Maecenas eget nibh ac massa lacinia vulputate. Suspendisse vulputate condimentum tempor. Morbi metus enim, consequat sit amet ex nec, pulvinar rutrum mauris. Ut interdum nibh eget dui venenatis, id convallis lorem fermentum. Integer vel massa massa. Suspendisse consectetur arcu ac lectus tempus blandit. ",
    status: "confirmed"
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

$(document).ready(function()
{
    loadConcerts(); //makePanel(concert1,1);



    var $template = $(".template");
    var hash = concerts.length;
    $(".btn-add-panel").on("click", function ()
    {
        createNewConcertForm($template, hash);
        ++hash;
    });



    $('.collapse').on('shown.bs.collapse', function()
    {
        $(this).parent().find(".glyphicon-collapse-down").removeClass("glyphicon-collapse-down").addClass("glyphicon-collapse-up");
    }).on('hidden.bs.collapse', function()
    {
        $(this).parent().find(".glyphicon-collapse-up").removeClass("glyphicon-collapse-up").addClass("glyphicon-collapse-down");
    });


    // $(document).on('click', '.glyphicon-remove-circle', function () {
    //     $(this).parents('.panel').get(0).remove();
    // });


});

function loadConcerts()
{
    var $accordion = $('#accordion');
    var $template = $(".template");
    //var hash = 0;

    for (var i in concerts)
    {
       createNewConcertPanel($accordion,$template, i, concerts[i]);
    }
}

function createNewConcertPanel($accordion,$template,hash, concert)
{
    //console.log('hash', hash);
    var titleString = concert.date.format("MM/DD/YYYY hh:mm a") + " " 
                        + concert.eventType + " @ " + concert.venue;
        var $newPanel = $template.clone();
        $newPanel.removeClass("template")
            .find(".collapse").removeClass("in");
        $newPanel.find(".accordion-toggle").attr("href", "#" + (++hash))
            .text("Dynamic panel #" + hash);
        $newPanel.find(".panel-collapse").attr("id", hash);
        $newPanel.find('.accordion-toggle').attr("data-parent", "#accordion" + hash)
            .html(titleString);
        $newPanel.find('.panel-body').html(concert.description);
        if(concert.status === "confirmed")
        {
            $newPanel.addClass('panel-success')
        }
        else
        {
            $newPanel.addClass('panel-warning')
        }
        $("#accordion").append($newPanel.fadeIn());
}

function handleSaveClick(e)
{
    var $accordion = $('#accordion');
    var $template = $(".template");
    var hash = concerts.length;
    var concert = createNewConcert($(this));
    concerts.unshift(concert);
    
    turnFormIntoConcertPanel($(this), concert);
}

function turnFormIntoConcertPanel($concertForm, concert)
{
    var i = $concertForm.data('no');
    var titleString = concert.date.format("MM/DD/YYYY hh:mm a") + " " 
                        + concert.eventType + " @ " + concert.venue;
                       
    var $title = $('#event-'+i).parent().siblings('.accordion-toggle');
    $title.siblings().not('.icon').remove();
    $title.html(titleString);
    
    $('#'+i).find('.panelContent').remove();
    $('#'+i).find('.panel-body').html(concert.description);
    $('#'+i).siblings('.panel-heading').find('.glyphicon-edit')
                                       .removeClass('hide');
}

function createNewConcert($concertForm)
{
    var i = $concertForm.data('no');

    return{
        date: $('#dateTime-' + i).data("DateTimePicker").date(),
        eventType: $('#event-' + i).val(),
        venue: $('#venue-' + i).val(),
        description: $('#description-' + i).val(),
        status: $('#status-' + i).val()
    };
    //console.log(concerts);
}

function createNewConcertForm($template, hash)
{
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
        $newPanel.find('.date').datetimepicker(
            {
                allowInputToggle: true,
                defaultDate: new Date().setHours(20,00,00,00)
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
        $('.collapse').on('shown.bs.collapse', function()
        {
            $(this).parent().find(".glyphicon-collapse-down").removeClass("glyphicon-collapse-down").addClass("glyphicon-collapse-up");
        }).on('hidden.bs.collapse', function()
        {
            $(this).parent().find(".glyphicon-collapse-up").removeClass("glyphicon-collapse-up").addClass("glyphicon-collapse-down");
        });


    }