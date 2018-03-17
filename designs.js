// the function created a grid based on the user input for height and width
function makeGrid() {
    //find the table element
    let table = $('#pixel_canvas');
    //remove the table rows from the previous selection 
    table.find('tr').remove();
    // Selected size input
    let Grid_height = $("#sizePicker input[name=height]").val();
    let Grid_width = $("#sizePicker input[name=width]").val();

    //first loop to create the number of rows
    for (var i = 0; i < Grid_height; i++) {
        var ROW = $('<tr></tr>');
        table.append(ROW);
        for (var j = 0; j < Grid_width; j++) {
            const CELL = $('<td></td>');
            ROW.append(CELL);
        }
    }
    // trigger the color for each cell in the canvas
    table.find('tr').each(function() {
        $(this).find('td').each(function() {

            $(this).click(function() {
                // Selected color input
                var picked_color = $("#colorPicker").val();
                //get the current color of the cell
                var currentColor = $(this).css('background-color');
                /**if the cell color and the picked color have the same color, the color is changed to the 
                 * body background when user clicke on it
                 *this action is like "uncoloring" the cell
                 */

                if (rgba2hex(currentColor) == picked_color) {
                    let bodyColor = $('body').css('background-color');
                    $(this).css('background-color', bodyColor);
                } else {
                    $(this).css('background-color', picked_color);

                }
            });
        });

    });
}
//trigger the grid creation after the submit button is clicked
$("#sizePicker").submit(function(event) {
    makeGrid();
    //this is to prevent the creation of the grid before submission happens
    event.preventDefault();



});

//helper method:
// Convert RGB(A) values to #hexdecimal using jQuery.css()
// Original: http://jsfiddle.net/DCaQb/
// Note: This will not work on browsers which return 'color names' instead of rgb(a) values (i.e. IE8)
function rgba2hex(color_value) {
    if (!color_value) return false;
    var parts = color_value.toLowerCase().match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/),
        length = color_value.indexOf('rgba') ? 3 : 2; // Fix for alpha values
    delete(parts[0]);
    for (var i = 1; i <= length; i++) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    return '#' + parts.join('');
}